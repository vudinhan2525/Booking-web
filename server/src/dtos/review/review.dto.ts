import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class ReviewBodyDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  rating: number;

  @IsNotEmpty()
  @Expose()
  summary: string;

  @IsNotEmpty()
  @Expose()
  hotelId: number;

  @IsNotEmpty()
  @Expose()
  userId: number;

  @Expose()
  oldImageUrls: string;
}
