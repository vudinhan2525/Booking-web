import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from 'src/controllers/flight.controller';
import { Flight } from 'src/entities/flight.entity';
import { FlightService } from 'src/services/flight.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
