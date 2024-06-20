import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomBody {
  @IsNotEmpty()
  @Expose()
  hotelId: number;
  @IsNotEmpty()
  @Expose()
  name: string;
  @IsNotEmpty()
  @Expose()
  area: number;
  @IsNotEmpty()
  @Expose()
  isSmoking: boolean;
  @IsNotEmpty()
  @Expose()
  facilities: string;
  @Expose()
  oldImageUrls: string;
  @Expose()
  roomId: number;
  @IsNotEmpty()
  @Expose()
  roomOpts: {
    name: string;
    numberOfGuest: number;
    bedType: string;
    isRefundable: boolean;
    roomLeft: number;
    originalPrice: number;
    price: number;
  }[];
}
