"use client";

import { usePathname, useSearchParams } from "next/navigation";
import SortBarFlight from "@/components/component/SortBar/SortBarFlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  convertTime3,
  getAllDatesOfMonth,
  toDayMonthYear,
} from "@/utils/convertTime";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FlightItem from "./_component/flightItem";
import { useEffect, useState } from "react";
import flightApiRequest from "@/apiRequest/flight";
import { IFlight } from "@/interfaces/IFlight";
import { getAirport } from "@/lib/dataAir";
import { useRouter } from "next/navigation";
import { IfilterObj } from "@/interfaces/IfliterObj";
import SearchFlight from "@/components/component/Search/SearchFlight";
const initialObj: IfilterObj = {
  airline: [],
  depatureTime: 0,
  arrivalTime: 0,
  priceFrom: 0,
  priceTo: 10000000,
};
export default function MainSearchFlightPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filterObj, setFilterObj] = useState(initialObj);
  const [flightData, setFlightData] = useState<IFlight[]>();
  const [showSearchFlightForm, setShowSearchFlightForm] = useState(false);

  useEffect(() => {
    if (searchParams) {
      getFlightList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const getFlightList = async () => {
    let obj: any = {};
    const numberPassenger = searchParams.get("numberPassenger")?.split("-");
    if (searchParams.get("from")) {
      obj.from = searchParams.get("from");
    }
    if (searchParams.get("to")) {
      obj.to = searchParams.get("to");
    }
    if (searchParams.get("departureTime")) {
      obj.departureTime = searchParams.get("departureTime") + "T00:00:00.000Z";
    }
    if (searchParams.get("arrivalTime")) {
      obj.arrivalTime = searchParams.get("arrivalTime") + "T00:00:00.000Z";
    }
    if (searchParams.get("seatType")) {
      obj.seatType = searchParams.get("seatType");
    }
    if (numberPassenger) {
      obj.numberAdult = Number(numberPassenger[0]);
      obj.numberChild = Number(numberPassenger[1]);
      obj.numberInfant = Number(numberPassenger[2]);
    }
    if (filterObj.airline.length > 0) {
      obj.airline = filterObj.airline;
    }
    if (filterObj.depatureTime !== 0) {
      obj.departureHour = filterObj.depatureTime;
    }
    if (filterObj.arrivalTime !== 0) {
      obj.arrivalHour = filterObj.arrivalTime;
    }
    if (filterObj.priceFrom !== undefined) {
      obj.priceFrom = filterObj.priceFrom;
    }
    if (filterObj.priceTo) {
      obj.priceTo = filterObj.priceTo;
    }
    if (filterObj)
      try {
        const response = await flightApiRequest.getFlights(obj);
        if (response.status === "success") {
          setFlightData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
  };
  const calcNoPassenger = () => {
    const numberPassenger = searchParams.get("numberPassenger")?.split("-");
    if (numberPassenger) {
      return (
        Number(numberPassenger[0]) +
        Number(numberPassenger[1]) +
        Number(numberPassenger[2])
      );
    }
    return "0";
  };
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (api) {
      const newArr = getAllDatesOfMonth(
        searchParams.get("departureTime") + "T00:00:00.000Z"
      );
      let i = 2;
      newArr.forEach((el, idx) => {
        if (el === searchParams.get("departureTime")) {
          i = idx;
        }
      });
      api.scrollTo(i - 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);
  const handleChangeDate = (s: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("departureTime", s);

    const newUrl = `${pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };
  useEffect(() => {
    if (filterObj !== initialObj) {
      getFlightList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);
  return (
    <div className=" bg-[#F7F9FA] border-t-[1px] flex gap-8 px-28 py-10">
      <div className="basis-[32%] ">
        <SortBarFlight filterObj={filterObj} setFilterObj={setFilterObj} />
      </div>
      {showSearchFlightForm && (
        <div
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest(".modal")) {
              setShowSearchFlightForm(false);
            }
            if ((e.target as HTMLElement).closest(".btnsearch")) {
              setShowSearchFlightForm(false);
            }
          }}
          className="fixed flex items-center justify-center bg-black/30 top-0 right-0 left-0 bottom-0 z-[10]"
        >
          <div className="basis-[70%] modal mb-[200px]">
            <SearchFlight
              fromFlightPage={true}
              iniNumberOfPassenger={searchParams.get("numberPassenger")}
              iniSeattype={searchParams.get("seatType")}
              iniFromCode={searchParams.get("from")}
              iniToCode={searchParams.get("to")}
              iniDepartureTime={
                searchParams.get("departureTime") + "T00:00:00.000Z"
              }
              iniArrivalTime={
                searchParams.get("arrivalTime") !== null
                  ? searchParams.get("arrivalTime") + "T00:00:00.000Z"
                  : searchParams.get("departureTime") + "T00:00:00.000Z"
              }
            />
          </div>
        </div>
      )}
      <div className="basis-[68%]">
        <div className="w-full  bg-flight-ct rounded-xl px-4 py-4">
          <div className="bg-white rounded-lg flex justify-between items-center w-[70%]   ">
            <div className="px-4 py-3">
              <p className="font-bold">{`${
                getAirport.get(searchParams.get("from"))?.name || "From"
              } (${searchParams.get("from") || ""}) → ${
                getAirport.get(searchParams.get("to"))?.name || "To"
              } (${searchParams.get("to") || ""})`}</p>
              <p className="text-sm text-gray-700">
                {`${toDayMonthYear(
                  searchParams.get("departureTime") + "T00:00:00.000Z"
                )} | ${calcNoPassenger()} passenger(s) | ${searchParams.get(
                  "seatType"
                )}`}
              </p>
            </div>
            <div
              onClick={() => {
                setShowSearchFlightForm(true);
              }}
              className="cursor-pointer flex hover:bg-blue-100 gap-2 bg-blue-50 transition-all py-2 mr-[15px] rounded-lg px-6 items-center"
            >
              <p className="text-[14px] font-bold text-primary-color">
                Change search
              </p>
              <div>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-primary-color text-[17px] "
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center  mt-4">
            <div className="bg-[#0264C8] px-4 py-2 rounded-xl">
              <Carousel setApi={setApi} className="max-w-[650px] ">
                <CarouselContent>
                  {getAllDatesOfMonth(
                    searchParams.get("departureTime") + "T00:00:00.000Z"
                  ).map((el, index) => (
                    <CarouselItem
                      key={index}
                      onClick={() => handleChangeDate(el)}
                      className="md:basis-1/2 pl-2 lg:basis-1/5"
                    >
                      <div
                        className={`${
                          el === searchParams.get("departureTime") &&
                          "bg-white/30"
                        } text-sm py-2  hover:bg-white/15 cursor-pointer transition-all text-center text-white font-semibold rounded-lg`}
                      >
                        {convertTime3(el)}
                        <div className="text-xs text-white text-center">
                          {`> 1.000.000 VND`}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
        {flightData &&
          flightData.map((el, idx) => {
            return <FlightItem flight={el} key={idx} />;
          })}
      </div>
    </div>
  );
}
