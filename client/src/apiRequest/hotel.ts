import { IFilterHotel } from "@/interfaces/IfliterObj";
import http from "@/lib/http";
import { WeekNumberLabel } from "react-day-picker";

const hotelApiRequest = {
  addHotel: async (body: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/hotel/addHotel`,
      {
        method: "POST",
        body: body,
        cache: "no-cache",
        credentials: "include",
      }
    );
    return await response.json();
  },
  updateHotel: async (body: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/hotel/updateHotel`,
      {
        method: "POST",
        body: body,
        cache: "no-cache",
        credentials: "include",
      }
    );
    return await response.json();
  },
  deleteHotel: (body: { hotelId: number }) =>
    http.post<any>("/hotel/deleteHotel", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getHotels: (body: { long: number; lat: number; filter: IFilterHotel }) =>
    http.post<any>("/hotel/getHotels", body, {
      headers: { "Content-Type": "application/json" },
    }),
  getOneHotel: (body: any) =>
    http.post<any>("/hotel/getOneHotel", body, {
      headers: { "Content-Type": "application/json" },
    }),
  getHotelFromAdmin: (body: {
    adminId: number;
    accomodation: string;
    searchText: string;
  }) =>
    http.post<any>("/hotel/getHotelFromAdmin", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default hotelApiRequest;
