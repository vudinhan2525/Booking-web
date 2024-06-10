import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BillFlightBody } from 'src/dtos/bill/billFlight.dto';
import { BillFlightService } from 'src/services/billFlight.service';

@Controller('billFlight')
export class BillFlightController {
  constructor(private billFlightService: BillFlightService) {}
  @Post('addBillFlight')
  async addBillFlight(@Body() body: BillFlightBody, @Res() res: Response) {
    const result = await this.billFlightService.addBillFlight(body);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('getBillFlight')
  async getBillFlight(
    @Body() body: { userId: number; from: string },
    @Res() res: Response,
  ) {
    const result = await this.billFlightService.getBillFlight(body);
    res.status(200).json({ status: 'success', data: result });
  }
}
