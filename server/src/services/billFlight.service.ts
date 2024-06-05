import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BillFlight } from 'src/entities/billFlight.entity';
import { BillFlightBody } from 'src/dtos/bill/billFlight.dto';
@Injectable()
export class BillFlightService {
  constructor(
    @InjectRepository(BillFlight)
    private billFlightRepository: Repository<BillFlight>,
  ) {}
  async addBillFlight(body: BillFlightBody) {
    console.log(body);
  }
}
