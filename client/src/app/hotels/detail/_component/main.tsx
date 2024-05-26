import React from "react";
import Overview from "./Overview";
import RoomList from "./RoomList";
import HotelCart from "./HotelCart";
import Rating from "./Rating";

export default function MainHotelDetail() {
  return (
    <div className="px-36">
      <Overview />
      <RoomList />
      <div className="bg-[#D8F1FF]/90 px-4 py-8 rounded-xl mt-12">
        <header className="text-2xl font-bold">
          Other Accommodations You Might Like
        </header>
        <p className="text-sm">
          Similar accommodations where other guests were also staying in
        </p>
        <div className="grid grid-cols-4 gap-3 mt-4">
          <HotelCart />
          <HotelCart />
          <HotelCart />
          <HotelCart />
        </div>
      </div>
      <div className="bg-white px-4 py-4 mt-8 rounded-lg">
        <header className="text-2xl font-bold">
          What&apos;s around Seashore Hotel & Apartment
        </header>
      </div>
      <Rating />
    </div>
  );
}
