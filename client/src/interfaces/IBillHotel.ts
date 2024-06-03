export interface IBillHotel {
  id: string;
  status: "pending" | "completed";
  price: number;
  isRefundable: boolean;
  isReschedule: boolean;
  dateCheckIn: string;
  dateCheckOut: string;
  duration: number;
  isCheckIn: boolean;
  isCheckOut: boolean;
  numberOfPassenger: number;
  numberOfRoom: number;
  bed: string;
  nameRoom: string;
  createdAt: string;
  nameHotel: string;
  roomCode: string;
  floor: string;
  userId: number;
  adminId: number;
}
