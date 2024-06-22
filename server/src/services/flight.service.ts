import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightBody, FlightQuery } from 'src/dtos/flight/flightBody.dto';
import { Flight } from 'src/entities/flight.entity';
import { Repository } from 'typeorm';
@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}
  async createFlight(body: FlightBody[]) {
    const flightPromises = body.map(async (flight) => {
      const newFlight = this.flightRepository.create({
        id: flight.id,
        fromAirport: flight.fromAirport,
        toAirport: flight.toAirport,
        from: flight.from,
        to: flight.to,
        fromCode: flight.fromCode,
        toCode: flight.toCode,
        airline: flight.airline,
        flightCode: flight.flightCode,
        airplane: flight.airplane,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
      });
      await this.flightRepository.save(newFlight);
    });
    await Promise.all(flightPromises);
  }
  async getFlight(body: FlightQuery, page: number, limit: number) {
    // i have body.seatType if a type of this seat how i can leftJoin with flightSeat that have flightSeat.seatType = body.seatType
    let query;
    if (body.seatType === 'Business') {
      query = this.flightRepository
        .createQueryBuilder('flight')
        .leftJoinAndSelect('flight.flightSeats', 'flightSeat')
        .where(`flightSeat.seatType IN (:...seatTypes)`, {
          seatTypes: ['Business', 'First Class'],
        });
    } else if (body.seatType === 'First Class') {
      query = this.flightRepository
        .createQueryBuilder('flight')
        .leftJoinAndSelect('flight.flightSeats', 'flightSeat')
        .where(`flightSeat.seatType = :seatType`, {
          seatType: 'First Class',
        });
    } else {
      query = this.flightRepository
        .createQueryBuilder('flight')
        .leftJoinAndSelect('flight.flightSeats', 'flightSeat');
    }
    //can you join it here after createQueryBuilder
    if (body.from) {
      query = query.andWhere('fromCode = :fromCode', { fromCode: body.from });
    }
    if (body.to) {
      query = query.andWhere('toCode = :toCode', { toCode: body.to });
    }
    if (body.airline && body.airline.length > 0) {
      query = query.andWhere(`airline IN (:...airlines)`, {
        airlines: body.airline,
      });
    }
    let totalCount = await query.getCount();

    let flights = await query.getMany();
    if (body.departureTime) {
      const departureTime: Date = new Date(body.departureTime);
      const nextDay: Date = new Date(departureTime);
      nextDay.setDate(departureTime.getDate() + 1);

      if (body.arrivalTime) {
        const arrivalTime: Date = new Date(body.arrivalTime);
        flights = flights.filter((flight) => {
          return (
            new Date(flight.departureTime) > departureTime &&
            new Date(flight.arrivalTime) < arrivalTime
          );
        });
      } else {
        flights = flights.filter((flight) => {
          return (
            new Date(flight.arrivalTime) >= departureTime &&
            new Date(flight.arrivalTime) < nextDay
          );
        });
      }
    }
    flights.forEach((flight) => {
      flight.flightSeats.sort((a, b) => a.price - b.price);
    });
    if (!Number.isNaN(body.priceFrom) && body.priceFrom >= 0 && body.priceTo) {
      const tmp = flights.filter((flight) => {
        if (
          flight.flightSeats[0].price <= body.priceTo &&
          flight.flightSeats[0].price >= body.priceFrom
        ) {
          return true;
        }
        return false;
      });
      flights = tmp;
    }
    if (body.departureHour) {
      const result = flights.filter((el) => {
        if (this.isTimeInRange(el.departureTime, body.departureHour))
          return true;
        else return false;
      });
      return result;
    }
    if (body.arrivalHour) {
      const result = flights.filter((el) => {
        if (this.isTimeInRange(el.arrivalTime, body.arrivalHour)) return true;
        else return false;
      });
      return result;
    }
    const offset = (page - 1) * limit;
    const paginatedFlights = flights.slice(offset, offset + limit);
    totalCount = flights.length;
    return { flights: paginatedFlights, totalCount };
  }

  isTimeInRange(dateTime: Date, part: number) {
    // Extract hours and minutes
    const hours = dateTime.getUTCHours();
    const minutes = dateTime.getUTCMinutes();
    // Calculate the total minutes from the start of the day
    const totalMinutes = hours * 60 + minutes;

    if (part === 1) {
      const startMinutes = 0; // 00:00
      const endMinutes = 6 * 60; // 06:00
      return totalMinutes >= startMinutes && totalMinutes < endMinutes;
    } else if (part === 2) {
      const startMinutes = 6 * 60; // 00:00
      const endMinutes = 12 * 60; // 06:00
      return totalMinutes >= startMinutes && totalMinutes < endMinutes;
    } else if (part === 3) {
      const startMinutes = 12 * 60; // 00:00
      const endMinutes = 18 * 60; // 06:00
      return totalMinutes >= startMinutes && totalMinutes < endMinutes;
    } else if (part === 4) {
      const startMinutes = 18 * 60; // 00:00
      const endMinutes = 24 * 60; // 06:00
      return totalMinutes >= startMinutes && totalMinutes < endMinutes;
    }
    return false;
  }
}
