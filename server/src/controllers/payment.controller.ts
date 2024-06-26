import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { BillHotelBody } from 'src/dtos/bill/billHotel.dto';
import RequestWithRawBody from 'src/interfaces/requestWithRawBody.interface';
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
  @Post('stripe')
  async getStripe(@Body() body: BillHotelBody, @Res() res: Response) {
    const result = await this.paymentService.getStripe(body);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('successStripe')
  async successStripe(
    @Headers('stripe-signature') sig: string,
    @Req() req: RequestWithRawBody,
    @Res() res: Response,
  ) {
    const result = await this.paymentService.successStripe(req, sig);
    if (result.status === 'success' && result.data) {
      await this.billHotelService.addBillHotel(result.data);
    }
    res.json({ received: true });
  }
}
