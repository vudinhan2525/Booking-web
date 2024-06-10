import SavedBookmarkFlight from "@/components/component/Saved/SavedBookmarkFlight";
import { IFlight } from "@/interfaces/IFlight";
import { getAirline } from "@/lib/dataAir";
import {
  calculateTimeDifference,
  convertTime2,
  formatNumber,
} from "@/utils/convertTime";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function Overview({ flight }: { flight: IFlight }) {
  return (
    <div>
      <div className="flex items-center mt-4 gap-4 px-6">
        <header className="text-2xl font-bold ">Your flight ticket</header>
        <SavedBookmarkFlight flight={flight} />
      </div>
      <div className="w-full px-4 py-4 bg-blue-100 mt-4">
        <div className="bg-white border-[1px] rounded-md px-4 py-4">
          <div className="flex gap-4 items-center">
            <p className="font-semibold">{`${flight.from} → ${flight.to}`}</p>
            <div className="w-[1px] h-[20px] bg-gray-400"></div>
            <p className="text-sm font-bold text-gray-600">Wed, 05 Jun 2024</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <div className="relative w-[30px] h-[30px]">
                <Image
                  alt="logo"
                  quality={100}
                  src={getAirline.get(flight.airline)}
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p>{flight.airline}</p>
            </div>
            <div className="basis-[35%] flex gap-4 items-center">
              <div>
                <p>{convertTime2(flight.departureTime)}</p>
                <p className="text-xs text-gray-700 text-center">
                  {flight.fromCode}
                </p>
              </div>
              <div className="mt-[-12px] flex flex-col gap-1  items-center">
                <div className="text-center text-xs text-gray-700">
                  {calculateTimeDifference(
                    flight.departureTime,
                    flight.arrivalTime
                  )}
                </div>
                <div className="w-[60px] relative h-[1px] bg-gray-400">
                  <div className="absolute w-[8px] h-[8px] rounded-full bg-white border-[1px] border-gray-400 translate-y-[-3.5px]"></div>
                  <div className="absolute w-[8px] h-[8px] rounded-full bg-gray-400 right-0 translate-y-[-3.5px]"></div>
                </div>
                <div className="text-center text-xs text-gray-700">Direct</div>
              </div>
              <div>
                <p>{convertTime2(flight.arrivalTime)}</p>
                <p className="text-xs text-gray-700 text-center">
                  {flight.toCode}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm font-bold text-gray-500">Price min:</p>
            <div className="flex items-center gap-1 mr-3">
              <p className="text-orange-600 text-lg font-bold">
                {formatNumber(flight.flightSeats[0].price)}
              </p>
              <p className="text-xs mt-1 text-gray-700">/pax</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
