"use client";
import billHotelApiRequest from "@/apiRequest/billHotel";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import { IBillHotel } from "@/interfaces/IBillHotel";
import { RefundableIcon, RescheduleIcon } from "@/lib/icon";
import {
  convertTime,
  convertTime4,
  formatISODate,
  formatNumber,
} from "@/utils/convertTime";
import { delay } from "@/utils/delay";
import {
  faBed,
  faCalendarDays,
  faCircleNotch,
  faDoorClosed,
  faHotel,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HotelBooking() {
  const { user } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [billHotels, setBillHotels] = useState<IBillHotel[]>([]);
  useEffect(() => {
    getHotelBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getHotelBookings = async () => {
    if (!user) return;
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    try {
      const response = await billHotelApiRequest.getBillHotel({
        userId: user.id,
      });
      if (response.status === "success") {
        setBillHotels(response.data);
      }
    } catch (error) {}
    setIsLoading(false);
  };
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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
        <div className="flex flex-col gap-3">
          <div></div>

          {billHotels.length === 0 && (
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
                  Could not find a result for the hotels you booking. Booking
                  any hotel to see all your transactions.
                </p>
              </div>
            </div>
          )}
          {billHotels.length > 0 &&
            billHotels.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className="px-6 py-4 border-[1px] border-gray-300 rounded-md"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <p className="text-xs font-bold text-gray-400 ">
                        Booking code:
                      </p>
                      <p className="mb-[2px] font-bold text-primary-color">
                        {el.id}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-xs font-bold text-gray-400 ">
                        Status:
                      </p>
                      <p className="mb-[2px] font-bold text-primary-color">
                        {capitalizeFirstLetter(el.status)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <header className="font-bold text-lg">
                      {el.nameHotel}
                    </header>
                    <div className="flex gap-2 items-center">
                      <p className="text-xs font-bold text-gray-400 ">Date:</p>
                      <p className="mb-[2px] font-bold text-gray-600">
                        {formatISODate(el.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">{`(${el.numberOfRoom}x) ${el.nameRoom}`}</p>
                  <div className="bg-gray-300 w-full h-[0.5px] my-4"></div>
                  <div className="flex mt-4 justify-between mx-20">
                    <div className="basis-[35%]">
                      <div
                        className={`${
                          el.isCheckIn
                            ? "border-primary-color border-[2px] bg-blue-50"
                            : "border-gray-300 border-[1px]"
                        } w-full px-4 py-3   rounded-xl flex flex-col items-center`}
                      >
                        <p className="text-xs text-gray-600 font-semibold">
                          Check in
                        </p>
                        <p className="  font-bold">
                          {convertTime4(el.dateCheckIn)}
                        </p>
                        <p className="text-xs mt-1 text-gray-600 font-semibold">
                          After 14:00
                        </p>
                      </div>
                    </div>
                    <div className="basis-[20%] flex items-center gap-1 flex-col justify-center">
                      <p className="text-xs text-gray-600 font-semibold">{`${el.duration} Night(s)`}</p>
                      <div className="w-full h-[1px] bg-gray-200 relative">
                        <div className="absolute w-[10px] h-[10px] border-[1px] rounded-full top-0 translate-y-[-50%] bg-white"></div>
                        <div className="absolute w-[10px] h-[10px] border-[1px] border-gray-600 rounded-full right-0 translate-y-[-50%] bg-gray-600"></div>
                      </div>
                    </div>
                    <div className="basis-[35%]">
                      <div
                        className={`${
                          el.isCheckOut
                            ? "border-primary-color border-[2px] bg-blue-50"
                            : "border-gray-300 border-[1px]"
                        } w-full px-4 py-3   rounded-xl flex flex-col items-center`}
                      >
                        <p className="text-xs text-gray-600 font-semibold">
                          Check out
                        </p>
                        <p className="  font-bold">
                          {convertTime4(el.dateCheckOut)}
                        </p>
                        <p className="text-xs mt-1 text-gray-600 font-semibold">
                          Before 12:00
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-6 mx-6 gap-16">
                    <div className="flex gap-2 flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <RefundableIcon
                            width="18px"
                            height="19px"
                            fill="#000000"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                          Refundable
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="text-gray-800"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                          Reschedule
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <FontAwesomeIcon
                            icon={faBed}
                            className="text-gray-800"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                          {el.bed}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <FontAwesomeIcon
                            icon={faMoon}
                            className="text-gray-800"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">{`${el.duration} Night(s), ${el.numberOfRoom} Room(s)`}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                      {el.floor && (
                        <div className="flex gap-2 items-center">
                          <div className="min-w-[18px]">
                            <FontAwesomeIcon
                              icon={faHotel}
                              className="text-gray-800"
                            />
                          </div>
                          <p className="text-sm font-bold text-gray-600">{`Floor: ${el.floor}`}</p>
                        </div>
                      )}
                      {el.roomCode && (
                        <div className="flex gap-2 items-center">
                          <div className="min-w-[18px]">
                            <FontAwesomeIcon
                              icon={faDoorClosed}
                              className="text-gray-800"
                            />
                          </div>
                          <p className="text-sm font-bold text-gray-600">{`Room code: ${el.roomCode}`}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-300 w-full h-[0.5px] my-4"></div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-600">Total price:</p>
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center gap-1 ">
                          <p
                            className={`${
                              el.isPayment && "line-through"
                            } text-xl font-bold text-orange-600`}
                          >{`${formatNumber(el.price)}`}</p>
                          <p className="mt-[3px] text-xs font-semibold text-gray-500">
                            VNĐ
                          </p>
                        </div>
                        {el.isPayment && (
                          <p className="text-sm font-bold text-orange-600">
                            Payment completed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
