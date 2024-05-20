"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function HotelCart() {
  return (
    <div className="w-full rounded-lg overflow-hidden border-[1px] hover:border-primary-color border-transparent transition-all cursor-pointer">
      <div className="relative w-full h-[200px]">
        <Image
          alt="img"
          fill
          priority
          sizes="100%"
          quality={60}
          style={{ objectFit: "cover", objectPosition: "center" }}
          src="https://shopcartimg2.blob.core.windows.net/shopcartctn/hotel2.jpg"
        />
      </div>
      <div className="px-4 py-3 bg-white">
        <header className="font-bold line-clamp-1">
          NAM Hotels & Residences
        </header>
        <div className="flex items-center gap-2">
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5].map((el, idx) => {
              return (
                <div key={idx}>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[#FFDC00] text-sm"
                  />
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-600 mt-[2px]">4.6 (106)</p>
        </div>
        <p className="text-sm line-through text-gray-400 mt-2">1.481.700 VNĐ</p>
        <p className="text-orange-600 font-bold">538.700 VNĐ</p>
        <p className="text-xs text-gray-600">Exclude taxes & fees</p>
      </div>
    </div>
  );
}
