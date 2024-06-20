import http from "@/lib/http";

const roomApiRequest = {
  createRoom: async (body: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/room/createRoom`,
      {
        method: "POST",
        body: body,
        cache: "no-cache",
        credentials: "include",
      }
    );
    return await response.json();
  },
  updateRoom: async (body: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/room/updateRoom`,
      {
        method: "POST",
        body: body,
        cache: "no-cache",
        credentials: "include",
      }
    );
    return await response.json();
  },
  deleteRoom: (body: { roomId: number; oldImageUrls: string }) =>
    http.post<any>("/room/deleteRoom", body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
};
export default roomApiRequest;
