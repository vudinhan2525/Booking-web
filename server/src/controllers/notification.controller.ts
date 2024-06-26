import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { NotiBodyDto } from 'src/dtos/noti.dto';
import { NotificationService } from 'src/services/notification.service';

@Controller('noti')
export class NotificationController {
  constructor(private notiService: NotificationService) {}
  @Post('/addNoti')
  async addNoti(@Body() body: NotiBodyDto, @Res() res: Response) {
    const result = await this.notiService.addNoti(body);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('/getNoti')
  async getNoti(@Body() body: { userId: number }, @Res() res: Response) {
    const result = await this.notiService.getNoti(body);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('/readNoti')
  async readNoti(
    @Body() body: { userId: number; notiId: number },
    @Res() res: Response,
  ) {
    const result = await this.notiService.readNoti({ notiId: body.notiId });
    if (result.status === 'success') {
      const data = await this.notiService.getNoti({ userId: body.userId });
      res.status(200).json({ status: 'success', data: data });
      return;
    }
    res
      .status(200)
      .json({ status: 'failed', message: 'Error when update data.' });
  }
}
