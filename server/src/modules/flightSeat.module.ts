import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightSeatController } from 'src/controllers/flightSeat.controller';
import { FlightSeat } from 'src/entities/flightSeat.entity';
import { FlightSeatService } from 'src/services/flightSeat.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlightSeat])],
  controllers: [FlightSeatController],
  providers: [FlightSeatService],
})
export class FlightSeatModule {}
