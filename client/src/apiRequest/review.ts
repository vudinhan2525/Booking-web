import http from "@/lib/http";
const reviewApiRequest = {
  getReviews: (body: { hotelId: number; userId?: number }) =>
    http.post<any>("/review/getReviews", body, {
      headers: { "Content-Type": "application/json" },
    }),
};
export default reviewApiRequest;
