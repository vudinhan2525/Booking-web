import http from "@/lib/http";

const couponApiRequest = {
  getCoupon: (body: { userId: number }) =>
    http.post<any>("/coupon/getCoupon", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  checkCoupon: (body: { couponId: string; payment: number }) =>
    http.post<any>("/coupon/checkCoupon", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default couponApiRequest;
