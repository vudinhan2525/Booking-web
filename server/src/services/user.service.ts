import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserBodyDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { sendMail } from 'src/utils/email';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    console.log(url);
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
}
