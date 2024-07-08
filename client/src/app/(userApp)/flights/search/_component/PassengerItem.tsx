"use client";
import ComboBox from "@/components/component/Search/ComboBox";
import { Button } from "@/components/ui/button";
import "react-calendar/dist/Calendar.css";
import { toDayMonthYear } from "@/utils/convertTime";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Calendar from "react-calendar";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IFlightSeat } from "@/interfaces/IFlightSeat";
const datas = [];
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function PassengerItem({
  id,
  setInfoPassenger,
  isChild,
  saved,
  setSaved,
  numberOfAdult,
  iD,
  setShowErrorSavedPass,
  seatSlt,
}: {
  id: number;
  setInfoPassenger: React.Dispatch<React.SetStateAction<any[]>>;
  saved: boolean[];
  setSaved: React.Dispatch<React.SetStateAction<boolean[]>>;
  isChild?: boolean;
  numberOfAdult?: number;
  iD: number;
  setShowErrorSavedPass: React.Dispatch<React.SetStateAction<boolean>>;
  seatSlt: IFlightSeat;
}) {
  const [error, setError] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [value, onChange] = useState<Value>(() => {
    if (isChild) {
      return new Date("January 01, 2013 23:15:30");
    }
    return new Date("January 01, 2000 23:15:30");
  });

  const disableDates = new Date("August 19, 2012 23:15:30");

  const handleSavePassenger = () => {
    if (firstName.trim() === "") {
      setError((prev) => [...prev, "firstName"]);
    }
    if (lastName.trim() === "") {
      setError((prev) => [...prev, "lastName"]);
    }
    if (!birthDay) {
      setError((prev) => [...prev, "birthDay"]);
    }
    if (firstName.trim() === "" || lastName.trim() === "" || !birthDay) {
      return;
    }
    if (isChild && numberOfAdult) {
      setInfoPassenger((prev) => {
        const arr = [...prev];
        arr[numberOfAdult + id - 1] = {
          firstName,
          lastName,
          birthDay: birthDay.toString(),
          isChild: isChild,
          baggage: seatSlt.baggage,
          cabinBaggage: seatSlt.cabinBaggage,
        };
        return arr;
      });
    } else {
      setInfoPassenger((prev) => {
        const arr = [...prev];
        arr[id - 1] = {
          firstName,
          lastName,
          birthDay: birthDay.toString(),
          isChild: false,
          baggage: seatSlt.baggage,
          cabinBaggage: seatSlt.cabinBaggage,
        };
        return arr;
      });
    }
    setSaved((prev) => {
      const newArr = [...prev];
      newArr[iD] = true;
      return newArr;
    });
  };
  return (
    <div
      className={`${
        saved[iD] ? "border-blue-300 bg-blue-50" : ""
      } border-[1px] rounded-md `}
    >
      <div className="px-4 flex items-center justify-between py-2 border-b-[1px]">
        <p className="font-bold text-gray-600">{`${
          isChild ? "Child" : "Adult"
        } ${id}`}</p>
        <p
          onClick={() => {
            handleSavePassenger();
          }}
          className="text-primary-color font-bold text-sm cursor-pointer hover:bgblue-600 transition-all"
        >
          {!saved[iD] ? "Save" : "Saved"}
        </p>
      </div>
      <div className="px-4 py-2">
        <div className="flex items-center">
          <div className="basis-[50%]">
            <p
              className={`${
                error.includes("firstName") ? "text-red-500" : "text-gray-600"
              } text-sm font-bold `}
            >
              First name
            </p>
            <input
              value={firstName}
              onChange={(e) => {
                setSaved((prev) => {
                  const newArr = [...prev];
                  newArr[iD] = false;
                  return newArr;
                });
                setShowErrorSavedPass(false);
                setError([]);
                setFirstName(e.target.value);
              }}
              className={`${
                error.includes("firstName")
                  ? "bg-red-50 border-red-300"
                  : "border-gray-300"
              } outline-none px-4 py-2 w-[70%] mt-1 text-sm font-bold text-gray-700 border-[1px]  rounded-md`}
            ></input>
            {error.includes("firstName") && (
              <p className="text-xs font-bold mt-[2px] text-red-500">
                First name is invalid
              </p>
            )}
          </div>
          <div className="basis-[50%]">
            <p
              className={`${
                error.includes("lastName") ? "text-red-500" : "text-gray-600"
              } text-sm font-bold `}
            >
              Last name
            </p>
            <input
              value={lastName}
              onChange={(e) => {
                setError([]);
                setSaved((prev) => {
                  const newArr = [...prev];
                  newArr[iD] = false;
                  return newArr;
                });
                setShowErrorSavedPass(false);

                setLastName(e.target.value);
              }}
              className={`${
                error.includes("lastName")
                  ? "bg-red-50 border-red-300"
                  : "border-gray-300"
              } outline-none px-4 py-2 w-[70%] mt-1 text-sm font-bold text-gray-700 border-[1px]  rounded-md`}
            ></input>
            {error.includes("lastName") && (
              <p className="text-xs font-bold mt-[2px] text-red-500">
                Last name is invalid
              </p>
            )}
          </div>
        </div>
        <div className="flex mt-2">
          <div className="basis-[50%]">
            <p className="text-sm font-bold text-gray-600">Birthday</p>
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <Button
                    onClick={() => setError([])}
                    variant={"outline"}
                    className={`${
                      error.includes("birthDay")
                        ? "border-red-400 bg-red-50 hover:bg-red-50"
                        : ""
                    } w-[240px] mt-1 pl-3 text-left font-normal`}
                  >
                    {birthDay ? (
                      format(birthDay, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                  {error.includes("birthDay") && (
                    <p className="text-xs font-bold mt-[2px] text-red-500">
                      Birthday is invalid
                    </p>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 " align="start">
                <Calendar
                  tileDisabled={({ date }) => {
                    if (isChild) {
                      const newDate = new Date();
                      return date > newDate;
                    }
                    return date > disableDates;
                  }}
                  onChange={(value: Value) => {
                    setBirthDay(value as Date);
                    setShowErrorSavedPass(false);

                    setSaved((prev) => {
                      const newArr = [...prev];
                      newArr[iD] = false;
                      return newArr;
                    });
                    return onChange(value);
                  }}
                  value={value}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="basis-[50%]">
            <p className="text-sm font-bold text-gray-600">Nationality</p>
            <div className="border-[1px] flex bg-white items-center gap-2 px-3 py-2 rounded-md mt-1 text-sm text-gray-600 font-bold w-[70%] border-gray-300">
              <div className="relative w-[20px] h-[20px]">
                <Image
                  alt="logo"
                  quality={100}
                  src="https://shopcartimg2.blob.core.windows.net/shopcartctn/vietnam.png"
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="w-[0.5px] h-[20px] bg-gray-500"></div>
              <p>Vietnam </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
