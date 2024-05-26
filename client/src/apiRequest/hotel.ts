import http from "@/lib/http";

const hotelApiRequest = {
  getHotels: (body: any) =>
    http.post<any>("/hotel/getHotel", body, {
      headers: { "Content-Type": "application/json" },
    }),
};
export default hotelApiRequest;
