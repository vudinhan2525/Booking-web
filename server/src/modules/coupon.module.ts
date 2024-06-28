import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponController } from 'src/controllers/coupon.controller';
import { Coupon } from 'src/entities/coupon.entity';
import { CouponService } from 'src/services/coupon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
