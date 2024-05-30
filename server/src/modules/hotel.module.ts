import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from 'src/controllers/hotel.controller';
import { Hotel } from 'src/entities/hotel.entity';
import { Review } from 'src/entities/review.entity';
import { Room } from 'src/entities/room.entity';
import { RoomOpt } from 'src/entities/roomOpt.entity';
import { HotelService } from 'src/services/hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Room, RoomOpt, Review])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
