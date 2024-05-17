import Image from "next/image";
import React from "react";
import TypingText from "../flights/_component/TypingText";
import SearchHotels from "@/components/component/Search/SearchHotels";

export default function FlightSearchFormPage() {
  return (
    <div className=" mt-28">
      <div className="w-[full] relative h-[370px] bg-flight-ct">
        <div className="absolute z-[5] bottom-[50%] translate-y-[50%] right-[17%]">
          <div className="relative w-[300px] h-[300px]">
            <Image
              src={
                "https://shopcartimg2.blob.core.windows.net/shopcartctn/hotel3d.webp"
              }
              alt="bg"
              quality={100}
              fill
              sizes="100%"
              style={{ objectFit: "contain" }}
              className="select-none"
            />
          </div>
        </div>
        <Image
          src={
            "https://shopcartimg2.blob.core.windows.net/shopcartctn/coconuttree.png"
          }
          alt="bg"
          quality={100}
          width={300}
          height={300}
          className="select-none absolute top-[13%] z-[6] right-[40px]"
        />
        <Image
          src={
            "https://shopcartimg2.blob.core.windows.net/shopcartctn/cloud.png"
          }
          alt="bg"
          quality={100}
          width={300}
          height={300}
          className="select-none absolute top-[-60px] right-[32%]"
        />
        <div className="absolute top-[30%] text-4xl max-w-[350px] left-[10%] font-bold text-white">
          <TypingText msg="Find the best hotel for your trip." />
        </div>
        <div className="pt-20 absolute w-[70%] bottom-0 right-[50%] translate-x-[50%] bg-primary-color rounded-lg translate-y-[90%]">
          <p className="absolute top-[6%] left-[20px] px-2 py-2 border-[1px] border-white rounded-lg text-white font-bold">
            One ways / Round trip
          </p>
          <SearchHotels fromHotelsPage={true} />
        </div>
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
}
