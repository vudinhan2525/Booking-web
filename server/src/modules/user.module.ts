import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Hotel } from 'src/entities/hotel.entity';
import { Room } from 'src/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Hotel, Room])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
