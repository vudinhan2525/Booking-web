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
  getMeFromClient: () =>
    http.get<any>("users/getMe", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  updateme: (body: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) =>
    http.post<any>("users/updateUser", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default userApiRequest;
