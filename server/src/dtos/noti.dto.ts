import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class NotiBodyDto {
  @IsNotEmpty()
  @Expose()
  header: string;

  @IsNotEmpty()
  @Expose()
  content: string;

  @Expose()
  image: string;

  @Expose()
  link: string;
  @Expose()
  isGlobal: boolean;

  @Expose()
  userId: number;
}
