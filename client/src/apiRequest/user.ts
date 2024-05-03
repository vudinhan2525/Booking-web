import http from "@/lib/http";

const userApiRequest = {
  forgotPassword: (body: { email: string }) =>
    http.post<any>("users/forgotPassword", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  resetPassword: (body: {
    token: string;
    password: string;
    passwordConfirm: string;
  }) =>
    http.post<any>("users/resetPassword", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default userApiRequest;
