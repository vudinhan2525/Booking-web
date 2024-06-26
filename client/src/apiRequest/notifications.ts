import http from "@/lib/http";

const notiApiRequest = {
  getNoti: (body: { userId: number }) =>
    http.post<any>("/noti/getNoti", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  readNoti: (body: { userId: number; notiId: number }) =>
    http.post<any>("/noti/readNoti", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default notiApiRequest;
