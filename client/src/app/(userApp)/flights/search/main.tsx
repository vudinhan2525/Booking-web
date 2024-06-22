"use client";

import { usePathname, useSearchParams } from "next/navigation";
import SortBarFlight from "@/components/component/SortBar/SortBarFlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  convertTime3,
  getAllDatesOfMonth,
  getCurISOString,
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
import { useEffect, useRef, useState } from "react";
import flightApiRequest from "@/apiRequest/flight";
import { IFlight } from "@/interfaces/IFlight";
import { getAirport } from "@/lib/dataAir";
import { useRouter } from "next/navigation";
import { IfilterObj } from "@/interfaces/IfliterObj";
import SearchFlight from "@/components/component/Search/SearchFlight";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import SheetSelectFlight from "./_component/SheetSelectFlight";
import FlightItem from "@/components/component/FlightCart/FlightItem";
import PaginationCustom from "@/components/component/Pagination/PaginationCustom";
import Image from "next/image";
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
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [filterObj, setFilterObj] = useState(initialObj);
  const [flightData, setFlightData] = useState<IFlight[]>();
  const [showSearchFlightForm, setShowSearchFlightForm] = useState(false);
  const [idSlt, setIdSlt] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (searchParams) {
      getFlightList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, curPage]);

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
      obj.departureTime = new Date(
        searchParams.get("departureTime") + "T00:00:00.000"
      ).toString();
    }
    if (searchParams.get("arrivalTime")) {
      obj.arrivalTime = new Date(
        searchParams.get("arrivalTime") + "T00:00:00.000"
      ).toString();
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
        const response = await flightApiRequest.getFlights(
          obj,
          `?page=${curPage}&limit=6`
        );
        if (response.status === "success") {
          setFlightData(response.data);
          setTotalPages(Math.ceil(response.totalCount / 6));
          if (topRef.current) {
            topRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
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
    return 1;
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
    <Sheet>
      <SheetContent className="xl:w-[650px] px-0 xl:max-w-none max-h-full pb-0 overflow-scroll sm:w-[400px] sm:max-w-[540px]">
        {flightData && (
          <SheetSelectFlight
            flight={flightData[idSlt]}
            iniNumberPassenger={searchParams.get("numberPassenger")}
          />
        )}
      </SheetContent>
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
          <div ref={topRef}></div>
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
            flightData.length > 0 &&
            flightData.map((el, idx) => {
              return (
                <FlightItem
                  flight={el}
                  key={idx}
                  handleSelectFlight={() => {
                    setIdSlt(idx);
                  }}
                />
              );
            })}
          {flightData && flightData.length === 0 && (
            <div className="px-4 py-4 flex bg-white gap-8 mt-2 border-[1px] rounded-md">
              <div className="relative w-[180px] h-[130px]">
                <Image
                  alt="logo"
                  quality={100}
                  src="https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp"
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="">
                <header className="font-bold text-lg mt-4">
                  No result found
                </header>
                <p className=" max-w-[500px]">
                  Could not find a result for the flight tickets. Change filter
                  to see all flight tickets.
                </p>
              </div>
            </div>
          )}
          <PaginationCustom
            totalPages={totalPages}
            curPage={curPage}
            setCurPage={setCurPage}
          />
        </div>
      </div>
    </Sheet>
  );
}
