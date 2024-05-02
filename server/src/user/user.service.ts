import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserBodyDto } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: id },
    });
  }
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
    const newUser = this.usersRepository.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
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
}
