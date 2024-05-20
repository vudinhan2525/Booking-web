"use client";
import { Button } from "@/components/ui/button";
import { facilities } from "@/utils/facilities";
import {
  faChevronRight,
  faClock,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function Overview() {
  return (
    <div>
      <div className="flex mt-8 justify-between items-center">
        <div>
          <header className="text-4xl font-bold">
            Seashore Hotel & Apartment{" "}
          </header>
          <div className="flex gap-[8px] mt-2 items-center">
            <div className="text-sm px-3 py-1 bg-blue-100/60 rounded-full text-blue-600">
              Hotels
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
            <p className="text-xs text-gray-500  ml-[3px]">(109 reviews)</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div>
              <FontAwesomeIcon icon={faLocationDot} className="text-gray-600" />
            </div>
            <p className="text-sm text-gray-700">
              15-16 Hoang Sa, Man Thai Ward, Son Tra District, Da Nang, Vietnam,
              550000
            </p>
          </div>
        </div>
        <div className="items-end flex flex-col">
          <p className="text-sm text-gray-700">Price/room/night starts from</p>
          <p className="text-2xl font-bold text-orange-600">574.234 VNĐ</p>
          <Button className="bg-orange-600 px-12 text-lg font-bold mt-1 hover:bg-orange-700 transition-all">
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
              src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
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
              src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
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
              src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
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
              src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
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
              src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 rounded-xl items-center px-6 py-4 bg-[#D6F1FF] flex gap-1">
        <div className="mb-[2px] mr-[4px]">
          <FontAwesomeIcon icon={faClock} className="text-xl  text-blue-700" />
        </div>
        Don&apos;t miss out! Only{" "}
        <p className="text-blue-700 font-bold">2 room(s) left</p> for the lowest
        price.
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
            <div className="text-sm mt-2  line-clamp-[7]">
              Location Seashore Hotel & Apartment is located in area / city Man
              Thai Ward. The hotel has a very good location, also near the Da
              Nang International Airport (DAD), which is only 7.37 km away. The
              hotel is located only 4.7 km away from Da Nang Railway Station.
              There are plenty of tourist attractions nearby, such as Linh Ung
              Pagoda within 3.31 km, and Nhà hàng Bà Rô within 2.14 km. About
              Seashore Hotel & Apartment For you, travelers who wish to travel
              comfortably on a budget, Seashore Hotel & Apartment is the perfect
              place to stay that provides decent facilities as well as great
              services. This hotel is the perfect choice for couples seeking a
              romantic getaway or a honeymoon retreat. Enjoy the most memorable
              nights with your loved one by staying at Seashore Hotel &
              Apartment . Seashore Hotel & Apartment is the splendid choice for
              you who are seeking a luxurious treat for your holiday. Get
              pampered with the most excellent services and make your holiday
              memorable by staying here. From business event to corporate
              gathering, Seashore Hotel & Apartment provides complete services
              and facilities that you and your colleagues need. Have fun with
              various entertaining facilities for you and the whole family at
              Seashore Hotel & Apartment , a wonderful accommodation for your
              family holiday. If you plan to have a long-term stay, staying at
              Seashore Hotel & Apartment is the right choice for you. Providing
              wide range of facilities and great service quality, this
              accommodation certainly makes you feel at home. While traveling
              with friends can be a lot of fun, traveling solo has its own
              perks. As for the accommodation, Seashore Hotel & Apartment is
              suitable for you who value privacy during your stay. Be ready to
              get the unforgettable stay experience by its exclusive service,
              completed by a full range of facilities to cater all your needs.
              Have an enjoyable and relaxing day at the pool, whether you’re
              traveling solo or with your loved ones. 24-hours front desk is
              available to serve you, from check-in to check-out, or any
              assistance you need. Should you desire more, do not hesitate to
              ask the front desk, we are always ready to accommodate you. Savor
              your favorite dishes with special cuisines from Seashore Hotel &
              Apartment exclusively for you. WiFi is available within public
              areas of the property to help you to stay connected with family
              and friends. Seashore Hotel & Apartment is a hotel with great
              comfort and excellent service according to most hotel&apos;s
              guests. Enjoy luxurious treats and incomparable experience by
              staying at Seashore Hotel & Apartment .
            </div>
          </div>
        </div>
        <div className="basis-[40%]">
          <div className=" bg-white shadow-md rounded-md px-6 py-3">
            <div className="flex justify-between">
              <p className="font-bold">Main Facilities</p>
            </div>
            <div className="mt-2 flex gap-4 text-sm flex-wrap">
              {facilities.map((el, idx) => {
                return (
                  <div key={idx} className=" flex items-center gap-2">
                    <div>{el.icon}</div>
                    <p>{el.title}</p>
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
