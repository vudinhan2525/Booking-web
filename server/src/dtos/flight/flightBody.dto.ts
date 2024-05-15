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
  fromCode: string;
  @IsNotEmpty()
  @Expose()
  toCode: string;
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
  departureTime: Date;
  @IsNotEmpty()
  @Expose()
  arrivalTime: Date;
  @IsNotEmpty()
  @Expose()
  price: number;
  @IsNotEmpty()
  @Expose()
  seatLeft: number;
}
export class FlightQuery {
  @Expose()
  from: string;

  @Expose()
  to: string;

  @Expose()
  departureTime: string;

  @Expose()
  arrivalTime: string;

  @Expose()
  numberAdult: number;

  @Expose()
  numberChild: number;

  @Expose()
  numberInfant: number;

  @Expose()
  seatType: string;

  @Expose()
  priceFrom: number;
  @Expose()
  priceTo: number;
  @Expose()
  airline: string[];
}
