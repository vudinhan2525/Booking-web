"use client";

import FlightCart from "@/components/component/FlightCart/FlightCart";
import { Button } from "@/components/ui/button";
import { IFlight } from "@/interfaces/IFlight";
import { useState } from "react";

export default function MostPopularFlight() {
  const [selectId, setSelectId] = useState(0);
  const flight: IFlight = {
    id: 1,
    fromAirport: "Tan Son Nhat",
    toAirport: "Noi Bai",
    from: "Ha Noi",
    to: "Ho Chi Minh",
    fromCode: "HAN",
    toCode: "SGN",
    airline: "Vietnam Airlines",
    seatType: "",
    airplane: "",
    flightCode: "VN-124",
    departureTime: "2024-12-10T10:45:00.000Z",
    arrivalTime: "2024-12-10T12:30:00.000Z",
    price: 1259000,
    seatLeft: 400,
  };
  return (
    <div className="mt-4">
      <div className="flex py-1 gap-2">
        {["Vietnam", "Thailand", "Singapore", "South Korea"].map((el, idx) => {
          return (
            <Button
              onClick={() => {
                setSelectId(idx);
              }}
              key={idx}
              className={`${
                selectId === idx
                  ? "bg-primary-color hover:bg-primary-color text-white"
                  : "bg-[#F7F9FA] text-primary-color hover:bg-[#F7F9FA]"
              } rounded-full    font-bold `}
            >
              {el}
            </Button>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-4 mt-3">
        <FlightCart flight={flight} />
        <FlightCart flight={flight} />
        <FlightCart flight={flight} />
        <FlightCart flight={flight} />
      </div>
    </div>
  );
}
