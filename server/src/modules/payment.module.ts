import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/controllers/payment.controller';
import { BillHotel } from 'src/entities/billHotel.entity';
import { Notifications } from 'src/entities/notifications.entity';
import { BillHotelService } from 'src/services/billHotel.service';
import { NotificationService } from 'src/services/notification.service';
import { PaymentService } from 'src/services/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillHotel, Notifications])],
  controllers: [PaymentController],
  providers: [PaymentService, BillHotelService, NotificationService],
})
export class PaymentModule {}
