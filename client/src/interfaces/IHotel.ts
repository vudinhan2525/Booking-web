import { IRoom } from "./IRoom";

export interface IHotel {
  id: number;
  name: string;
  accomodation: string;
  location: string;
  address: string;
  long: string;
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  lat: string;
  rating: string;
  numberOfRating: number;
  summary: string;
  facilities: string;
  images: string;
  roomLeft: number;
  adminId: number;
  rooms: IRoom[];
}
