import SearchHotels from "@/components/component/Search/SearchHotels";

import React from "react";
import MainSearchHotelPages from "./_component/main";

export default function SearchHotelsPage() {
  return (
    <div>
      <div className=" z-20 bg-flight-ct sticky top-0">
        <SearchHotels
          fromSearchHotelsPage={true}
          iniDestination={{ name: "Đà Nẵng", title: "Vietnam" }}
        />
      </div>
      <MainSearchHotelPages />
    </div>
  );
}
