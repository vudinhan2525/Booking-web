import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FlightBody {
  @Expose()
  id: number;
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
  airplane: string;
  @IsNotEmpty()
  @Expose()
  departureTime: string;
  @IsNotEmpty()
  @Expose()
  arrivalTime: string;
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
  @Expose()
  departureHour: number;
  @Expose()
  arrivalHour: number;
}
