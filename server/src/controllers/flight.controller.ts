import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { FlightBody, FlightQuery } from 'src/dtos/flight/flightBody.dto';
import { FlightService } from 'src/services/flight.service';

@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}
  @Post('addFlight')
  async createFlight(@Body() data: FlightBody[], @Res() res: Response) {
    await this.flightService.createFlight(data);
    res.status(200).json({ status: 'success' });
  }
  @Post('getFlight')
  async getFlight(@Body() data: FlightQuery, @Res() res: Response) {
    const result = await this.flightService.getFlight(data);
    res.status(200).json({ status: 'success', data: result });
  }
}