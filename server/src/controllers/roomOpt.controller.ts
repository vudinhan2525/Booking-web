import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RoomOptService } from 'src/services/roomOpt.service';

@Controller('roomOpt')
export class RoomOptController {
  constructor(private roomOptService: RoomOptService) {}
  @Post('importRoomOpt')
  async importRoomOpt(@Body() body, @Res() res: Response) {
    await this.roomOptService.importRoomOpt(body);
    res.status(200).json({ status: 'success' });
  }
}
