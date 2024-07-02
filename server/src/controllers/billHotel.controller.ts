import { Body, Controller, Post, Query, Res } from '@nestjs/common';
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
  @Post('getBillHotel')
  async getBillHotel(
    @Body() body: { userId: number; from: string },
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const result = await this.billHotelService.getBillHotel(body, page, limit);
    res.status(200).json({
      status: 'success',
      data: result.bills,
      totalCount: result.totalCount,
    });
  }
  @Post('getBillHotelForAdmin')
  async getBillHotelForAdmin(
    @Body() body: { adminId: number; search: string; status: string },
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const result = await this.billHotelService.getBillHotelForAdmin(
      body,
      page,
      limit,
    );
    res.status(200).json({
      status: 'success',
      data: result.bills,
      totalCount: result.totalCount,
    });
  }
  @Post('checkIn')
  async checkIn(
    @Body() body: { billHotelId: string; floor: string; roomCode: string },
    @Res() res: Response,
  ) {
    const result = await this.billHotelService.checkIn(body);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('checkOut')
  async checkOut(@Body() body: { billHotelId: string }, @Res() res: Response) {
    const result = await this.billHotelService.checkOut(body);
    res.status(200).json({ status: 'success', data: result });
  }
}
