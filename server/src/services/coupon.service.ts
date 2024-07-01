import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/coupon.entity';
import { CouponBodyDto } from 'src/dtos/coupon.dto';
import { generateUniqueId } from 'src/utils/generateId';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}
  async addCoupon(body: CouponBodyDto) {
    let code: string = '';
    if (body.code) {
      code = body.code;
    } else {
      code = await this.generateUniqueBillHotelId(5);
    }
    const result = await this.couponRepository.create({
      code: code,
      expiredDate: body.expiredDate,
      quantity: body.quantity,
      priceRequire: body.priceRequire,
      price: body.price,
      percent: body.percent,
      isGlobal: body.isGlobal,
      userId: body.userId,
    });

    return await this.couponRepository.save(result);
  }
  async getCoupon(body: { userId: number }) {
    return await this.couponRepository
      .createQueryBuilder('coupon')
      .where('coupon.userId = :userId', { userId: body.userId })
      .getMany();
  }
  async checkCoupon(body: { couponId: string; payment: number }) {
    const coupon = await this.couponRepository.findOne({
      where: { code: body.couponId },
    });
    if (!coupon || !coupon.isGlobal) {
      return { status: 'failed', message: 'Invalid coupon code' };
    }
    const now = new Date();
    const expiredDate = new Date(coupon.expiredDate);

    if (expiredDate < now) {
      return { status: 'failed', message: 'Coupon has expired' };
    }
    if (coupon.quantity <= 0) {
      return { status: 'failed', message: 'Coupon is no longer available' };
    }
    // Check price or percent conditions if needed
    if (coupon.priceRequire && body.payment < coupon.priceRequire) {
      return {
        status: 'failed',
        message: 'Minimum payment requirement not met',
      };
    }
    // coupon.quantity -= 1;
    const data = await this.couponRepository.save(coupon);
    return { status: 'success', data: data };
  }
  private async generateUniqueBillHotelId(attempts = 0): Promise<string> {
    const uniqueId = generateUniqueId();
    const existingCoupon = await this.couponRepository.findOne({
      where: { code: uniqueId },
    });

    if (!existingCoupon) {
      return uniqueId;
    }

    if (attempts >= 5) {
      throw new InternalServerErrorException('Could not generate a unique ID');
    }

    return this.generateUniqueBillHotelId(attempts + 1);
  }
}
