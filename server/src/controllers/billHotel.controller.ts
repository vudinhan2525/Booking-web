import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BillHotelBody } from 'src/dtos/bill/billHotel.dto';
import { BillHotelService } from 'src/services/billHotel.service';

@Controller('billHotel')
export class BillHotelController {
  constructor(private billHotelService: BillHotelService) {}
  @Post('addBillHotel')
  async addBillHotel(@Body() body: BillHotelBody, @Res() res: Response) {
    const result = await this.billHotelService.addBillHotel(body);
    res.status(200).json({ status: 'success', data: result });
  }
}
