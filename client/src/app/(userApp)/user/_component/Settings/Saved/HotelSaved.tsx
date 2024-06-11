"use client";
import userApiRequest from "@/apiRequest/user";
import HotelCart from "@/app/(userApp)/hotels/detail/_component/HotelCart";
import { IHotel } from "@/interfaces/IHotel";
import { delay } from "@/utils/delay";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HotelSaved() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getSavedHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getSavedHotel = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    try {
      const response = await userApiRequest.getSavedHotel();
      if (response.status === "success") {
        setHotels(response.data);
      }
    } catch (error) {}
    setIsLoading(false);
  };
  return (
    <div>
      {isLoading && (
        <div className="w-full">
          <div className="flex my-12 items-center justify-center">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin={true}
              className="text-[40px] text-gray-400"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div>
          {hotels.length === 0 && (
            <div className="px-4 py-4 flex gap-8 mt-2 border-[1px] rounded-md">
              <div className="relative w-[180px] h-[130px]">
                <Image
                  alt="logo"
                  quality={100}
                  src="https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp"
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="">
                <header className="font-bold text-lg mt-4">
                  No result found
                </header>
                <p className="">
                  Could not find a result for the hotel you saved. Save any
                  hotel to see all your saved hotels.
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 mt-4">
            {hotels.length > 0 &&
              hotels.map((hotel, idx) => {
                return <HotelCart key={idx} hotel={hotel} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}
