import MapCaller from "@/components/component/Map/MapCaller";
import { IHotel } from "@/interfaces/IHotel";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Location({ hotel }: { hotel: IHotel }) {
  return (
    <div className="bg-white mt-4 px-4 py-6 rounded-lg shadow-md ">
      <header className="text-2xl font-bold">
        What&apos;s around Seashore Hotel & Apartment
      </header>
      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex gap-2 items-center">
          <div>
            <FontAwesomeIcon icon={faLocationDot} className="text-gray-600" />
          </div>
          <p className="text-sm text-gray-700">{`${hotel.address}, ${hotel.location}`}</p>
        </div>
        <div className="z-[1] mt-2 w-full px-24 ">
          <MapCaller
            width={"100%"}
            height={"400px"}
            long={Number(hotel.long)}
            lat={Number(hotel.lat)}
          />
        </div>
      </div>
    </div>
  );
}
