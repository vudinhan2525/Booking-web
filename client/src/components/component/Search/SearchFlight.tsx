"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SeatAirPlaneIcons } from "@/lib/icon";
import {
  faCalendarDays,
  faPlaneArrival,
  faPlaneDeparture,
  faRotate,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SearchFlight({
  fromFlightPage,
}: {
  fromFlightPage: boolean;
}) {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  return (
    <div
      className={`${
        fromFlightPage
          ? "bg-white border-[1px] rounded-lg border-primary-color px-8"
          : "mx-12 px-4"
      } flex animate-fadeIn  py-4 gap-20 `}
    >
      <div className="basis-[55%]">
        <div className="flex justify-center gap-4 items-end">
          <div className="basis-[46%]">
            <p
              className={`${
                fromFlightPage ? "text-gray-800" : "text-gray-200"
              }  mb-2 font-semibold`}
            >
              From
            </p>
            <div className="w-full flex items-center relative">
              <input
                className={`${
                  fromFlightPage ? "border-[1px] border-gray-400" : ""
                } pointer-events-none w-full outline-none pr-4 pl-10 py-3 rounded-xl`}
              ></input>
              <div className="top-[50%] translate-y-[-50%] left-[12px] absolute">
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  className=" text-primary-color "
                />
              </div>
            </div>
          </div>
          <div className="cursor-pointer flex justify-center basis-[8%]">
            <FontAwesomeIcon
              icon={faRotate}
              className="text-white px-3 py-3 rounded-full hover:text-primary-color hover:bg-gray-300 transition-all text-xl"
            />
          </div>
          <div className="basis-[46%]">
            <p
              className={`${
                fromFlightPage ? "text-gray-800" : "text-gray-200"
              }  mb-2 font-semibold`}
            >
              To
            </p>
            <div className="w-full flex items-center relative">
              <input
                className={`${
                  fromFlightPage ? "border-[1px] border-gray-400" : ""
                } pointer-events-none w-full outline-none pr-4 pl-10 py-3 rounded-xl`}
              ></input>
              <div className="top-[50%] translate-y-[-50%] left-[12px] absolute">
                <FontAwesomeIcon
                  icon={faPlaneArrival}
                  className=" text-primary-color "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-4 justify-between gap-4 items-end">
          <div className="basis-[46%]">
            <p
              className={`${
                fromFlightPage ? "text-gray-800" : "text-gray-200"
              }  mb-2 font-semibold`}
            >
              Depature Date
            </p>
            <div className="w-full flex items-center relative">
              <input
                className={`${
                  fromFlightPage ? "border-[1px] border-gray-400" : ""
                } pointer-events-none w-full outline-none pr-4 pl-10 py-3 rounded-xl`}
              ></input>
              <div className="top-[50%] left-[12px] translate-y-[-50%] absolute">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className=" text-primary-color"
                />
              </div>
            </div>
          </div>
          <div className="basis-[8%]"></div>
          <div className="basis-[46%]">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="terms"
                onCheckedChange={() => {
                  setIsRoundTrip((prev) => !prev);
                }}
              />
              <label
                htmlFor="terms"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <p
                  className={`${
                    isRoundTrip
                      ? `${fromFlightPage ? "text-gray-800" : "text-gray-200"} `
                      : "text-gray-200"
                  } cursor-pointer  font-semibold`}
                >
                  Return Date
                </p>
              </label>
            </div>
            <div className="w-full flex items-center relative">
              <input
                className={`${!isRoundTrip && "bg-gray-300"} w-full ${
                  fromFlightPage && "border-[1px] border-gray-400"
                } pointer-events-none outline-none pr-4 pl-10 py-3 rounded-xl`}
              ></input>
              <div className="top-[50%] left-[12px] translate-y-[-50%] absolute">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className={`${
                    isRoundTrip ? "text-primary-color" : "text-gray-500"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-[45%]">
        <p
          className={`${
            fromFlightPage ? "text-gray-800" : "text-gray-200"
          }  mb-2 font-semibold`}
        >
          No. of Passengers
        </p>
        <div
          className={`${
            fromFlightPage && "border-[1px] border-gray-400"
          } flex gap-2 px-4 rounded-xl py-3 bg-white`}
        >
          <div>
            <FontAwesomeIcon
              icon={faUserGroup}
              className="text-primary-color"
            />
          </div>
          <p>1 Adult, 0 Child, 0 Infant</p>
        </div>
        <div className="mt-4">
          <p
            className={`${
              fromFlightPage ? "text-gray-800" : "text-gray-200"
            }  mb-2 font-semibold`}
          >
            Seat class
          </p>
          <div
            className={`${
              fromFlightPage && "border-[1px] border-gray-400"
            } inline-flex items-center gap-2 px-4 rounded-xl py-3 bg-white`}
          >
            <div>
              <SeatAirPlaneIcons width="22px" height="22px" />
            </div>
            <p>Economy</p>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 w-full text-[16px] bg-orange-600 font-bold hover:bg-orange-700 transition-all"
        >
          Search flights
        </Button>
      </div>
    </div>
  );
}
