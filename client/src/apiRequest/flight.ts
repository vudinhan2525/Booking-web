import http from "@/lib/http";

const flightApiRequest = {
  getFlights: (body: any) =>
    http.post<any>("/flight/getFlight", body, {
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
    passenger: string;
  }) =>
    http.post<any>("/billFlight/addBillFlight", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default flightApiRequest;
