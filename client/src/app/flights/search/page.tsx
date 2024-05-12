"use client";

import { useSearchParams } from "next/navigation";
import SortBar from "@/components/component/SortBar/SortBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAllDatesOfMonth } from "@/utils/convertTime";
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
export default function SearchFlightPage() {
  const searchParams = useSearchParams();
  const [flightData, setFlightData] = useState<IFlight[]>();
  useEffect(() => {
    if (searchParams) {
      getFlightList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const getFlightList = async () => {
    const numberPassenger = searchParams.get("numberPassenger")?.split("-");
    let obj: any = {};
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
      obj.numberAdult = parseInt(numberPassenger[0]);
      obj.numberChild = parseInt(numberPassenger[1]);
      obj.numberInfant = parseInt(numberPassenger[2]);
    }
    try {
      const response = await flightApiRequest.getFlights(obj);
      if (response.status === "success") {
        setFlightData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[2000px] bg-[#F7F9FA] border-t-[1px] flex gap-8 px-28 py-10">
      <div className="basis-[32%] ">
        <SortBar />
      </div>
      <div className="basis-[68%]">
        <div className="w-full  bg-flight-ct rounded-xl px-4 py-4">
          <div className="bg-white rounded-lg flex justify-between items-center w-[70%] h-[70px]">
            <div className="px-4 py-3">
              <p className="font-bold">Ho C. M. City (SGN) → Da Nang (DAD)</p>
              <p className="text-sm text-gray-700">
                Thu, 28 Nov 2024 | 3 passenger(s) | Economy
              </p>
            </div>
            <div className="cursor-pointer py-4 px-6 items-center">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-primary-color text-xl"
              />
            </div>
          </div>
          <div className="flex justify-center  mt-4">
            <div className="bg-[#0264C8] px-4 py-2 rounded-xl">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="max-w-[650px] "
              >
                <CarouselContent>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 pl-2 lg:basis-1/5"
                    >
                      <div className="text-sm py-2 hover:bg-white/35 cursor-pointer transition-all text-center text-white font-semibold rounded-lg">
                        {"Thu,28 Nov"}
                        <div className="text-xs text-white text-center">
                          1.000.000 VND
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
