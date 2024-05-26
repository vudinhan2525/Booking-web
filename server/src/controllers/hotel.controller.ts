import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { HotelBody } from 'src/dtos/hotel/hotel.dto';
import { HotelService } from 'src/services/hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}
  @Post('addHotel')
  async createHotel(@Body() data: HotelBody, @Res() res: Response) {
    res.status(200).json({ status: 'success' });
  }
  @Post('getHotel')
  async getHotel(@Body() data, @Res() res: Response) {
    const result = await this.hotelService.getHotel();
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('importHotel')
  async importHotel(@Body() body: HotelBody[], @Res() res: Response) {
    this.hotelService.importHotel(body);
    res.status(200).json({ status: 'success' });
  }
}
