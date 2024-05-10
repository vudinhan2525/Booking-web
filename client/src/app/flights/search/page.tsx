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
import FlightItem from "./_component/flightCart";
export default function SearchFlightPage() {
  const searchParams = useSearchParams();
  console.log(getAllDatesOfMonth("2024-05-09T01:32:28.468Z"));
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
        <FlightItem />
        <FlightItem />
        <FlightItem />
      </div>
    </div>
  );
}
