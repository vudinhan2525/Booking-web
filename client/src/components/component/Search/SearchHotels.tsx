"use client";
import { Button } from "@/components/ui/button";
import {
  faCalendarDays,
  faLocationDot,
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
}: {
  fromHotelsPage: boolean;
}) {
  const [destination, setDestination] = useState({ name: "", title: "" });
  const [departureTime, setDepatureTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [arrivalTime, setArrivalTime] = useState({
    label: "",
    value: "",
  });
  const [numberPassenger, setNumberPassenger] = useState({
    adult: 1,
    child: 0,
    bedroom: 1,
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
      } animate-fadeIn  py-4 px-16 `}
    >
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
                  } pointer-events-none bg-white outline-none pr-8 pl-10 py-3 rounded-xl`}
                >
                  {duration === 1 ? `${duration} Night` : `${duration} Nights`}
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
  );
}
