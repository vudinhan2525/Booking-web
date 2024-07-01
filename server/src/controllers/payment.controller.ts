import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import RequestWithRawBody from 'src/interfaces/requestWithRawBody.interface';
import { BillFlightService } from 'src/services/billFlight.service';
import { BillHotelService } from 'src/services/billHotel.service';
import { NotificationService } from 'src/services/notification.service';
import { PaymentService } from 'src/services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private billHotelService: BillHotelService,
    private billFlightService: BillFlightService,
    private notiService: NotificationService,
  ) {}

  @Post('momo')
  async getMomo(@Body() body, @Res() res: Response) {
    const result = await this.paymentService.getMomo(body);

    res.status(200).json({ status: 'success', data: result });
  }
  @Post('successMomo')
  async successMomo(@Body() body, @Res() res: Response) {
    const data = await this.paymentService.successMomo(body);
    if (data) {
      if (data.isHotelBody) {
        const hotelBill = await this.billHotelService.addBillHotel(data);
        await this.notiService.addNoti({
          header: 'Payment successfully.',
          content: `Your payment for booking code #${hotelBill.id} successfully.`,
          userId: hotelBill.userId,
          isGlobal: false,
          image: null,
          link: `${process.env.CLIENT_ENDPOINT}/user?slt=1`,
        });
      }
      if (data.isFlightBody) {
        const flightBill = await this.billFlightService.addBillFlight(data);
        await this.notiService.addNoti({
          header: 'Payment successfully.',
          content: `Your payment for booking code #${flightBill.id} successfully.`,
          userId: flightBill.userId,
          isGlobal: false,
          image: null,
          link: `${process.env.CLIENT_ENDPOINT}/user?slt=1`,
        });
      }
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
  async getStripe(@Body() body, @Res() res: Response) {
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
      if (result.data.isHotelBody) {
        const hotelBill = await this.billHotelService.addBillHotel(result.data);
        await this.notiService.addNoti({
          header: 'Payment successfully.',
          content: `Your payment for booking code #${hotelBill.id} successfully.`,
          userId: hotelBill.userId,
          isGlobal: false,
          image: null,
          link: `${process.env.CLIENT_ENDPOINT}/user?slt=1`,
        });
      }
      if (result.data.isFlightBody) {
        const flightBill = await this.billFlightService.addBillFlight(
          result.data,
        );
        await this.notiService.addNoti({
          header: 'Payment successfully.',
          content: `Your payment for booking code #${flightBill.id} successfully.`,
          userId: flightBill.userId,
          isGlobal: false,
          image: null,
          link: `${process.env.CLIENT_ENDPOINT}/user?slt=1`,
        });
      }
    }
    res.json({ received: true });
  }
}
