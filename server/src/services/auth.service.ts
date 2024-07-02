import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LoginBodyDto } from '../dtos/authDto/LoginBody.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async login(body: LoginBodyDto) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('email = :email', { email: body.email })
      .addSelect('user.password')
      .getOne();
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (body.isAdmin) {
      if (user.role !== 'admin') {
        throw new HttpException(
          'Email or password is not correct',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (body.isAdmin === false) {
      if (user.role !== 'user') {
        throw new HttpException(
          'Email or password is not correct',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
    return {
      status: 'success',
      data: user,
      token: token,
    };
  }
  async googleAuth(body: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) {
    if (!body.email) {
      throw new Error('Email is required.');
    }
    const existingUser = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (existingUser) {
      // if have user
      if (existingUser.role !== body.role) {
        return {
          status: 'failed',
          message: `Email has been used for ${existingUser.role === 'admin' ? 'administrator' : 'user'} account.`,
        };
      }
      const token = jwt.sign(
        { userId: existingUser.id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE_IN,
        },
      );

      return {
        status: 'success',
        data: existingUser,
        token: token,
      };
    } else {
      // if dont have
      const newUser = this.usersRepository.create({
        firstName: body.firstName ? body.firstName : '',
        lastName: body.lastName ? body.lastName : '',
        email: body.email,
        role: body.role,
      });
      const savedUser = await this.usersRepository.save(newUser);
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
}
