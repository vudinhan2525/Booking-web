import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { promisify } from 'util';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    try {
      if (token) {
        //2) Verify token
        const decoded = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET,
        );

        //3) Check if user still exists
        const curUser = await this.usersRepository.findOne({
          where: { id: decoded.id },
        });
        if (!curUser) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req['user'] = curUser;
        res.locals.user = curUser;
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
