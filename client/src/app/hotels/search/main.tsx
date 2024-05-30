"use client";
import SearchHotels from "@/components/component/Search/SearchHotels";

import React from "react";
import MainSearchHotelPages from "./_component/main";
import { useSearchParams } from "next/navigation";
import { destinationsMap } from "@/lib/dataHotel";

export default function Main() {
  const params = useSearchParams();
  return (
    <div>
      <div className=" z-20 bg-flight-ct sticky top-0">
        <SearchHotels
          fromSearchHotelsPage={true}
          iniDestination={destinationsMap.get(params.get("code"))}
          iniDuration={Number(params.get("duration"))}
          iniDeparture={params.get("departureTime") + "T00:00:00.000Z"}
        />
      </div>
      <MainSearchHotelPages />
    </div>
  );
}
