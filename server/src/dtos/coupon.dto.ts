import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CouponBodyDto {
  @Expose()
  code: string;

  @IsNotEmpty()
  @Expose()
  expiredDate: string;

  @IsNotEmpty()
  @Expose()
  quantity: number;

  @Expose()
  percent: number;
  @Expose()
  price: number;

  @Expose()
  priceRequire: number;

  @Expose()
  isGlobal: boolean;
  @Expose()
  userId: number;
}
