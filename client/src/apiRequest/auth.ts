import http from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/utils/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<any>("/auth/login", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  register: (body: RegisterBodyType) =>
    http.post<any>("/users", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  logoutFromNextClient: () =>
    http.post<any>(
      "/auth/logout",
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    ),
  googleAuth: (body: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) =>
    http.post<any>("auth/googleAuth", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default authApiRequest;
