import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightBody } from 'src/dtos/flight/flightBody.dto';
import { Flight } from 'src/entities/flight.entity';
import { Repository } from 'typeorm';
@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}
  async createFlight(body: FlightBody[]) {
    for (let i = 0; i < body.length; i++) {
      const newFlight = this.flightRepository.create({
        fromAirport: body[i].fromAirport,
        toAirport: body[i].toAirport,
        from: body[i].from,
        to: body[i].to,
        airline: body[i].airline,
        flightCode: body[i].flightCode,
        seatType: body[i].seatType,
        airplane: body[i].airplane,
        departureTime: body[i].departureTime,
        arrivalTime: body[i].arrivalTime,
        price: body[i].price,
      });
      await this.flightRepository.save(newFlight);
    }
    // try {
    //   const newFlight = this.flightRepository.create({
    //     fromAirport: body.fromAirport,
    //     toAirport: body.toAirport,
    //     from: body.from,
    //     to: body.to,
    //     airline: body.airline,
    //     flightCode: body.flightCode,
    //     seatType: body.seatType,
    //     airplane: body.airplane,
    //     departureTime: body.departureTime,
    //     arrivalTime: body.arrivalTime,
    //     price: body.price,
    //   });
    //   await this.flightRepository.save(newFlight);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
