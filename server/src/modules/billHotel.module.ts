import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillHotel } from 'src/entities/billHotel.entity';
import { BillHotelController } from 'src/controllers/billHotel.controller';
import { BillHotelService } from 'src/services/billHotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillHotel])],
  controllers: [BillHotelController],
  providers: [BillHotelService],
})
export class BillHotelModule {}
