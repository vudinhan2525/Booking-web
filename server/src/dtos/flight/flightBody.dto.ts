import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FlightBody {
  @IsNotEmpty()
  @Expose()
  fromAirport: string;
  @IsNotEmpty()
  @Expose()
  toAirport: string;
  @IsNotEmpty()
  @Expose()
  from: string;
  @IsNotEmpty()
  @Expose()
  to: string;
  @IsNotEmpty()
  @Expose()
  airline: string;
  @IsNotEmpty()
  @Expose()
  flightCode: string;
  @IsNotEmpty()
  @Expose()
  seatType: string;
  @IsNotEmpty()
  @Expose()
  airplane: string;
  @IsNotEmpty()
  @Expose()
  departureTime: string;
  @IsNotEmpty()
  @Expose()
  arrivalTime: string;
  @IsNotEmpty()
  @Expose()
  price: number;
}
