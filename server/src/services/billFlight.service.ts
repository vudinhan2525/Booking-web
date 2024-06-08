import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BillFlight } from 'src/entities/billFlight.entity';
import { BillFlightBody } from 'src/dtos/bill/billFlight.dto';
import { generateUniqueId } from 'src/utils/generateId';

@Injectable()
export class BillFlightService {
  constructor(
    @InjectRepository(BillFlight)
    private billFlightRepository: Repository<BillFlight>,
  ) {}
  async addBillFlight(body: BillFlightBody) {
    const uniqueId = await this.generateUniqueBillHotelId();
    const curDate = new Date();
    const billFlight = await this.billFlightRepository.create({
      id: uniqueId,
      userId: body.userId,
      status: body.status,
      username: body.username,
      createdAt: curDate.toString(),
      price: body.price,
      email: body.email,
      phone: body.phone,
      airline: body.airline,
      flightCode: body.flightCode,
      departureTime: body.departureTime,
      arrivalTime: body.arrivalTime,
      from: body.from,
      to: body.to,
      passenger: body.passenger,
    });
    const result = await this.billFlightRepository.save(billFlight);
    return result;
  }
  private async generateUniqueBillHotelId(attempts = 0): Promise<string> {
    const uniqueId = generateUniqueId();
    const existingBillHotel = await this.billFlightRepository.findOne({
      where: { id: uniqueId },
    });

    if (!existingBillHotel) {
      return uniqueId;
    }

    if (attempts >= 5) {
      throw new InternalServerErrorException('Could not generate a unique ID');
    }

    return this.generateUniqueBillHotelId(attempts + 1);
  }
  async getBillFlight(body: { userId: number }) {
    const billFlights = await this.billFlightRepository
      .createQueryBuilder('bill_flight')
      .where('userId = :userId', { userId: body.userId })
      .getMany();

    return billFlights;
  }
}
