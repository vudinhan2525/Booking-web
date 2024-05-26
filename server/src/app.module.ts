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
      entities: [User, Flight, Hotel, Room, RoomOpt],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Flight, Hotel, Room, RoomOpt]),
    UserModule,
    AuthModule,
    FlightModule,
    HotelModule,
    RoomModule,
    RoomOptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .forRoutes({ path: 'users/getMe', method: RequestMethod.GET });
  }
}
