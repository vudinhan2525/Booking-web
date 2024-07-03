import http from "@/lib/http";
const reviewApiRequest = {
  getReviews: (body: { hotelId: number; userId?: number }) =>
    http.post<any>("/review/getReviews", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  checkCanReview: (body: { hotelId: number; userId: number }) =>
    http.post<any>("/review/checkCanReview", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getReviewsForAdmin: (body: { adminId: number; hotelId: number }) =>
    http.post<any>("review/getReviewsForAdmin", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  replyReview: (body: { reviewId: number; reply: string }) =>
    http.post<any>("review/replyReview", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default reviewApiRequest;
