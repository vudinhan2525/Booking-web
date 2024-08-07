"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { SeatAirPlaneIcons } from "@/lib/icon";
import {
  faCalendarDays,
  faPlaneArrival,
  faPlaneDeparture,
  faRotate,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { airports, getAirport } from "@/lib/dataAir";
import { convertTime, toDayMonthYear } from "@/utils/convertTime";
import objectToQueryString from "@/utils/convertToQueryString";
import ComboBox from "./ComboBox";
const initialFrom = {
  name: "",
  nameAirport: "",
  code: "",
};
export default function SearchFlight({
  fromFlightPage,
  iniNumberOfPassenger,
  iniSeattype,
  iniFromCode,
  iniToCode,
  iniDepartureTime,
  iniArrivalTime,
}: {
  fromFlightPage: boolean;
  iniNumberOfPassenger?: string | null;
  iniSeattype?: string | null;
  iniFromCode?: string | null;
  iniToCode?: string | null;
  iniDepartureTime?: string | null;
  iniArrivalTime?: string | null;
}) {
  const [airportFrom, setAirportFrom] = useState(() => {
    if (iniFromCode !== null && iniFromCode !== undefined) {
      if (getAirport.has(iniFromCode)) {
        return getAirport.get(iniFromCode);
      } else return initialFrom;
    }
    return initialFrom;
  });
  const [airportTo, setAirportTo] = useState(() => {
    if (iniToCode !== null && iniToCode !== undefined) {
      if (getAirport.has(iniToCode)) {
        return getAirport.get(iniToCode);
      } else return initialFrom;
    }
    return initialFrom;
  });
  const [departureTime, setDepatureTime] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [arrivalTime, setArrivalTime] = useState("");
  const router = useRouter();
  const [seatType, setSeatType] = useState(() => {
    if (iniSeattype !== undefined && iniSeattype !== null) {
      if (
        iniSeattype !== "Economy" &&
        iniSeattype !== "Business" &&
        iniSeattype !== "First Class"
      ) {
        return { name: "Economy" };
      }
      return { name: iniSeattype };
    }
    return { name: "Economy" };
  });
  const [numberPassenger, setNumberPassenger] = useState(() => {
    const string = iniNumberOfPassenger;
    if (string !== null && string !== undefined) {
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
  const handleNavigate = () => {
    const obj: any = {};
    if (airportFrom.code) {
      obj.from = airportFrom.code;
    }
    if (airportTo.code) {
      obj.to = airportTo.code;
    }
    if (departureTime) {
      obj.departureTime = convertTime(departureTime);
    }
    if (arrivalTime && isRoundTrip) {
      obj.arrivalTime = convertTime(arrivalTime);
    }
    if (numberPassenger) {
      const res =
        numberPassenger.adult +
        "-" +
        numberPassenger.child +
        "-" +
        numberPassenger.infant;
      obj.numberPassenger = res;
    }
    if (seatType.name) {
      obj.seatType = seatType.name;
    }
    router.push("/flights/search?" + objectToQueryString(obj));
  };
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
            <ComboBox
              isAirportList={true}
              frameworks={airports}
              setValue={setAirportFrom}
              value={airportFrom}
              child={
                <div className="w-full flex items-center relative cursor-pointer">
                  <div
                    className={`${
                      fromFlightPage ? "border-[1px] border-gray-400" : ""
                    } pointer-events-none w-full bg-white outline-none pr-4 pl-10 py-3 rounded-xl`}
                  >
                    {airportFrom.name ? airportFrom.name : "Select airport"}
                  </div>
                  <div className="top-[50%] translate-y-[-50%] left-[12px] absolute">
                    <FontAwesomeIcon
                      icon={faPlaneDeparture}
                      className=" text-primary-color "
                    />
                  </div>
                </div>
              }
            />
          </div>
          <div
            onClick={() => {
              const q = airportFrom;
              const r = airportTo;
              setAirportFrom(r);
              setAirportTo(q);
            }}
            className="cursor-pointer flex justify-center basis-[8%]"
          >
            <FontAwesomeIcon
              icon={faRotate}
              className={`${
                fromFlightPage ? "text-gray-700" : "text-white"
              } px-3 py-3 rounded-full hover:text-primary-color hover:bg-gray-300 transition-all text-xl`}
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
            <ComboBox
              isAirportList={true}
              frameworks={airports}
              setValue={setAirportTo}
              value={airportTo}
              child={
                <div className="w-full flex items-center relative cursor-pointer">
                  <div
                    className={`${
                      fromFlightPage ? "border-[1px] border-gray-400" : ""
                    } pointer-events-none w-full bg-white outline-none pr-4 pl-10 py-3 rounded-xl`}
                  >
                    {airportTo.name ? airportTo.name : "Select airport"}
                  </div>
                  <div className="top-[50%] translate-y-[-50%] left-[12px] absolute">
                    <FontAwesomeIcon
                      icon={faPlaneArrival}
                      className=" text-primary-color "
                    />
                  </div>
                </div>
              }
            />
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
            <ComboBox
              isCalendar={true}
              value={departureTime}
              setValue={setDepatureTime}
              departureDate={iniDepartureTime}
              child={
                <div className="w-full cursor-pointer flex items-center relative">
                  <div
                    className={`${
                      fromFlightPage ? "border-[1px] border-gray-400" : ""
                    } pointer-events-none bg-white w-full outline-none pr-4 pl-10 py-3 rounded-xl`}
                  >
                    {departureTime !== ""
                      ? toDayMonthYear(departureTime)
                      : "Select date"}
                  </div>
                  <div className="top-[50%] left-[12px] translate-y-[-50%] absolute">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className=" text-primary-color"
                    />
                  </div>
                </div>
              }
            />
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
            <ComboBox
              isCalendar={true}
              value={arrivalTime}
              setValue={setArrivalTime}
              departureDate={iniArrivalTime}
              child={
                <div className="w-full cursor-pointer flex items-center relative">
                  <div
                    className={`${!isRoundTrip && "bg-gray-300"} w-full ${
                      fromFlightPage && "border-[1px] border-gray-400"
                    } pointer-events-none outline-none pr-4 pl-10 py-3 rounded-xl`}
                  >
                    {arrivalTime !== ""
                      ? toDayMonthYear(arrivalTime)
                      : "Select date"}
                  </div>
                  <div className="top-[50%] left-[12px] translate-y-[-50%] absolute">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className={`${
                        isRoundTrip ? "text-primary-color" : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              }
            />
          </div>
        </div>
        <p
          className={`${
            fromFlightPage ? "text-gray-700" : "text-white"
          }  mt-2 italic text-sm `}
        >
          * Search với ngày 10/12/2024 ^^ vì sự thiếu hụt data.
        </p>
      </div>
      <div className="basis-[45%]">
        <p
          className={`${
            fromFlightPage ? "text-gray-800" : "text-gray-200"
          }  mb-2 font-semibold`}
        >
          No. of Passengers
        </p>
        <ComboBox
          isSetNumberPassenger={true}
          setValue={setNumberPassenger}
          value={numberPassenger}
          child={
            <div
              className={`${
                fromFlightPage && "border-[1px] border-gray-400"
              } flex cursor-pointer gap-2 px-4 rounded-xl py-3 bg-white`}
            >
              <div>
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="text-primary-color"
                />
              </div>
              <p>{`${numberPassenger.adult} Adult, ${numberPassenger.child} Child, ${numberPassenger.infant} Infant`}</p>
            </div>
          }
        />

        <div className="mt-4">
          <p
            className={`${
              fromFlightPage ? "text-gray-800" : "text-gray-200"
            }  mb-2 font-semibold`}
          >
            Seat class
          </p>

          <ComboBox
            isSeatList={true}
            frameworks={[
              { name: "Economy" },
              { name: "Business" },
              { name: "First Class" },
            ]}
            setValue={setSeatType}
            value={seatType}
            child={
              <div
                className={`${
                  fromFlightPage && "border-[1px] border-gray-400"
                } min-w-[150px] cursor-pointer inline-flex items-center gap-2 px-4 rounded-xl py-3 bg-white`}
              >
                <div>
                  <SeatAirPlaneIcons width="22px" height="22px" />
                </div>
                <p>{seatType.name}</p>
              </div>
            }
          />
        </div>
        <Button
          type="submit"
          onClick={() => handleNavigate()}
          className="mt-4 btnsearch w-full text-[16px] bg-orange-600 font-bold hover:bg-orange-700 transition-all"
        >
          Search flights
        </Button>
      </div>
    </div>
  );
}
