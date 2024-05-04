"use client";

import { faCar, faHotel, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchFlight from "./SearchFlight";

export default function SearchForm() {
  const [optSelected, setOptSelected] = useState(1);
  const searchOpt = [
    {
      title: "Hotels",
      icon: <FontAwesomeIcon className="text-[22px]" icon={faHotel} />,
    },
    {
      title: "Flights",
      icon: <FontAwesomeIcon className="text-[22px]" icon={faPlane} />,
    },
    {
      title: "Car Rentals",
      icon: <FontAwesomeIcon className="text-[22px]" icon={faCar} />,
    },
  ];
  return (
    <div>
      <div className="flex items-center gap-4 w-full border-b-[1px] pb-2">
        {searchOpt.map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setOptSelected(idx);
              }}
              className={`${
                idx === optSelected ? "bg-white text-black" : "text-gray-300"
              } flex gap-2 px-4 py-2 rounded-full items-center hover:border-gray-300 border-[1px] border-transparent  cursor-pointer transition-all`}
            >
              <div
                className={`${
                  idx === optSelected ? "text-primary-color" : "text-gray-300"
                }`}
              >
                {el.icon}
              </div>
              <div className="text-lg font-semibold">{el.title}</div>
            </div>
          );
        })}
      </div>
      <div>
        {searchOpt[optSelected].title === "Flights" && <SearchFlight />}
      </div>
    </div>
  );
}
