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
    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
    return {
      status: 'success',
      data: user,
      token: token,
    };
  }
}
