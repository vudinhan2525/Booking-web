"use client";
import { Button } from "@/components/ui/button";
import { RefundableIcon, RescheduleIcon } from "@/lib/icon";
import {
  faCheckCircle,
  faCircleInfo,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

export default function FlightItem() {
  const [opt, setOpt] = useState("");
  return (
    <div className="bg-white  transition-all hover:border-primary-color border-[1px] border-transparent cursor-pointer pb-4 w-full mt-4 shadow-md rounded-xl">
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
                src={
                  "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietjetlogo.jpg"
                }
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p>Vietjet Air</p>
          </div>
          <div className="basis-[25%] flex gap-3 items-center">
            <div>
              <p>21:45</p>
              <p className="text-xs text-gray-700 text-center">SGN</p>
            </div>
            <div className="mt-[-12px] flex flex-col gap-1  items-center">
              <div className="text-center text-xs text-gray-700">1h 20m</div>
              <div className="w-[40px] relative h-[1px] bg-gray-400">
                <div className="absolute w-[8px] h-[8px] rounded-full bg-white border-[1px] border-gray-400 translate-y-[-3.5px]"></div>
                <div className="absolute w-[8px] h-[8px] rounded-full bg-gray-400 right-0 translate-y-[-3.5px]"></div>
              </div>
              <div className="text-center text-xs text-gray-700">Direct</div>
            </div>
            <div>
              <p>23:05</p>
              <p className="text-xs text-gray-700 text-center">DAD</p>
            </div>
          </div>
          <div className="basis-[25%] mr-[10px] flex justify-end gap-[2px]">
            <p className="text-orange-600 font-bold">1.029.715 VND</p>
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
          <Button className="bg-primary-color  text-white font-semibold px-8 hover:bg-primary-color hover:opacity-80 transition-all text-[15px]">
            Choose
          </Button>
        </div>
      </div>
      {opt === "flightdetail" && (
        <div className="pt-6 py-6 bg-[#F7F9FA] px-10 animate-fadeIn flex gap-4">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm">21:45</p>
              <p className="text-xs text-gray-700">Nov 28</p>
            </div>
            <p className="text-xs text-gray-700">1h 20m</p>
            <div>
              <p className="text-sm">23:05</p>
              <p className="text-xs text-gray-700">Nov 28</p>
            </div>
          </div>
          <div className="h-[250px] w-[1px] bg-gray-200 relative">
            <div className="w-[12px] h-[12px] translate-x-[-5.5px] bg-white border-primary-color border-[1px]  rounded-full absolute"></div>
            <div className="w-[12px] h-[12px] translate-x-[-5.5px] bg-primary-color bottom-0  rounded-full absolute"></div>
          </div>
          <div>
            <p className="font-bold">Ho Chi Minh City (SGN)</p>
            <p className="text-sm text-gray-700">Tansonnhat Intl</p>
            <p className="text-sm text-gray-700">Terminal 1</p>
            <div className="flex items-center my-2">
              <p className="text-sm">VietJet Air</p>
              <div className="relative w-[30px] h-[30px]">
                <Image
                  alt="logo"
                  quality={100}
                  src={
                    "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietjetlogo.jpg"
                  }
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <p className="text-sm">VJ-636 • Promo</p>
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
                <p>Airbus A320-100/200</p>
              </div>
            </div>
            <p className="font-bold mt-4">Da Nang (DAD)</p>
            <p className="text-sm text-gray-700">Da Nang Airport</p>
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
                    src={
                      "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietjetlogo.jpg"
                    }
                    fill
                    sizes="100%"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p>Vietjet Air</p>
              </div>
              <p className="text-xs text-gray-500 my-2">
                Ho Chi Minh City → Da Nang • Promo
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="mt-[-5px]">
                  <RefundableIcon width="16px" height="16px" />
                </div>
                <p className="text-xs font-semibold text-[#05A569]">
                  Refundable
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="mt-[-2px]">
                  <RescheduleIcon width="16px" height="16px" />
                </div>
                <p className="text-xs font-semibold text-[#05A569]">
                  Reschedule Available
                </p>
              </div>
            </div>
          </div>
          <div className="basis-[50%]">
            <header className="font-bold mb-2">Price Details</header>
            <div className="px-4 py-3 shadow-md bg-white rounded-lg">
              <div className=" flex justify-between">
                <p className="text-sm text-gray-700 ">Adult Basic Fare (x1)</p>
                <p className="text-sm">1.029.715 VND</p>
              </div>
              <div className="flex mt-2 justify-between">
                <p className="text-sm text-gray-700 ">Child Basic Fare (x2)</p>
                <p className="text-sm">1.977.430 VND</p>
              </div>
              <div className="flex mt-2 justify-between">
                <p className="text-sm text-gray-700 ">Tax</p>
                <p className="text-sm">Included</p>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-2"></div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-700 ">You pay</p>
                <p className="text-sm font-bold">3.007.145 VND</p>
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
                      src={
                        "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietjetlogo.jpg"
                      }
                      fill
                      sizes="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p>Vietjet Air</p>
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  Ho Chi Minh City → Da Nang
                </p>
              </div>
              <p className="text-sm text-gray-500">Promo</p>
            </div>
            <div className="text-[#0BC175] rounded-lg mt-2 flex items-center gap-2 py-4 px-4 w-full bg-gray-100">
              <FontAwesomeIcon icon={faCheckCircle} />
              <p className="font-bold">Refundable</p>
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
                      src={
                        "https://shopcartimg2.blob.core.windows.net/shopcartctn/vietjetlogo.jpg"
                      }
                      fill
                      sizes="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p>Vietjet Air</p>
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  Ho Chi Minh City → Da Nang
                </p>
              </div>
              <p className="text-sm text-gray-500">Promo</p>
            </div>
            <div className="text-[#0BC175] rounded-lg mt-2 flex items-center gap-2 py-4 px-4 w-full bg-gray-100">
              <FontAwesomeIcon icon={faCheckCircle} />
              <p className="font-bold">Reschedule Available</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
