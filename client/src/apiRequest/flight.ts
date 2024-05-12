import http from "@/lib/http";

const flightApiRequest = {
  getFlights: (body: any) =>
    http.post<any>("/flight/getFlight", body, {
      headers: { "Content-Type": "application/json" },
    }),
};
export default flightApiRequest;
