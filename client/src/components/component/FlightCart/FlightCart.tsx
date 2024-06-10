import { IFlight } from "@/interfaces/IFlight";
import { formatNumber, toDayMonthYear } from "@/utils/convertTime";
import Image from "next/image";
import React from "react";

export default function FlightCart({ flight }: { flight: IFlight }) {
  return (
    <div className="shadow-xl rounded-xl">
      <div className="rounded-xl overflow-hidden w-full h-[250px] relative">
        <Image
          src="https://shopcartimg2.blob.core.windows.net/shopcartctn/tphcm.webp"
          alt="pic"
          fill
          quality={70}
          sizes="100%"
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="px-4 py-2">
        <p className="text-sm text-gray-500 font-semibold">{flight.airline}</p>
        <div className="flex gap-1 py-1">
          <p className=" font-bold">{flight.from}</p>
          <p className=" font-bold">-</p>
          <p className=" font-bold">{flight.to}</p>
        </div>
        <div className="text-sm text-gray-500">
          {toDayMonthYear(flight.departureTime)}
        </div>
        <p className="text-orange-500 font-bold">{formatNumber(1250000)}VND</p>
      </div>
    </div>
  );
}
