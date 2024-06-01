import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RoomService } from 'src/services/room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Post('importRoom')
  async importRoom(@Body() body, @Res() res: Response) {
    this.roomService.importRoom(body);
    res.status(200).json({ status: 'success' });
  }
}
