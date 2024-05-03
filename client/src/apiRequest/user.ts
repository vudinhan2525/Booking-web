import http from "@/lib/http";

const userApiRequest = {
  forgotPassword: (body: { email: string }) =>
    http.post<any>("users/forgotPassword", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default userApiRequest;
