"use client";
import SortBarHotels from "@/components/component/SortBar/SortBarHotels";
import React, { useState } from "react";
const sortArr = ["Lowest Price", "Highest Price", "Top Rating", "Most Viewed"];
export default function MainSearchHotelPages() {
  const [sortSelected, setSortSelected] = useState(0);
  return (
    <div className=" bg-[#F7F9FA] h-[2000px] border-t-[1px] flex gap-8 px-28 py-10">
      <div className="basis-[32%] ">
        <SortBarHotels />
      </div>
      <div className="basis-[68%]">
        <div className="flex items-center bg-white px-6 gap-4 py-4 shadow-md rounded-lg">
          <p>Sort by:</p>
          {sortArr.map((el, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  setSortSelected(idx);
                }}
                className={`${
                  sortSelected === idx
                    ? "bg-primary-color text-white border-transparent"
                    : "text-gray-700 hover:bg-gray-100"
                } text-sm  select-none  transition-all cursor-pointer px-4 py-2 rounded-lg border-[1px] border-gray-400`}
              >
                {el}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
