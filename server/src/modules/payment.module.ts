import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/controllers/payment.controller';
import { BillFlight } from 'src/entities/billFlight.entity';
import { BillHotel } from 'src/entities/billHotel.entity';
import { Notifications } from 'src/entities/notifications.entity';
import { BillFlightService } from 'src/services/billFlight.service';
import { BillHotelService } from 'src/services/billHotel.service';
import { NotificationService } from 'src/services/notification.service';
import { PaymentService } from 'src/services/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillHotel, Notifications, BillFlight])],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    BillHotelService,
    NotificationService,
    BillFlightService,
  ],
})
export class PaymentModule {}
