"use client";
import SavedBookmark from "@/components/component/Saved/SavedBookmark";
import { Button } from "@/components/ui/button";
import { IHotel } from "@/interfaces/IHotel";
import { formatNumber } from "@/utils/convertTime";
import facilitiesMap from "@/utils/facilities";

import {
  faChevronRight,
  faClock,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function Overview({
  hotel,
  roomRef,
}: {
  hotel: IHotel;
  roomRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div>
      <div className="flex mt-8 justify-between items-center">
        <div>
          <div className="flex items-center gap-4">
            <header className="text-4xl font-bold">{hotel.name}</header>
            <SavedBookmark hotel={hotel} />
          </div>
          <div className="flex gap-[8px] mt-2 items-center">
            <div className="text-sm px-3 py-1 bg-blue-100/60 rounded-full text-blue-600">
              {hotel.accomodation}
            </div>
            <div className="flex gap-[2px]">
              {[1, 2, 3, 4].map((el, idx) => {
                return (
                  <div key={idx}>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-sm text-[#FFDC00]"
                    />
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500  ml-[3px]">{`(${hotel.numberOfRating} reviews)`}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div>
              <FontAwesomeIcon icon={faLocationDot} className="text-gray-600" />
            </div>
            <p className="text-sm text-gray-700">{`${hotel.address}, ${hotel.location}`}</p>
          </div>
        </div>
        <div className="items-end flex flex-col">
          <p className="text-sm text-gray-700">Price/room/night starts from</p>
          <p className="text-2xl font-bold text-orange-600">{`${formatNumber(
            hotel.rooms[0].roomOpts[0].price
          )} VNĐ`}</p>
          <Button
            onClick={() => {
              roomRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="bg-orange-600 px-12 text-lg font-bold mt-1 hover:bg-orange-700 transition-all"
          >
            Select room
          </Button>
        </div>
      </div>
      <div className="flex mt-6 gap-2">
        <div className="basis-[60%]">
          <div className="w-full relative h-[400px] rounded-md overflow-hidden">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={hotel.images}
            />
          </div>
        </div>
        <div className="basis-[40%] grid grid-cols-2 gap-2">
          <div className="w-full relative h-[100%] rounded-md overflow-hidden">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={hotel.images}
            />
          </div>
          <div className="w-full relative h-[100%] rounded-md overflow-hidden">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={hotel.images}
            />
          </div>
          <div className="w-full relative h-[100%] rounded-md overflow-hidden">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={hotel.images}
            />
          </div>
          <div className="w-full relative h-[100%] rounded-md overflow-hidden">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={hotel.images}
            />
          </div>
        </div>
      </div>
      <div className="mt-2 rounded-xl items-center px-6 py-4 bg-[#D6F1FF] flex gap-1">
        <div className="mb-[2px] mr-[4px]">
          <FontAwesomeIcon icon={faClock} className="text-xl  text-blue-700" />
        </div>
        Don&apos;t miss out! Only{" "}
        <p className="text-blue-700 font-bold">{`${hotel.rooms[0].roomOpts[0].roomLeft} room(s) left`}</p>{" "}
        for the lowest price.
      </div>
      <div className="flex mt-4 gap-4">
        <div className="basis-[60%]">
          <div className="bg-white shadow-md rounded-md px-6 py-3">
            <div className="flex justify-between">
              <p className="font-bold">About Accommodation</p>
              <div className="flex text-blue-600 hover:text-blue-700 items-center gap-1">
                <p className=" font-bold  cursor-pointer transition-all">
                  Read more
                </p>
                <div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className=" mt-1 text-sm  cursor-pointer transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="text-sm mt-2  line-clamp-[7]">{hotel.summary}</div>
          </div>
        </div>
        <div className="basis-[40%]">
          <div className=" bg-white shadow-md rounded-md px-6 py-3">
            <div className="flex justify-between">
              <p className="font-bold">Main Facilities</p>
            </div>
            <div id="Facilities" className="mt-2 flex gap-4 text-sm flex-wrap">
              {hotel.facilities.split(",").map((el, idx) => {
                return (
                  <div key={idx} className=" flex items-center gap-2">
                    <div>{facilitiesMap.get(el)?.icon}</div>
                    <p>{facilitiesMap.get(el)?.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
