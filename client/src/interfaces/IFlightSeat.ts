export interface IFlightSeat {
  id: number;
  name: string;
  cabinBaggage: number;
  baggage: number;
  price: number;
  isRefundable: boolean;
  isReschedule: boolean;
  refundablePrice: number;
  reschedulePrice: number;
  facilities: string;
  seatLeft: number;
  flightId: number;
}
