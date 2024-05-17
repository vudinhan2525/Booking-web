"use client";
import { Button } from "@/components/ui/button";
import {
  faCalendarDays,
  faLocationDot,
  faMagnifyingGlass,
  faMoon,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Combobox } from "./ComboBox";
import { useEffect, useState } from "react";
import { destinations } from "@/lib/dataHotel";
import { getFutureDate, toDayMonthYear } from "@/utils/convertTime";

export default function SearchHotels({
  fromHotelsPage,
  fromSearchHotelsPage,
  iniDestination,
  iniDeparture,
  iniDuration,
  iniNumberPassenger,
}: {
  fromHotelsPage?: boolean;
  fromSearchHotelsPage?: boolean;
  iniDestination?: {
    name: string;
    title: string;
  };
  iniDeparture?: string;
  iniDuration?: number;
  iniNumberPassenger?: {
    adult: number;
    child: number;
    bedroom: number;
  };
}) {
  const [destination, setDestination] = useState(() => {
    if (iniDestination && iniDestination.name !== "") {
      return iniDestination;
    }
    return {
      name: "",
      title: "",
    };
  });
  const [departureTime, setDepatureTime] = useState(() => {
    if (iniDeparture && iniDeparture !== "") {
      return iniDeparture;
    }
    return "";
  });
  const [duration, setDuration] = useState(() => {
    return iniDuration ? iniDuration : 1;
  });
  const [arrivalTime, setArrivalTime] = useState({
    label: "",
    value: "",
  });
  const [numberPassenger, setNumberPassenger] = useState(() => {
    if (iniNumberPassenger) {
      return iniNumberPassenger;
    }
    return {
      adult: 1,
      child: 0,
      bedroom: 1,
    };
  });
  useEffect(() => {
    if (departureTime !== "") {
      setArrivalTime(getFutureDate(departureTime, duration));
    }
  }, [departureTime, duration]);

  return (
    <div
      className={`${
        fromHotelsPage
          ? "bg-white border-[1px] rounded-lg border-primary-color"
          : ""
      } animate-fadeIn   ${fromSearchHotelsPage ? "py-0 px-0" : "py-4 px-16"}`}
    >
      {fromSearchHotelsPage && (
        <div className="flex px-16 py-2 gap-3">
          <div className="basis-[35%]">
            <Combobox
              isDestination={true}
              value={destination}
              frameworks={destinations}
              setValue={setDestination}
              child={
                <div className="flex  items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                  <div>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-white"
                    />
                  </div>
                  <p className="text-white font-semibold mt-[2px]">
                    {destination.name
                      ? destination.name + ", Việt Nam"
                      : "Select city, destination,..."}
                  </p>
                </div>
              }
            />
          </div>
          <div className="basis-[15%]">
            <Combobox
              isCalendar={true}
              value={departureTime}
              setValue={setDepatureTime}
              child={
                <div className="flex items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                  <div>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-white"
                    />
                  </div>
                  <p className="text-white font-semibold mt-[2px]">
                    {departureTime !== ""
                      ? toDayMonthYear(departureTime)
                      : "Select date"}
                  </p>
                </div>
              }
            />
          </div>
          <div className="basis-[15%]">
            <Combobox
              value={duration}
              setValue={setDuration}
              isDurationList={true}
              child={
                <div className="flex items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                  <div>
                    <FontAwesomeIcon icon={faMoon} className="text-white" />
                  </div>
                  <p className="text-white font-semibold mt-[2px]">
                    {duration === 1
                      ? `${duration} Night`
                      : `${duration} Nights`}
                  </p>
                </div>
              }
            />
          </div>
          <div className="basis-[25%]">
            <Combobox
              isSetNumberPassenger={true}
              value={numberPassenger}
              setValue={setNumberPassenger}
              child={
                <div className="flex items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                  <div>
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      className="text-white"
                    />
                  </div>
                  <p className="text-white font-semibold mt-[2px]">
                    <span>{`${numberPassenger.adult} Adult(s), ${numberPassenger.child} Child, ${numberPassenger.bedroom} Room`}</span>
                  </p>
                </div>
              }
            />
          </div>
          <div className="flex basis-[10%] hover:opacity-80 transition-all cursor-pointer items-center gap-2 bg-white px-4 py-2 rounded-lg">
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-primary-color"
              />
            </div>
            <p className="text-primary-color font-semibold mt-[2px]">Search</p>
          </div>
        </div>
      )}
      {!fromSearchHotelsPage && (
        <div>
          <p
            className={`${
              fromHotelsPage ? "text-gray-800" : "text-gray-200"
            } mb-2 font-semibold`}
          >
            City, destination, or hotel name
          </p>
          <Combobox
            isDestination={true}
            value={destination}
            frameworks={destinations}
            setValue={setDestination}
            child={
              <div
                className={`${
                  fromHotelsPage ? "border-[1px] border-gray-400" : ""
                } flex gap-2 px-4 rounded-xl cursor-pointer py-3 bg-white`}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-primary-color"
                  />
                </div>
                <p>
                  {destination.name
                    ? destination.name + ", Việt Nam"
                    : "Select city, destination,..."}
                </p>
              </div>
            }
          />
          <div className="flex mt-2 gap-4">
            <div className="basis-[33%]">
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold`}
              >
                Check-in
              </p>
              <Combobox
                isCalendar={true}
                value={departureTime}
                setValue={setDepatureTime}
                child={
                  <div className="w-full flex cursor-pointer items-center relative">
                    <div
                      className={`${
                        fromHotelsPage ? "border-[1px] border-gray-400" : ""
                      } select-none bg-white outline-none pr-8 pl-10 py-3 rounded-xl`}
                    >
                      {departureTime !== ""
                        ? toDayMonthYear(departureTime)
                        : "Select date"}
                    </div>
                    <div className="top-[52%] left-[12px] translate-y-[-50%] absolute">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className=" text-primary-color text-xl"
                      />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="basis-[33%]">
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold`}
              >
                Duration
              </p>
              <Combobox
                value={duration}
                setValue={setDuration}
                isDurationList={true}
                child={
                  <div
                    className={` w-fit cursor-pointer flex  items-center relative`}
                  >
                    <div
                      className={`${
                        fromHotelsPage ? "border-[1px] border-gray-400" : ""
                      } pointer-events-none w-[165px] bg-white outline-none pr-8 pl-10 py-3 rounded-xl`}
                    >
                      {duration === 1
                        ? `${duration} Night`
                        : `${duration} Nights`}
                    </div>
                    <div className="top-[55%] left-[12px] translate-y-[-50%] absolute">
                      <FontAwesomeIcon
                        icon={faMoon}
                        className=" text-primary-color text-xl"
                      />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="basis-[33%]">
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold`}
              >
                Check-out
              </p>
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold `}
              >
                {arrivalTime.label}
              </p>
            </div>
          </div>
          <p
            className={`${
              fromHotelsPage ? "text-gray-800" : "text-gray-200"
            } mb-2 font-semibold mt-2`}
          >
            Guests and Rooms
          </p>
          <div className="flex gap-4 items-center">
            <div className="basis-[66%]">
              <Combobox
                isSetNumberPassenger={true}
                value={numberPassenger}
                setValue={setNumberPassenger}
                child={
                  <div
                    className={`${
                      fromHotelsPage ? "border-[1px] border-gray-400" : ""
                    } flex basis-[66%] gap-2 px-4 rounded-xl py-3 bg-white`}
                  >
                    <div>
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        className="text-primary-color"
                      />
                    </div>
                    <p>{`${numberPassenger.adult} Adult(s), ${numberPassenger.child} Child, ${numberPassenger.bedroom} Room`}</p>
                  </div>
                }
              />
            </div>
            <div className="basis-[33%] ">
              <Button
                type="submit"
                className="py-6 select-none w-full text-[16px] bg-orange-600 font-bold hover:bg-orange-700 transition-all"
              >
                Search hotels
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
