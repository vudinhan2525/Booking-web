import { destinations } from "@/lib/dataHotel";
import { getCurrentDateFormatted } from "@/utils/convertTime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function TrendingDestination() {
  return (
    <div>
      <div className="h-[670px] relative w-full">
        <Image
          src={
            "https://shopcartimg2.blob.core.windows.net/shopcartctn/5570834.jpg"
          }
          alt="bg"
          quality={100}
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
          className="select-none"
        />
        <div className="absolute w-full items-center h-full flex flex-col">
          <div className="flex gap-2 mt-20">
            <p className="text-4xl font-bold text-primary-color">Treding</p>
            <p className="text-4xl font-bold text-white">
              Destinations in Vietnam
            </p>
          </div>
          <p className="text-white mt-4 mb-8">
            Explore our treding city in Vietnam that most people often visit.
          </p>
          <div className="flex gap-6 w-full px-12">
            {destinations.map((el, idx) => {
              if (idx > 3) return;
              return (
                <Link
                  ///hotels/search?lat=16.0482957629242&long=108.21930463520579&code=DAD&departureTime=2024-06-22&arrivalTime=2024-06-23&duration=1&numberPassenger=1-0-1
                  key={idx}
                  href={`/hotels/search?lat=${el.lat}&long=${el.long}&code=${
                    el.code
                  }&departureTime=${getCurrentDateFormatted()}&duration=1&numberPassenger=1-0-1`}
                  className="basis-[25%] relative overflow-hidden hover:scale-105 transition-all cursor-pointer rounded-xl h-[400px] bg-red-50"
                >
                  <Image
                    src={el.image}
                    alt="bg"
                    quality={100}
                    fill
                    sizes="100%"
                    style={{ objectFit: "cover" }}
                    className="select-none"
                  />
                  <div className="absolute bottom-[3%] left-[50%] translate-x-[-50%] min-w-[150px] text-center px-7 py-2 font-bold rounded-full bg-white ">
                    {el.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
