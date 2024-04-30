import { Injectable } from '@nestjs/common';
import { UserBodyDto } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
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
  async createUser(body: UserBodyDto): Promise<User> {
    const newUser = this.usersRepository.create(body);
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }
}
