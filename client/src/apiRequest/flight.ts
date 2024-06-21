import http from "@/lib/http";

const flightApiRequest = {
  getFlights: (body: any, params: string) =>
    http.post<any>(`/flight/getFlight${params}`, body, {
      headers: { "Content-Type": "application/json" },
    }),
  addBillFlight: (body: {
    userId: number;
    username: string;
    email: string;
    phone: string;
    airline: string;
    flightCode: string;
    departureTime: string;
    arrivalTime: string;
    from: string;
    to: string;
    price: number;
    passenger: string;
  }) =>
    http.post<any>("/billFlight/addBillFlight", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getBillFlight: (body: { userId: number; from: string }) =>
    http.post<any>("/billFlight/getBillFlight", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default flightApiRequest;
