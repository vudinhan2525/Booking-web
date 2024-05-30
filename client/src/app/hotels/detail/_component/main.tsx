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
import Location from "./Location";
import { IFilterHotel } from "@/interfaces/IfliterObj";
import RatingModal from "@/components/modals/RatingModal";

export default function MainHotelDetail() {
  const searchParams = useSearchParams();
  const [hotel, setHotel] = useState<IHotel>();
  const [hotelsNearBy, setHotelsNearBy] = useState<IHotel[]>();
  const [showSlt, setShowSlt] = useState(0);
  const overviewRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const [showRatingModal, setShowRatingModal] = useState(() => {
    if (searchParams.get("rating") === "1") return true;
    return false;
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    getHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (hotel && Object.keys(hotel).length > 0) {
      getHotelNearBy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel]);
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
    if (idx === 2) {
      locationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (idx === 4) {
      reviewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const getHotelNearBy = async () => {
    if (!hotel) return;
    try {
      const tmpObj: IFilterHotel = {
        priceMax: 10000000,
        priceMin: 0,
        accomodation: "Hotels",
        facilities: "",
        rating: "",
        sortBy: "",
      };
      const result = await hotelApiRequest.getHotels({
        long: Number(hotel.long),
        lat: Number(hotel.lat),
        filter: tmpObj,
      });
      if (result.status === "success") {
        setHotelsNearBy(result.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="sticky py-2 gap-2 flex top-0 px-24 z-10 bg-flight-ct">
        {["Overview", "Room", "Location", "Facilities", "Reviews"].map(
          (el, idx) => {
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
          }
        )}
      </div>
      <div className="px-36 ">
        <div ref={overviewRef}></div>
        {hotel && <Overview hotel={hotel} />}
        <div ref={roomRef}></div>
        {hotel && <RoomList hotel={hotel} />}
        <div ref={locationRef}></div>
        {hotel && <Location hotel={hotel} />}
        <div className="bg-[#D8F1FF]/90 px-4 py-8 rounded-xl mt-12">
          <header className="text-2xl font-bold">
            Other Accommodations You Might Like
          </header>
          <p className="text-sm">
            Similar accommodations where other guests were also staying in
          </p>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {hotelsNearBy &&
              hotelsNearBy.map((el, idx) => {
                if (el.id != hotel?.id) {
                  return <HotelCart key={idx} hotel={el} />;
                }
              })}
          </div>
        </div>
        <div ref={reviewRef}></div>
        <Rating />
      </div>
      {showRatingModal && hotel && (
        <RatingModal hotel={hotel} setShowRatingModal={setShowRatingModal} />
      )}
    </div>
  );
}
