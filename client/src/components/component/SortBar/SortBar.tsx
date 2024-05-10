"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { airlines } from "@/lib/dataAir";
import Slider from "react-slider";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import { formatNumber } from "@/utils/convertTime";
export default function SortBar() {
  const [showList, setShowList] = useState<string[]>([
    "airline",
    "time",
    "price",
  ]);
  const [values, setValues] = useState([0, 1000000]);
  return (
    <div className="bg-white px-6 rounded-xl border-[1px] py-4">
      <header className="text-2xl font-bold">Filter:</header>
      <div className="bg-gray-200 my-4 w-full h-[1px]"></div>
      <div>
        <div
          onClick={() => {
            if (showList.includes("airline")) {
              const newArr = showList.filter((el) => el !== "airline");
              setShowList(newArr);
              return;
            }
            setShowList((prev) => {
              return [...prev, "airline"];
            });
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-lg font-semibold">Airlines</p>
          {showList.includes("airline") ? (
            <div>
              <FontAwesomeIcon icon={faChevronUp} className="animate-fadeIn" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="animate-fadeIn"
              />
            </div>
          )}
        </div>
        {showList.includes("airline") && (
          <div className="animate-fadeIn flex flex-col gap-3 mt-2">
            {airlines.map((el, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox id={`terms-${idx}`} onCheckedChange={() => {}} />
                  <label
                    htmlFor={`terms-${idx}`}
                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex cursor-pointer gap-2 items-center">
                      <div className="relative w-[30px] h-[30px]">
                        <Image
                          alt="logo"
                          quality={100}
                          src={el.link}
                          fill
                          sizes="100%"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <p>{el.label}</p>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-gray-200 my-4 w-full h-[1px]"></div>
      <div>
        <div
          onClick={() => {
            if (showList.includes("time")) {
              const newArr = showList.filter((el) => el !== "time");
              setShowList(newArr);
              return;
            }
            setShowList((prev) => {
              return [...prev, "time"];
            });
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-lg font-semibold">Time</p>
          {showList.includes("time") ? (
            <div>
              <FontAwesomeIcon icon={faChevronUp} className="animate-fadeIn" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="animate-fadeIn"
              />
            </div>
          )}
        </div>
        {showList.includes("time") && (
          <div className="animate-fadeIn">
            <header className="text-gray-700 mt-4">Depature Time</header>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-3">
              <div className="border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center cursor-pointer">
                <p className="text-xs text-gray-500">Night to Morning</p>
                <p className="text-sm text-primary-color font-semibold">
                  00:00 - 06:00
                </p>
              </div>
              <div className="border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center cursor-pointer">
                <p className="text-xs text-gray-500">Morning to Noon</p>
                <p className="text-sm text-primary-color font-semibold">
                  06:00 - 12:00
                </p>
              </div>
              <div className="border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center cursor-pointer">
                <p className="text-xs text-gray-500">Noon to Evening</p>
                <p className="text-sm text-primary-color font-semibold">
                  12:00 - 18:00
                </p>
              </div>
              <div className="border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center cursor-pointer">
                <p className="text-xs text-gray-500">Evening to Night</p>
                <p className="text-sm text-primary-color font-semibold">
                  18:00 - 24:00
                </p>
              </div>
            </div>
            <header className="text-gray-700 mt-4">Arrival Time</header>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-3">
              <div className="select-none opacity-30 border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center ">
                <p className="text-xs text-gray-500">Night to Morning</p>
                <p className="text-sm text-primary-color font-semibold">
                  00:00 - 06:00
                </p>
              </div>
              <div className="border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center cursor-pointer">
                <p className="text-xs text-gray-500">Morning to Noon</p>
                <p className="text-sm text-primary-color font-semibold">
                  06:00 - 12:00
                </p>
              </div>
              <div className="border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center cursor-pointer">
                <p className="text-xs text-gray-500">Noon to Evening</p>
                <p className="text-sm text-primary-color font-semibold">
                  12:00 - 18:00
                </p>
              </div>
              <div className="border-[1px] border-gray-400 px-4 py-2  rounded-lg text-center cursor-pointer">
                <p className="text-xs text-gray-500">Evening to Night</p>
                <p className="text-sm text-primary-color font-semibold">
                  18:00 - 24:00
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-200 my-4 w-full h-[1px]"></div>
      <div>
        <div
          onClick={() => {
            if (showList.includes("price")) {
              const newArr = showList.filter((el) => el !== "price");
              setShowList(newArr);
              return;
            }
            setShowList((prev) => {
              return [...prev, "price"];
            });
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-lg font-semibold">Price</p>
          {showList.includes("price") ? (
            <div>
              <FontAwesomeIcon icon={faChevronUp} className="animate-fadeIn" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="animate-fadeIn"
              />
            </div>
          )}
        </div>
        {showList.includes("price") && (
          <div className="animate-fadeIn">
            <div className="text-end text-xs mt-2 text-gray-400">
              1.000.000VND - 3.000.000 VND
            </div>
            <Slider
              className="slider w-[90%] mx-auto h-[3px] rounded-lg bg-gray-200 mt-5"
              value={values}
              onChange={setValues}
              min={0}
              max={3000000}
            />
            <div className="mt-4 flex justify-between">
              <p className="text-sm text-gray-700">
                {formatNumber(values[0]) + " VND"}
              </p>
              <p className="text-sm text-gray-700">
                {formatNumber(values[1]) + " VND"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
