import { IRoomOpt } from "./IRoomOpt";

export interface IRoom {
  area: number;
  id: number;
  hotelId: number;
  isSmoking: boolean;
  name: string;
  facilitiesRoom: string;
  images: string[];
  roomOpts: IRoomOpt[];
}
