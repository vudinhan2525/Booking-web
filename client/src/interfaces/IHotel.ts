import { IRoom } from "./IRoom";

export interface IHotel {
  id: number;
  name: string;
  accomodation: string;
  location: string;
  address: string;
  long: string;
  lat: string;
  rating: number;
  numberOfRating: number;
  summary: string;
  facilities: string;
  images: string;
  roomLeft: number;
  rooms: IRoom[];
}
