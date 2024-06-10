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

  updatePassword: (body: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) =>
    http.post<any>("users/updatePassword", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  savedHotel: (body: { hotelId: number }) =>
    http.post<any>("users/savedHotel", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  unSavedHotel: (body: { hotelId: number }) =>
    http.post<any>("users/unSavedHotel", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getSavedHotel: () =>
    http.get<any>("users/getSavedHotel", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  savedFlight: (body: { flightId: number }) =>
    http.post<any>("users/savedFlight", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  unSavedFlight: (body: { flightId: number }) =>
    http.post<any>("users/unSavedFlight", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  getSavedFlight: () =>
    http.get<any>("users/getSavedFlight", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default userApiRequest;
