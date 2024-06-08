import { IBillFlight } from "@/interfaces/IBillFlight";
import { getAirline } from "@/lib/dataAir";
import { convertTime4, formatISODate } from "@/utils/convertTime";
import Image from "next/image";
import React from "react";

export default function DetailFlightBooking({
  flightBooking,
}: {
  flightBooking: IBillFlight;
}) {
  return (
    <div>
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

      <div className="mt-3 pt-4 border-[1px] rounded-md">
        <div className="px-4 pb-3 flex justify-between items-center border-b-[1px]">
          <p className="text-lg font-bold">Flight details</p>
          {/* <div className="flex gap-1 items-center">
            <p className="text-xs font-bold text-gray-400 ">{`Booking flight code:`}</p>
            <p className="font-bold mb-1 text-primary-color text-lg">
              {flightBooking.id}
            </p>
          </div> */}
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
            <p className="text-gray-600 font-medium">Departure time</p>
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
            <p className="text-gray-600 font-medium">Arrival time</p>
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
    </div>
  );
}
