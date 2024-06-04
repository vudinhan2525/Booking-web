import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightSeat } from 'src/entities/flightSeat.entity';
import { FlightSeatBody } from 'src/dtos/flight/flightSeatBody.dto';
@Injectable()
export class FlightSeatService {
  constructor(
    @InjectRepository(FlightSeat)
    private flightSeatsRepository: Repository<FlightSeat>,
  ) {}
  async importFlightSeat(body: FlightSeatBody[]) {
    const flightSeatsPromises = body.map(async (flightSeat) => {
      const newFlightSeats = this.flightSeatsRepository.create({
        name: flightSeat.name,
        cabinBaggage: flightSeat.cabinBaggage,
        baggage: flightSeat.baggage,
        price: flightSeat.price,
        isRefundable: flightSeat.isRefundable,
        isReschedule: flightSeat.isReschedule,
        refundablePrice: flightSeat.refundablePrice,
        reschedulePrice: flightSeat.reschedulePrice,
        facilities: flightSeat.facilities,
        seatLeft: flightSeat.seatLeft,
        flightId: flightSeat.flightId,
      });
      await this.flightSeatsRepository.save(newFlightSeats);
    });
    await Promise.all(flightSeatsPromises);
  }
}
