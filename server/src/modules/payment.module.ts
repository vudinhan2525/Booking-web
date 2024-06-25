import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/controllers/payment.controller';
import { BillHotel } from 'src/entities/billHotel.entity';
import { BillHotelService } from 'src/services/billHotel.service';
import { PaymentService } from 'src/services/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillHotel])],
  controllers: [PaymentController],
  providers: [PaymentService, BillHotelService],
})
export class PaymentModule {}
