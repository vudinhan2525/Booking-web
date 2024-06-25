import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BillHotelBody } from 'src/dtos/bill/billHotel.dto';
import { BillHotelService } from 'src/services/billHotel.service';
import { PaymentService } from 'src/services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private billHotelService: BillHotelService,
  ) {}

  @Post('momo')
  async getMomo(@Body() body: BillHotelBody, @Res() res: Response) {
    const result = await this.paymentService.getMomo(body);

    res.status(200).json({ status: 'success', data: result });
  }
  @Post('successMomo')
  async successMomo(@Body() body, @Res() res: Response) {
    const data = await this.paymentService.successMomo(body);
    if (data) {
      await this.billHotelService.addBillHotel(data);
    }
    res.status(200).json(body);
  }
  @Post('checkMomo')
  async checkMomo(@Body() body: { orderId: string }, @Res() res: Response) {
    const result = await this.paymentService.checkMomo(body);

    res.status(200).json({ status: 'success', data: result });
  }
  @Post('zaloPay')
  async getZaloPay(@Body() body, @Res() res: Response) {
    const result = await this.paymentService.getZaloPay(body);
    res.status(200).json({ status: 'success', data: result });
  }
}
