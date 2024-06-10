import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
export class BillHotelBody {
  @IsNotEmpty()
  @Expose()
  price: number;

  @IsNotEmpty()
  @Expose()
  isRefundable: boolean;

  @IsNotEmpty()
  @Expose()
  isReschedule: boolean;

  @IsNotEmpty()
  @Expose()
  status: 'pending' | 'completed';

  @IsNotEmpty()
  @Expose()
  numberOfPassenger: number;
  @IsNotEmpty()
  @Expose()
  numberOfRoom: number;

  @IsNotEmpty()
  @Expose()
  dateCheckIn: string;

  @IsNotEmpty()
  @Expose()
  duration: number;

  @IsNotEmpty()
  @Expose()
  dateCheckOut: string;

  @IsNotEmpty()
  @Expose()
  bed: string;

  @IsNotEmpty()
  @Expose()
  nameRoom: string;

  @IsNotEmpty()
  @Expose()
  nameHotel: string;

  @IsNotEmpty()
  @Expose()
  userId: number;

  @IsNotEmpty()
  @Expose()
  adminId: number;
}
