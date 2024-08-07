import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { AuthMiddleWare } from './middlewares/auth.middleware';
import { Flight } from './entities/flight.entity';
import { FlightModule } from './modules/flight.module';
import { Hotel } from './entities/hotel.entity';
import { HotelModule } from './modules/hotel.module';
import { RoomModule } from './modules/room.module';
import { Room } from './entities/room.entity';
import { RoomOptModule } from './modules/roomOpt.module';
import { RoomOpt } from './entities/roomOpt.entity';
import { ReviewModule } from './modules/review.module';
import { Review } from './entities/review.entity';
import { BillHotelModule } from './modules/billHotel.module';
import { BillHotel } from './entities/billHotel.entity';
import { FlightSeat } from './entities/flightSeat.entity';
import { FlightSeatModule } from './modules/flightSeat.module';
import { BillFlight } from './entities/billFlight.entity';
import { BillFlightModule } from './modules/billFlight.module';
import { PaymentModule } from './modules/payment.module';
import { NotificationModule } from './modules/notification.module';
import { Notifications } from './entities/notifications.entity';
import { Coupon } from './entities/coupon.entity';
import { CouponModule } from './modules/coupon.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASENAME,

      entities: [
        User,
        Flight,
        Hotel,
        Room,
        RoomOpt,
        Review,
        BillHotel,
        FlightSeat,
        BillFlight,
        Notifications,
        Coupon,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Flight,
      Hotel,
      Room,
      RoomOpt,
      Review,
      BillHotel,
      FlightSeat,
      BillFlight,
      Notifications,
      Coupon,
    ]),
    UserModule,
    AuthModule,
    FlightModule,
    HotelModule,
    RoomModule,
    RoomOptModule,
    ReviewModule,
    BillHotelModule,
    FlightSeatModule,
    BillFlightModule,
    PaymentModule,
    NotificationModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes(
      // user
      { path: 'users/getMe', method: RequestMethod.GET },
      { path: 'users/updateUser', method: RequestMethod.POST },
      { path: 'users/updatePassword', method: RequestMethod.POST },
      { path: 'users/savedHotel', method: RequestMethod.POST },
      { path: 'users/unSavedHotel', method: RequestMethod.POST },
      { path: 'users/getSavedHotel', method: RequestMethod.GET },
      { path: 'users/savedFlight', method: RequestMethod.POST },
      { path: 'users/unSavedFlight', method: RequestMethod.POST },
      { path: 'users/getSavedFlight', method: RequestMethod.GET },
      // hotel
      { path: 'hotel/addHotel', method: RequestMethod.POST },
      { path: 'hotel/updateHotel', method: RequestMethod.POST },
      { path: 'hotel/deleteHotel', method: RequestMethod.POST },
      { path: 'hotel/getHotelFromAdmin', method: RequestMethod.POST },
      //room
      { path: 'room/createRoom', method: RequestMethod.POST },
      { path: 'room/updateRoom', method: RequestMethod.POST },
      { path: 'room/deleteRoom', method: RequestMethod.POST },
      // bill hotel
      { path: 'billHotel/addBillHotel', method: RequestMethod.POST },
      { path: 'billHotel/getBillHotel', method: RequestMethod.POST },
      { path: 'billHotel/checkIn', method: RequestMethod.POST },
      { path: 'billHotel/checkOut', method: RequestMethod.POST },
      // bill flight
      { path: 'billFlight/addBillFlight', method: RequestMethod.POST },
      { path: 'billFlight/getBillFlight', method: RequestMethod.POST },
      //notifications
      //{ path: 'noti/addNoti', method: RequestMethod.POST },
      { path: 'noti/getNoti', method: RequestMethod.POST },
      { path: 'noti/readNoti', method: RequestMethod.POST },
      //coupon
      { path: 'coupon/getCoupon', method: RequestMethod.POST },
      { path: 'coupon/checkCoupon', method: RequestMethod.POST },
      //review
      { path: 'review/replyReview', method: RequestMethod.POST },
      { path: 'review/addReview', method: RequestMethod.POST },
      { path: 'review/updateReview', method: RequestMethod.POST },
      { path: 'review/getReviewsForAdmin', method: RequestMethod.POST },
    );
    // .apply(RawBodyMiddleware)
    // .forRoutes({ path: 'payment/successStripe', method: RequestMethod.POST });
  }
}
