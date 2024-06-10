"use client";
import React, { useState } from "react";
import HotelSaved from "./HotelSaved";
import FlightSaved from "./FlightSaved";

export default function Saved() {
  const [tabSlt, setTabSlt] = useState(0);
  return (
    <div>
      <header className="text-2xl font-bold">Saved</header>
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
      {tabSlt === 0 && <HotelSaved />}
      {tabSlt === 1 && <FlightSaved />}
    </div>
  );
}
