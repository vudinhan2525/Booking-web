import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from 'src/controllers/room.controller';
import { Hotel } from 'src/entities/hotel.entity';
import { Room } from 'src/entities/room.entity';
import { RoomOpt } from 'src/entities/roomOpt.entity';
import { RoomService } from 'src/services/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Hotel, RoomOpt])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
