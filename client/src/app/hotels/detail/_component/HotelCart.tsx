"use client";
import { IHotel } from "@/interfaces/IHotel";
import { formatNumber } from "@/utils/convertTime";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function HotelCart({ hotel }: { hotel: IHotel }) {
  return (
    <Link
      href={`/hotels/detail?hotelId=${hotel.id}`}
      className="w-full rounded-lg overflow-hidden border-[1px] hover:border-primary-color border-transparent transition-all cursor-pointer"
    >
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
        <header className="font-bold line-clamp-1">{hotel.name}</header>
        <div className="flex items-center gap-2">
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5].map((el, idx) => {
              return (
                <div key={idx}>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={` ${
                      el <= hotel.rating ? "text-[#FFDC00]" : "text-[#E5E7EB]"
                    } text-sm`}
                  />
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-600 mt-[2px]">{`${hotel.rating} (${hotel.numberOfRating})`}</p>
        </div>
        <p className="text-sm line-through text-gray-400 mt-2">{`${formatNumber(
          hotel?.rooms[0]?.roomOpts[0]?.originalPrice
        )} VNĐ`}</p>
        <p className="text-orange-600 font-bold">{`${formatNumber(
          hotel?.rooms[0]?.roomOpts[0]?.price
        )} VNĐ`}</p>
        <p className="text-xs text-gray-600">Exclude taxes & fees</p>
      </div>
    </Link>
  );
}
