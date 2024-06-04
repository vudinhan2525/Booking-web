import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FlightSeatBody {
  @IsNotEmpty()
  @Expose()
  cabinBaggage: number;

  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  baggage: number;

  @IsNotEmpty()
  @Expose()
  price: number;

  @IsNotEmpty()
  @Expose()
  isRefundable: boolean;

  @IsNotEmpty()
  @Expose()
  isReschedule: boolean;

  @Expose()
  refundablePrice: number;
  @Expose()
  reschedulePrice: number;

  @IsNotEmpty()
  @Expose()
  facilities: string;

  @IsNotEmpty()
  @Expose()
  seatLeft: number;

  @IsNotEmpty()
  @Expose()
  seatType: string;

  @IsNotEmpty()
  @Expose()
  flightId: number;
}
