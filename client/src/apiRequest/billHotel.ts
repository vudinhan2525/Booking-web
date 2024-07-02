import http from "@/lib/http";

const billHotelApiRequest = {
  addBillHotel: (body: any) =>
    http.post<any>("/billHotel/addBillHotel", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getBillHotel: (body: { userId: number }, params: string) =>
    http.post<any>(`/billHotel/getBillHotel${params}`, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getBillHotelForAdmin: (
    body: {
      adminId: number;
      search: string;
      status: string;
    },
    params: string
  ) =>
    http.post<any>(`/billHotel/getBillHotelForAdmin${params}`, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  checkIn: (body: { billHotelId: string; floor: string; roomCode: string }) =>
    http.post<any>("/billHotel/checkIn", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  checkOut: (body: { billHotelId: string }) =>
    http.post<any>("/billHotel/checkOut", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default billHotelApiRequest;
