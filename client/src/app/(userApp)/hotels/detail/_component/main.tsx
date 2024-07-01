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
import { useAppContext } from "@/app/(userApp)/AppProvider";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import SheetSelectRoom from "./SheetSelectRoom";
import SearchHotels from "@/components/component/Search/SearchHotels";
import { destinationsMap } from "@/lib/dataHotel";

export default function MainHotelDetail() {
  const searchParams = useSearchParams();
  const [hotel, setHotel] = useState<IHotel>();
  const [hotelsNearBy, setHotelsNearBy] = useState<IHotel[]>();
  const [showSlt, setShowSlt] = useState(0);
  const [roomSelected, setRoomSelected] = useState(0);
  const [roomOptSelected, setRoomOptSelected] = useState(0);
  const overviewRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const { user, setUser, setShowLoginModal } = useAppContext();
  const [showRatingModal, setShowRatingModal] = useState(() => {
    if (searchParams.get("rating") === "1") return true;
    return false;
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    getHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
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
        block: "start",
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
      const result = await hotelApiRequest.getHotels(
        {
          long: Number(hotel.long),
          lat: Number(hotel.lat),
          filter: tmpObj,
        },
        ""
      );
      if (result.status === "success") {
        setHotelsNearBy(result.data);
      }
    } catch (error) {}
  };
  return (
    <Sheet>
      <div>
        <SheetContent className="xl:w-[550px] xl:max-w-none max-h-full pb-0 overflow-scroll sm:w-[400px] sm:max-w-[540px]">
          {hotel && user && (
            <SheetSelectRoom
              hotel={hotel}
              roomSelected={roomSelected}
              roomOptSelected={roomOptSelected}
              user={user}
            />
          )}
        </SheetContent>

        <div className="sticky top-0 z-10">
          <div className="bg-[#219ebc]">
            {hotel && (
              <SearchHotels
                fromSearchHotelsPage={true}
                fromDetailHotelPage={true}
                hotelId={hotel.id}
                iniDestination={destinationsMap.get(searchParams.get("code"))}
                iniDuration={Number(searchParams.get("duration"))}
                iniDeparture={
                  searchParams.get("departureTime") + "T00:00:00.000Z"
                }
              />
            )}
          </div>
          <div className=" py-2 gap-2 flex  px-24 bg-flight-ct">
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
        </div>
        <div className="px-36 ">
          <div ref={overviewRef}></div>
          {hotel && <Overview roomRef={roomRef} hotel={hotel} />}
          <div ref={roomRef}></div>
          {hotel && (
            <RoomList
              hotel={hotel}
              user={user}
              setShowLoginModal={setShowLoginModal}
              setRoomSelected={setRoomSelected}
              setRoomOptSelected={setRoomOptSelected}
            />
          )}
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
          {hotel && <Rating hotel={hotel} user={user} />}
        </div>
        {showRatingModal && hotel && (
          <RatingModal hotel={hotel} setShowRatingModal={setShowRatingModal} />
        )}
      </div>
    </Sheet>
  );
}
