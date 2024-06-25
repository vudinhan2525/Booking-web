import http from "@/lib/http";

const paymentApiRequest = {
  getMomo: (body: any) =>
    http.post<any>("/payment/momo", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default paymentApiRequest;
