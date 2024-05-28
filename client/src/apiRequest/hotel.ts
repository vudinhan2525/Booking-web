import { IFilterHotel } from "@/interfaces/IfliterObj";
import http from "@/lib/http";

const hotelApiRequest = {
  getHotels: (body: { long: number; lat: number; filter: IFilterHotel }) =>
    http.post<any>("/hotel/getHotels", body, {
      headers: { "Content-Type": "application/json" },
    }),
  getOneHotel: (body: any) =>
    http.post<any>("/hotel/getOneHotel", body, {
      headers: { "Content-Type": "application/json" },
    }),
};
export default hotelApiRequest;
