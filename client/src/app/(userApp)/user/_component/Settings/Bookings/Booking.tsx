"use client";
import React, { useState } from "react";
import HotelBooking from "./HotelBooking";
import FlightBooking from "./FlightBooking";

export default function Booking() {
  const [tabSlt, setTabSlt] = useState(0);
  return (
    <div>
      <header className="text-2xl font-bold">My Bookings</header>
      <div className="flex mt-4">
        <div
          onClick={() => setTabSlt(0)}
          className={`${
            tabSlt === 0
              ? "border-b-primary-color text-primary-color"
              : "text-gray-600"
          } px-4 py-3 font-bold transition-all cursor-pointer border-b-[2px]`}
        >
          Hotels
        </div>
        <div
          onClick={() => setTabSlt(1)}
          className={`${
            tabSlt === 1
              ? "border-b-primary-color text-primary-color"
              : "text-gray-600"
          } px-4 py-3 font-bold transition-all cursor-pointer border-b-[2px]`}
        >
          Flights
        </div>
      </div>
      {tabSlt === 0 && <HotelBooking />}
      {tabSlt === 1 && <FlightBooking />}
    </div>
  );
}
