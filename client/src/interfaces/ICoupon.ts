export interface ICoupon {
  code: string;
  expiredDate: string;
  isGlobal: boolean;
  percent: number | null;
  price: number | null;
  priceRequire: number;
  quantity: number;
  userId: number | null;
}
