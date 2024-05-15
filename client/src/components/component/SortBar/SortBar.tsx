"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { airlines } from "@/lib/dataAir";
import Slider from "react-slider";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { formatNumber } from "@/utils/convertTime";
import { IfilterObj } from "@/interfaces/IfliterObj";
const timeArr = [
  {
    label: "Night to Morning",
    time: "00:00 - 06:00",
  },
  {
    label: "Morning to Noon",
    time: "06:00 - 12:00",
  },
  {
    label: "Noon to Evening",
    time: "12:00 - 18:00",
  },
  {
    label: "Night to Morning",
    time: "18:00 - 24:00",
  },
];
export default function SortBar({
  filterObj,
  setFilterObj,
}: {
  filterObj: IfilterObj;
  setFilterObj: Dispatch<SetStateAction<IfilterObj>>;
}) {
  const [showList, setShowList] = useState<string[]>([
    "airline",
    "time",
    "price",
  ]);
  const [values, setValues] = useState([0, 3000000]);
  const handleChangeAirline = (idx: number) => {
    if (filterObj.airline.includes(airlines[idx].label)) {
      setFilterObj((prev) => {
        return {
          ...prev,
          airline: prev.airline.filter((el) => el !== airlines[idx].label),
        };
      });
    } else {
      const newArr = filterObj.airline;
      newArr.push(airlines[idx].label);
      setFilterObj((prev) => {
        return {
          ...prev,
          airline: newArr,
        };
      });
    }
  };
  const [depatureTime, setDepatureTime] = useState(0);
  const handleChangeDepatureTime = (idx: number) => {
    if (depatureTime === idx + 1) {
      setDepatureTime(0);
      setFilterObj((prev) => {
        return { ...prev, depatureTime: 0 };
      });
    } else {
      setDepatureTime(idx + 1);
      setFilterObj((prev) => {
        return { ...prev, depatureTime: idx + 1 };
      });
    }
  };
  const [arrivalTime, setArrivalTime] = useState(0);
  const handleChangeArrivalTime = (idx: number) => {
    if (arrivalTime === idx + 1) {
      setArrivalTime(0);
      setFilterObj((prev) => {
        return { ...prev, arrivalTime: 0 };
      });
    } else {
      setArrivalTime(idx + 1);
      setFilterObj((prev) => {
        return { ...prev, arrivalTime: idx + 1 };
      });
    }
  };
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
                  <Checkbox
                    id={`terms-${idx}`}
                    onCheckedChange={() => {
                      handleChangeAirline(idx);
                    }}
                  />
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
              {timeArr.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => handleChangeDepatureTime(idx)}
                    className={`${
                      depatureTime === idx + 1
                        ? " border-transparent bg-primary-color"
                        : " border-gray-400 "
                    } border-[1px] px-4 py-2 transition-all rounded-lg text-center cursor-pointer`}
                  >
                    <p
                      className={`${
                        depatureTime === idx + 1
                          ? "  text-white"
                          : " text-gray-500 "
                      } text-xs text-gray-500`}
                    >
                      {el.label}
                    </p>
                    <p
                      className={`${
                        depatureTime === idx + 1
                          ? "  text-white"
                          : " text-primary-color"
                      } text-sm  font-semibold`}
                    >
                      {el.time}
                    </p>
                  </div>
                );
              })}
            </div>
            <header className="text-gray-700 mt-4">Arrival Time</header>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-3">
              {timeArr.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => handleChangeArrivalTime(idx)}
                    className={`${
                      arrivalTime === idx + 1
                        ? " border-transparent bg-primary-color"
                        : " border-gray-400 "
                    } border-[1px] px-4 py-2 transition-all rounded-lg text-center cursor-pointer`}
                  >
                    <p
                      className={`${
                        arrivalTime === idx + 1
                          ? "  text-white"
                          : " text-gray-500 "
                      } text-xs text-gray-500`}
                    >
                      {el.label}
                    </p>
                    <p
                      className={`${
                        arrivalTime === idx + 1
                          ? "  text-white"
                          : " text-primary-color"
                      } text-sm  font-semibold`}
                    >
                      {el.time}
                    </p>
                  </div>
                );
              })}
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
            <div
              className="flex justify-center mt-2"
              onClick={() => {
                setFilterObj((prev) => {
                  return { ...prev, priceFrom: values[0], priceTo: values[1] };
                });
              }}
            >
              <p className="border-primary-color cursor-pointer hover:bg-primary-color hover:text-white  transition-all text-primary-color border-[1px] w-fit px-6 py-2 rounded-lg">
                Filter by price
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
