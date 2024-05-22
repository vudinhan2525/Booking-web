import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from 'src/controllers/hotel.controller';
import { Hotel } from 'src/entities/hotel.entity';
import { HotelService } from 'src/services/hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
