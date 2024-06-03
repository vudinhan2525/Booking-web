import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
export class HotelBody {
  @IsNotEmpty()
  @Expose()
  id: number;
  @IsNotEmpty()
  @Expose()
  name: string;
  @Expose()
  rating: number;
  @IsNotEmpty()
  @Expose()
  accomodation: string;

  @IsNotEmpty()
  @Expose()
  address: string;

  @IsNotEmpty()
  @Expose()
  location: string;

  @IsNotEmpty()
  @Expose()
  long: number;

  @IsNotEmpty()
  @Expose()
  lat: number;

  @IsNotEmpty()
  @Expose()
  summary: string;

  @IsNotEmpty()
  @Expose()
  facilities: string;

  @IsNotEmpty()
  @Expose()
  adminId: number;
}
