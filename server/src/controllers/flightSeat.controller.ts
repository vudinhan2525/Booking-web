import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { FlightSeatBody } from 'src/dtos/flight/flightSeatBody.dto';
import { FlightSeatService } from 'src/services/flightSeat.service';

@Controller('flightSeat')
export class FlightSeatController {
  constructor(private flightSeatService: FlightSeatService) {}
  @Post('importFlightSeat')
  async importFlightSeat(@Body() data: FlightSeatBody[], @Res() res: Response) {
    await this.flightSeatService.importFlightSeat(data);
    res.status(200).json({ status: 'success' });
  }
}
