"use client";
import SavedBookmarkFlight from "@/components/component/Saved/SavedBookmarkFlight";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { IFlight } from "@/interfaces/IFlight";
import { getAirline } from "@/lib/dataAir";
import { RefundableIcon, RescheduleIcon } from "@/lib/icon";
import {
  calculateTimeDifference,
  convertTime2,
  formatNumber,
  isoStringToMonthDay,
} from "@/utils/convertTime";
import {
  faCheckCircle,
  faCircleInfo,
  faCircleXmark,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FlightItem({
  flight,
  handleSelectFlight,
  fromSavedPage,
}: {
  flight: IFlight;
  handleSelectFlight?: () => void;
  fromSavedPage?: boolean;
}) {
  const [opt, setOpt] = useState("");
  const searchParams = useSearchParams();
  const [numberOfPassenger, setNumberOfPassenger] = useState(() => {
    const string = searchParams.get("numberPassenger");
    if (string !== null) {
      const numberStringArr = string.split("-");
      for (let i = 0; i < numberStringArr.length; i++) {
        if (Number.isNaN(Number(numberStringArr[i]))) {
          return {
            adult: 1,
            child: 0,
            infant: 0,
          };
        }
      }
      if (Number(numberStringArr[0]) === 0) {
        return {
          adult: 1,
          child: 0,
          infant: 0,
        };
      }
      if (Number(numberStringArr[2]) > Number(numberStringArr[0])) {
        return {
          adult: Number(numberStringArr[0]),
          child: Number(numberStringArr[1]),
          infant: Number(numberStringArr[0]),
        };
      }
      return {
        adult: Number(numberStringArr[0]),
        child: Number(numberStringArr[1]),
        infant: Number(numberStringArr[2]),
      };
    }
    return {
      adult: 1,
      child: 0,
      infant: 0,
    };
  });
  const [price, setPrice] = useState({ adult: 0, child: 0 });
  useEffect(() => {
    if (numberOfPassenger && flight) {
      setPrice({
        adult: flight.flightSeats[0].price * numberOfPassenger.adult,
        child:
          ((flight.flightSeats[0].price * 90) / 100) * numberOfPassenger.child,
      });
    }
  }, [flight, numberOfPassenger]);
  return (
    <div
      className={`bg-white  transition-all hover:border-primary-color border-[1px] ${
        fromSavedPage ? "border-gray-300" : "border-transparent"
      } cursor-pointer pb-4 w-full mt-4 shadow-md rounded-xl`}
    >
      <div
        onClick={() => {
          if (opt !== "") {
            setOpt("");
          } else {
            setOpt("flightdetail");
          }
        }}
      >
        <div className="flex pt-4 px-4 pb-6">
          <div className="basis-[50%] flex items-center gap-2">
            <div className="relative w-[30px] h-[30px]">
              <Image
                alt="logo"
                quality={100}
                src={getAirline.get(flight.airline)}
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p>{flight.airline}</p>
            <SavedBookmarkFlight flight={flight} fromSearchPage={true} />
          </div>
          <div className="basis-[25%] flex gap-3 items-center">
            <div>
              <p>{convertTime2(flight.departureTime)}</p>
              <p className="text-xs text-gray-700 text-center">
                {flight.fromCode}
              </p>
            </div>
            <div className="mt-[-12px] flex flex-col gap-1  items-center">
              <div className="text-center text-xs text-gray-700">
                {calculateTimeDifference(
                  flight.departureTime,
                  flight.arrivalTime
                )}
              </div>
              <div className="w-[40px] relative h-[1px] bg-gray-400">
                <div className="absolute w-[8px] h-[8px] rounded-full bg-white border-[1px] border-gray-400 translate-y-[-3.5px]"></div>
                <div className="absolute w-[8px] h-[8px] rounded-full bg-gray-400 right-0 translate-y-[-3.5px]"></div>
              </div>
              <div className="text-center text-xs text-gray-700">Direct</div>
            </div>
            <div>
              <p>{convertTime2(flight.arrivalTime)}</p>
              <p className="text-xs text-gray-700 text-center">
                {flight.toCode}
              </p>
            </div>
          </div>
          <div className="basis-[25%] mr-[10px] flex justify-end gap-[2px]">
            <p className="text-orange-600 font-bold">{`${formatNumber(
              flight.flightSeats[0].price
            )} VND`}</p>
            <p className="text-xs mt-[5px] text-gray-500">/pax</p>
          </div>
        </div>
      </div>
      <div className="flex  px-4 items-end">
        <div className="basis-[80%]">
          <div className="flex gap-2 items-center">
            <div
              onClick={() => {
                if (opt !== "flightdetail") {
                  setOpt("flightdetail");
                } else {
                  setOpt("");
                }
              }}
              className={`${
                opt === "flightdetail"
                  ? " text-primary-color font-semibold border-b-[3px] rounded-none border-primary-color"
                  : "rounded-lg hover:bg-gray-200"
              }  px-4 text-gray-700 text-sm py-2  transition-all cursor-pointer`}
            >
              Flight Details
            </div>
            <div
              onClick={() => {
                if (opt !== "fare&benefit") {
                  setOpt("fare&benefit");
                } else {
                  setOpt("");
                }
              }}
              className={`${
                opt === "fare&benefit"
                  ? " text-primary-color font-semibold border-b-[3px] rounded-none border-primary-color"
                  : "rounded-lg hover:bg-gray-200 "
              }  px-4 text-gray-700 text-sm py-2 transition-all cursor-pointer`}
            >
              Fare & Benefit
            </div>
            <div
              onClick={() => {
                if (opt !== "refund") {
                  setOpt("refund");
                } else {
                  setOpt("");
                }
              }}
              className={`${
                opt === "refund"
                  ? " text-primary-color font-semibold border-b-[3px] rounded-none border-primary-color"
                  : "rounded-lg hover:bg-gray-200 "
              }  px-4 text-gray-700 text-sm py-2 transition-all cursor-pointer`}
            >
              Refund
            </div>
            <div
              onClick={() => {
                if (opt !== "reschedule") {
                  setOpt("reschedule");
                } else {
                  setOpt("");
                }
              }}
              className={`${
                opt === "reschedule"
                  ? " text-primary-color font-semibold border-b-[3px] rounded-none border-primary-color"
                  : "rounded-lg hover:bg-gray-200 "
              }  px-4 text-gray-700 text-sm py-2 transition-all cursor-pointer`}
            >
              Reschedule
            </div>
          </div>
        </div>
        <div className="basis-[20%]">
          {!fromSavedPage && (
            <SheetTrigger onClick={handleSelectFlight}>
              <div className="bg-primary-color py-2 rounded-md  text-white font-semibold px-8 hover:bg-primary-color hover:opacity-80 transition-all text-[15px]">
                Choose
              </div>
            </SheetTrigger>
          )}
        </div>
      </div>
      {opt === "flightdetail" && (
        <div className="pt-6 py-6 bg-[#F7F9FA] px-10 animate-fadeIn flex gap-4">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm">{convertTime2(flight.departureTime)}</p>
              <p className="text-xs text-gray-700">
                {isoStringToMonthDay(flight.departureTime)}
              </p>
            </div>
            <p className="text-xs text-gray-700">
              {calculateTimeDifference(
                flight.departureTime,
                flight.arrivalTime
              )}
            </p>
            <div>
              <p className="text-sm">{convertTime2(flight.arrivalTime)}</p>
              <p className="text-xs text-gray-700">
                {" "}
                {isoStringToMonthDay(flight.arrivalTime)}
              </p>
            </div>
          </div>
          <div className="h-[200px] w-[1px] bg-gray-200 relative">
            <div className="w-[12px] h-[12px] translate-x-[-5.5px] bg-white border-primary-color border-[1px]  rounded-full absolute"></div>
            <div className="w-[12px] h-[12px] translate-x-[-5.5px] bg-primary-color bottom-0  rounded-full absolute"></div>
          </div>
          <div>
            <p className="font-bold">{`${flight.from} (${flight.fromCode})`}</p>
            <p className="text-sm text-gray-700">Terminal 1</p>
            <div className="flex items-center my-2">
              <p className="text-sm">{flight.airline}</p>
              <div className="relative ml-2 w-[30px] h-[30px]">
                <Image
                  alt="logo"
                  quality={100}
                  src={getAirline.get(flight.airline)}
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <p className="text-sm">{`${flight.flightCode} • Promo`}</p>
            <div className="flex mt-3 gap-6">
              <div className="basis-[1/2] text-sm text-[15px] text-gray-500 flex items-start gap-3">
                <div>
                  <FontAwesomeIcon icon={faSuitcase} className="text-lg" />
                </div>
                <div>
                  <p>Baggage 0kg (buy at booking)</p>
                  <p>Cabin baggage 7 kg</p>
                </div>
              </div>
              <div className="flex text-sm text-[15px] text-gray-500 gap-2">
                <div>
                  <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />
                </div>
                <p>{flight.airplane}</p>
              </div>
            </div>
            <p className="font-bold mt-4">{`${flight.to} (${flight.toCode})`}</p>
            <p className="text-sm text-gray-700">{flight.toAirport}</p>
          </div>
        </div>
      )}
      {opt === "fare&benefit" && (
        <div className="animate-fadeIn gap-8 flex pt-6 pb-4 px-10 bg-[#F7F9FA]">
          <div className="basis-[50%]">
            <header className="font-bold mb-2">Conditions</header>
            <div className="px-4 py-3 shadow-md bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <div className="relative w-[30px] h-[30px]">
                  <Image
                    alt="logo"
                    quality={100}
                    src={getAirline.get(flight.airline)}
                    fill
                    sizes="100%"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p>{flight.airline}</p>
              </div>
              <p className="text-xs text-gray-500 my-2">
                {`${flight.from} → ${flight.to} • Promo`}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="mt-[-5px]">
                  <RefundableIcon
                    width="16px"
                    height="16px"
                    fill={
                      flight.flightSeats[0].isRefundable ? "#05A569" : "#000000"
                    }
                  />
                </div>
                <p
                  className={`${
                    flight.flightSeats[0].isRefundable
                      ? "text-[#05A569]"
                      : "text-gray-700"
                  } text-xs font-semibold `}
                >
                  {`${
                    flight.flightSeats[0].isRefundable
                      ? "Refundable"
                      : "Non-Refundable"
                  }`}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="mt-[-2px]">
                  <RescheduleIcon
                    width="16px"
                    height="16px"
                    fill={
                      flight.flightSeats[0].isReschedule ? "#05A569" : "#000000"
                    }
                  />
                </div>
                <p
                  className={`${
                    flight.flightSeats[0].isReschedule
                      ? "text-[#05A569]"
                      : "text-gray-700"
                  } text-xs font-semibold `}
                >
                  {`${
                    flight.flightSeats[0].isReschedule
                      ? "Reschedule Available"
                      : "Reschedule Available"
                  }`}
                </p>
              </div>
            </div>
          </div>
          <div className="basis-[50%]">
            <header className="font-bold mb-2">Price Details</header>
            <div className="px-4 py-3 shadow-md bg-white rounded-lg">
              <div className=" flex justify-between">
                <p className="text-sm text-gray-700 ">{`Adult Basic Fare (x${numberOfPassenger.adult})`}</p>
                <p className="text-sm">{`${formatNumber(price.adult)} VND`}</p>
              </div>
              {numberOfPassenger.child > 0 && (
                <div className="flex mt-2 justify-between">
                  <p className="text-sm text-gray-700 ">{`Child Basic Fare (x${numberOfPassenger.child})`}</p>
                  <p className="text-sm">{`${formatNumber(
                    price.child
                  )} VND`}</p>
                </div>
              )}
              <div className="flex mt-2 justify-between">
                <p className="text-sm text-gray-700 ">Tax</p>
                <p className="text-sm">Included</p>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-2"></div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-700 ">You pay</p>
                <p className="text-sm font-bold">{`${formatNumber(
                  price.child + price.adult
                )} VND`}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {opt === "refund" && (
        <div className="animate-fadeIn  pt-6 pb-4 px-6  bg-[#F7F9FA]">
          <div className="bg-white px-4 py-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="relative w-[30px] h-[30px]">
                    <Image
                      alt="logo"
                      quality={100}
                      src={getAirline.get(flight.airline)}
                      fill
                      sizes="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p>{flight.airline}</p>
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {`${flight.from} → ${flight.to}`}
                </p>
              </div>
              <p className="text-sm text-gray-500">Promo</p>
            </div>
            <div
              className={`${
                flight.flightSeats[0].isRefundable
                  ? "text-[#0BC175]"
                  : "text-gray-800"
              } rounded-lg mt-2 flex items-center gap-2 py-4 px-4 w-full bg-gray-100`}
            >
              <FontAwesomeIcon
                icon={
                  flight.flightSeats[0].isRefundable
                    ? faCheckCircle
                    : faCircleXmark
                }
              />
              <p className="font-bold mt-[2px]">
                {flight.flightSeats[0].isRefundable
                  ? "Refundable"
                  : "Non-Refundable"}
              </p>
            </div>
          </div>
        </div>
      )}
      {opt === "reschedule" && (
        <div className="animate-fadeIn  pt-6 pb-4 px-6  bg-[#F7F9FA]">
          <div className="bg-white px-4 py-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="relative w-[30px] h-[30px]">
                    <Image
                      alt="logo"
                      quality={100}
                      src={getAirline.get(flight.airline)}
                      fill
                      sizes="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p>{flight.airline}</p>
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {`${flight.from} → ${flight.to}`}
                </p>
              </div>
              <p className="text-sm text-gray-500">Promo</p>
            </div>
            <div
              className={`${
                flight.flightSeats[0].isReschedule
                  ? "text-[#0BC175]"
                  : "text-gray-800"
              } rounded-lg mt-2 flex items-center gap-2 py-4 px-4 w-full bg-gray-100`}
            >
              <FontAwesomeIcon
                icon={
                  flight.flightSeats[0].isReschedule
                    ? faCheckCircle
                    : faCircleXmark
                }
              />
              <p className="font-bold mt-[2px]">
                {flight.flightSeats[0].isReschedule
                  ? "Reschedule Available"
                  : "Non-Reschedule Available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
