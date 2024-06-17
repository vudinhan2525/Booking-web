import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
export class HotelBody {
  @Expose()
  id: number;

  @IsNotEmpty()
  @Expose()
  name: string;

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

  @Expose()
  adminId: number;
}
