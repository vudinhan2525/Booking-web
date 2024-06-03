import http from "@/lib/http";

const billHotelApiRequest = {
  addBillHotel: (body: any) =>
    http.post<any>("/billHotel/addBillHotel", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getBillHotel: (body: { userId: number }) =>
    http.post<any>("/billHotel/getBillHotel", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default billHotelApiRequest;
