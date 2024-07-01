import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CouponBodyDto } from 'src/dtos/coupon.dto';
import { CouponService } from 'src/services/coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}
  @Post('/addCoupon')
  async addCoupon(@Body() body: CouponBodyDto, @Res() res: Response) {
    const result = await this.couponService.addCoupon(body);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('/getCoupon')
  async getCoupon(@Body() body: { userId: number }, @Res() res: Response) {
    const result = await this.couponService.getCoupon(body);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('/checkCoupon')
  async checkCoupon(
    @Body() body: { couponId: string; payment: number },
    @Res() res: Response,
  ) {
    const result = await this.couponService.checkCoupon(body);
    res.status(200).json(result);
  }
}
