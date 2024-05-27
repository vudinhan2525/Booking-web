"use client";
import React, { useRef } from "react";
import Overview from "./Overview";
import RoomList from "./RoomList";
import HotelCart from "./HotelCart";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import hotelApiRequest from "@/apiRequest/hotel";
import { IHotel } from "@/interfaces/IHotel";
import { useSearchParams } from "next/navigation";

export default function MainHotelDetail() {
  const searchParams = useSearchParams();
  const [hotel, setHotel] = useState<IHotel>();
  const [showSlt, setShowSlt] = useState(0);
  const overviewRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getHotel = async () => {
    const result = await hotelApiRequest.getOneHotel({
      hotelId: searchParams.get("hotelId"),
    });
    if (result.status === "success") {
      setHotel(result.data);
    }
  };
  const handleScrollToView = (idx: number) => {
    if (idx === 0) {
      overviewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (idx === 1 || idx === 3) {
      roomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (idx === 5) {
      reviewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <div>
      <div className="sticky py-2 gap-2 flex top-0 px-24 z-10 bg-flight-ct">
        {[
          "Overview",
          "Room",
          "Location",
          "Facilities",
          "Policy",
          "Reviews",
        ].map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setShowSlt(idx);
                handleScrollToView(idx);
              }}
              className={`${
                showSlt === idx
                  ? "bg-white text-primary-color"
                  : "text-white hover:bg-gray-300/25"
              } px-3 py-2 text-sm  font-semibold rounded-lg cursor-pointer transition-all `}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="px-36 ">
        <div ref={overviewRef}></div>
        {hotel && <Overview hotel={hotel} />}
        <div ref={roomRef}></div>
        {hotel && <RoomList hotel={hotel} />}
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
        <div ref={reviewRef}></div>
        <Rating />
      </div>
    </div>
  );
}
