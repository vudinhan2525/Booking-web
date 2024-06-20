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
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOSTLOCAL,
      port: +process.env.MYSQL_PORTLOCAL,
      username: process.env.MYSQL_USERNAMELOCAL,
      password: process.env.MYSQL_PASSWORDLOCAL,
      database: process.env.MYSQL_DATABASENAMELOCAL,

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
      { path: 'hotel/getHotelFromAdmin', method: RequestMethod.POST },
      //room
      { path: 'room/createRoom', method: RequestMethod.POST },
      { path: 'room/updateRoom', method: RequestMethod.POST },
      { path: 'room/deleteRoom', method: RequestMethod.POST },
      // bill hotel
      { path: 'billHotel/addBillHotel', method: RequestMethod.POST },
      { path: 'billHotel/getBillHotel', method: RequestMethod.POST },
      // bill flight
      { path: 'billFlight/addBillFlight', method: RequestMethod.POST },
      { path: 'billFlight/getBillFlight', method: RequestMethod.POST },
    );
  }
}
