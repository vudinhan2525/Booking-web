import { IBillFlight } from "@/interfaces/IBillFlight";
import { getAirline } from "@/lib/dataAir";
import { convertTime4, formatISODate } from "@/utils/convertTime";
import {
  faCartFlatbedSuitcase,
  faChevronLeft,
  faPlaneArrival,
  faPlaneDeparture,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function DetailFlightBooking({
  flightBooking,
  setShowDetailFlight,
}: {
  flightBooking: IBillFlight;
  setShowDetailFlight: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [passenger, setPassenger] = useState<
    {
      firstName: string;
      lastName: string;
      isChild: boolean;
      cabinBaggage: number;
      baggage: number;
      birthDay: string;
    }[]
  >();
  useEffect(() => {
    if (flightBooking.passenger) {
      setPassenger(JSON.parse(flightBooking.passenger));
    }
  }, [flightBooking]);
  return (
    <div>
      <div className="my-2">
        <div
          onClick={() => setShowDetailFlight(false)}
          className="w-[50px] h-[50px] flex items-center cursor-pointer justify-center transition-all hover:bg-gray-200 rounded-full "
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
        </div>
      </div>
      <div className=" pt-4 border-[1px] rounded-md">
        <div className="px-4 pb-3 flex justify-between items-center border-b-[1px]">
          <p className="text-lg font-bold">Booking details</p>
          <div className="flex gap-1 items-center">
            <p className="text-xs font-bold text-gray-400 ">{`Booking flight code:`}</p>
            <p className="font-bold mb-1 text-primary-color text-lg">
              {flightBooking.id}
            </p>
          </div>
        </div>
        <div className="flex px-4 py-2 bg-gray-50">
          <div className="basis-[50%] ">Booked by</div>
          <div className="basis-[50%]">{flightBooking.username}</div>
        </div>
        <div className="flex px-4 py-2 ">
          <div className="basis-[50%] ">Booking Date</div>
          <div className="basis-[50%]">
            {convertTime4(flightBooking.createdAt)}
          </div>
        </div>
        <div className="flex px-4 py-2 bg-gray-50">
          <div className="basis-[50%] ">Contact&apos;s email address</div>
          <div className="basis-[50%]">{flightBooking.email}</div>
        </div>
      </div>
      <div className="mt-3 pt-4 border-[1px] rounded-md pb-4">
        <div className="px-4 pb-3 flex justify-between items-center border-b-[1px]">
          <p className="text-lg font-bold">Flight details</p>
        </div>
        <div className="flex items-center px-4 py-2  gap-2">
          <div className="relative w-[30px] h-[30px]">
            <Image
              alt="logo"
              quality={100}
              src={getAirline.get(flightBooking.airline)}
              fill
              sizes="100%"
              style={{ objectFit: "contain" }}
            />
          </div>
          <p>{flightBooking.airline}</p>
          <p>{flightBooking.flightCode}</p>
        </div>
        <div className="flex px-4 py-2 bg-gray-50">
          <div className="basis-[50%] ">
            <div className="flex gap-2 text-gray-600">
              <div>
                <FontAwesomeIcon icon={faPlaneDeparture} />
              </div>
              <p className="text-gray-600 font-medium">Departure time</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-500">
                {formatISODate(flightBooking.departureTime)}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {flightBooking.from}
              </p>
            </div>
          </div>
          <div className="basis-[50%]">
            <div className="flex gap-2 text-gray-600">
              <div>
                <FontAwesomeIcon icon={faPlaneArrival} />
              </div>
              <p className="text-gray-600 font-medium">Arrival time</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-500">
                {formatISODate(flightBooking.arrivalTime)}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {flightBooking.to}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 py-4 border-[1px] rounded-md">
        <div className="px-4 pb-3 flex justify-between items-center border-b-[1px]">
          <p className="text-lg font-bold">Passenger(s)</p>
        </div>
        <div className="">
          {passenger &&
            passenger.map((el, idx) => {
              return (
                <div key={idx} className="px-4 py-4 bg-gray-50 ">
                  <p>{`${el.firstName} ${el.lastName} ${
                    el.isChild ? "(Child)" : "(Adult)"
                  }`}</p>
                  <div className="flex mt-2 gap-3">
                    <div className="basis-[35%]">
                      <p className="text-sm font-bold text-gray-600">{`${flightBooking.from} → ${flightBooking.to}`}</p>
                    </div>
                    <div className="basis-[65%]">
                      <div className="flex gap-2  items-center">
                        <div className="min-w-[20px] text-gray-600">
                          <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
                        </div>
                        <p>{`Cabin Baggage ${el.cabinBaggage} kg`}</p>
                      </div>
                      <div className="flex gap-2 mt-2 items-center">
                        <div className="min-w-[20px] text-gray-600">
                          <FontAwesomeIcon icon={faSuitcase} />
                        </div>
                        <p className="">{`Baggage ${el.baggage} kg`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
