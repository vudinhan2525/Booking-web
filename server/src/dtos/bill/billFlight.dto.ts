import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
export class BillFlightBody {
  @IsNotEmpty()
  @Expose()
  userId: number;

  @IsNotEmpty()
  @Expose()
  username: string;

  @IsNotEmpty()
  @Expose()
  email: string;

  @Expose()
  status: 'pending' | 'completed';

  @IsNotEmpty()
  @Expose()
  phone: string;

  @IsNotEmpty()
  @Expose()
  airline: string;

  @IsNotEmpty()
  @Expose()
  price: number;

  @IsNotEmpty()
  @Expose()
  flightCode: string;

  @IsNotEmpty()
  @Expose()
  departureTime: string;

  @IsNotEmpty()
  @Expose()
  arrivalTime: string;

  @IsNotEmpty()
  @Expose()
  from: string;

  @IsNotEmpty()
  @Expose()
  to: string;

  @IsNotEmpty()
  @Expose()
  passenger: string;
}
