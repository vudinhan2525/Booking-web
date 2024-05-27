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
  @Post('getHotels')
  async getHotel(
    @Body() data: { long: number; lat: number },
    @Res() res: Response,
  ) {
    const result = await this.hotelService.getHotel(data);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('getOneHotel')
  async getOneHotel(@Body() data, @Res() res: Response) {
    const result = await this.hotelService.getOneHotel(data.hotelId);
    res.status(200).json(result);
  }
  @Post('importHotel')
  async importHotel(@Body() body: HotelBody[], @Res() res: Response) {
    this.hotelService.importHotel(body);
    res.status(200).json({ status: 'success' });
  }
}
