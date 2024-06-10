import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserBodyDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { sendMail } from 'src/utils/email';
import { Hotel } from 'src/entities/hotel.entity';
import { Room } from 'src/entities/room.entity';
import { Flight } from 'src/entities/flight.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}
  async createUser(body: UserBodyDto) {
    if (body.password !== body.passwordConfirm) {
      throw new Error('Password and passwordConfirm do not match');
    }
    const existingUser = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    const newUser = this.usersRepository.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      role: body.role,
      password: hashedPassword,
      createdAt: formattedDateTime,
      updatedAt: formattedDateTime,
    });
    const savedUser = await this.usersRepository.save(newUser);
    // Generate JWT token
    const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
    return {
      status: 'success',
      data: savedUser,
      token: token,
    };
  }
  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new HttpException('Email is not exist.', HttpStatus.BAD_REQUEST);
    }
    const token = await user.createPasswordResetToken();
    await this.usersRepository.save(user);
    //3) Send it to user's email
    const url = `${process.env.CLIENT_ENDPOINT}/resetPassword/${token}`;

    try {
      await sendMail(email, 'Reset your password', url);
      return { status: 'success', message: 'Email sent successfully' };
    } catch (error) {
      // Handle error and respond to the user
      user.passwordResetExpires = null;
      user.passwordResetToken = null;
      await this.usersRepository.save(user);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async resetPassword(data: {
    token: string;
    password: string;
    passwordConfirm: string;
  }) {
    //1) Get user based on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(data.token)
      .digest('hex');

    // can you find me a user that passwordResetToken == hasedToken and passwordResetExpires > Date.now()
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.passwordResetToken = :token', { token: hashedToken })
      .andWhere('user.passwordResetExpires > :now', { now: new Date() })
      .getOne();
    //2) Check and set new password
    if (!user) {
      throw new HttpException(
        'Token is invalid or has expired!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (data.password !== data.passwordConfirm) {
      throw new HttpException(
        'Password confirm is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    user.password = hashedPassword;
    user.passwordConfirm = null;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    //3) Update passwordchangeat property for user
    await this.usersRepository.save(user);
  }
  async updateUser(body: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) {
    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.phone = body.phone;
    user.email = body.email;
    return await this.usersRepository.save(user);
  }
  async updatePassword(
    body: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    idUser: number,
  ) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: idUser })
      .addSelect('user.password')
      .getOne();
    if (!user || !(await bcrypt.compare(body.oldPassword, user.password))) {
      return { status: 'failed', message: 'Old password is not correct' };
    }
    if (body.newPassword !== body.confirmPassword) {
      throw new HttpException(
        'Password and password confirm is not correct!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    user.password = hashedPassword;
    await this.usersRepository.save(user);
    return { status: 'success' };
  }
  async savedHotel(body: { hotelId: number }, userId: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();
    let savedHotels = [];
    if (user.savedHotel !== '') {
      savedHotels = user.savedHotel.split(',');
    }
    if (!savedHotels.includes(body.hotelId.toString())) {
      savedHotels.push(body.hotelId.toString());
      user.savedHotel = savedHotels.join(',');
    }
    await this.usersRepository.save(user);
    return user;
  }
  async unSavedHotel(body: { hotelId: number }, userId: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();
    let savedHotels = [];
    if (user.savedHotel !== '') {
      savedHotels = user.savedHotel.split(',');
    }
    const newArr = savedHotels
      .filter((el) => el !== body.hotelId.toString())
      .join(',');
    user.savedHotel = newArr;
    await this.usersRepository.save(user);
    return user;
  }
  async getSavedHotel(savedHotel: string) {
    let hotelsId = [];
    if (savedHotel !== '') {
      hotelsId = savedHotel.split(',');
    }
    if (hotelsId.length === 0) {
      return [];
    }
    // Assume that `this.hotelsRepository` is your ORM repository for the hotels table/entity
    const hotelPromises = hotelsId.map((id) =>
      this.hotelRepository.findOne({ where: { id } }),
    );

    const hotels = await Promise.all(hotelPromises);

    // Fetch and join rooms for each hotel
    const hotelWithRoomsPromises = hotels.map(async (hotel) => {
      if (!hotel) {
        return null;
      }
      const rooms = await this.roomRepository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.roomOpts', 'roomOpt')
        .where('room.hotelId = :hotelId', { hotelId: hotel.id })
        .orderBy('roomOpt.price')
        .getMany();

      const sortedRooms = rooms.map((room) => ({
        ...room,
        roomOpts: room.roomOpts.sort((a, b) => a.price - b.price),
      }));
      return { ...hotel, rooms: sortedRooms };
    });

    const hotelsWithRooms = await Promise.all(hotelWithRoomsPromises);

    return hotelsWithRooms.filter((hotel) => hotel !== null);
  }
  async savedFlight(body: { flightId: number }, userId: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();
    let savedFlights = [];
    if (user.savedFlight !== '') {
      savedFlights = user.savedFlight.split(',');
    }
    if (!savedFlights.includes(body.flightId.toString())) {
      savedFlights.push(body.flightId.toString());
      user.savedFlight = savedFlights.join(',');
    }
    await this.usersRepository.save(user);
    return user;
  }
  async unSavedFlight(body: { flightId: number }, userId: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();
    let savedFlights = [];
    if (user.savedHotel !== '') {
      savedFlights = user.savedFlight.split(',');
    }
    const newArr = savedFlights
      .filter((el) => el !== body.flightId.toString())
      .join(',');
    user.savedFlight = newArr;
    await this.usersRepository.save(user);
    return user;
  }
  async getSavedFlight(savedFlight: string) {
    let flightIds = [];
    if (savedFlight !== '') {
      flightIds = savedFlight.split(',');
    }
    if (flightIds.length === 0) {
      return [];
    }
    const flightPromises = flightIds.map(async (flightId) => {
      return await this.flightRepository
        .createQueryBuilder('flight')
        .where('flight.id = :flightId', { flightId: flightId })
        .leftJoinAndSelect('flight.flightSeats', 'flightSeat')
        .getOne();
    });

    const flights = await Promise.all(flightPromises);
    return flights;
  }
}
