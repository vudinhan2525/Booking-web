import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightBody, FlightQuery } from 'src/dtos/flight/flightBody.dto';
import { Flight } from 'src/entities/flight.entity';
import { Between, In, MoreThan, Repository } from 'typeorm';
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
        fromCode: body[i].fromCode,
        toCode: body[i].toCode,
        airline: body[i].airline,
        flightCode: body[i].flightCode,
        seatType: body[i].seatType,
        airplane: body[i].airplane,
        departureTime: body[i].departureTime,
        arrivalTime: body[i].arrivalTime,
        price: body[i].price,
        seatLeft: body[i].seatLeft,
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
  async getFlight(body: FlightQuery) {
    console.log(body);
    let totalPassenger = 0;
    if (body.numberAdult) {
      totalPassenger += body.numberAdult;
    }
    if (body.numberChild) {
      totalPassenger += body.numberChild;
    }
    const obj: any = {
      seatLeft: MoreThan(totalPassenger),
    };
    if (body.from) {
      obj.fromCode = body.from;
    }
    if (body.to) {
      obj.toCode = body.to;
    }
    if (body.departureTime) {
      if (body.arrivalTime) {
        obj.departureTime = Between(
          new Date(body.departureTime),
          new Date(body.arrivalTime),
        );
      } else {
        const departureTime = new Date(body.departureTime);
        const nextDay = new Date(departureTime);
        nextDay.setDate(departureTime.getDate() + 1);
        obj.departureTime = Between(new Date(body.departureTime), nextDay);
      }
    }
    if (body.priceFrom && body.priceTo) {
      obj.price = Between(body.priceFrom, body.priceTo);
    }
    if (body.airline && body.airline.length > 0) {
      obj.airline = In(body.airline);
    }
    const flights = await this.flightRepository.find({
      where: obj,
    });
    return flights;
  }
}
