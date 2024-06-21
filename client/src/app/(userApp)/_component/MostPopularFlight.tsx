"use client";

import flightApiRequest from "@/apiRequest/flight";
import FlightCart from "@/components/component/FlightCart/FlightCart";
import PaginationCustom from "@/components/component/Pagination/PaginationCustom";

import { IFlight } from "@/interfaces/IFlight";
import { delay } from "@/utils/delay";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function MostPopularFlight() {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage]);
  const getFlights = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    try {
      const response = await flightApiRequest.getFlights(
        {
          departureTime: "",
          numberAdult: 1,
          numberChild: 0,
          numberInfant: 0,
          priceFrom: 0,
          priceTo: 10000000,
          seatType: "Economy",
        },
        `?page=${curPage}&limit=4`
      );
      if (response.status === "success") {
        setFlights(response.data);
        setTotalPages(Math.ceil(response.totalCount / 4));
      }
    } catch (error) {}
    setIsLoading(false);
  };
  return (
    <div className="mt-1">
      <div className="flex gap-2 mb-6">
        <p className="text-sm font-bold text-gray-500">
          Find the best flight to travel.
        </p>
      </div>
      {isLoading && (
        <div className="w-full flex items-center justify-center min-h-[305px] mt-20">
          <div className="flex items-center justify-center">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin={true}
              className="text-[40px] text-gray-400"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-4 gap-4 mt-3">
          {flights &&
            flights.map((flight, idx) => {
              return <FlightCart flight={flight} key={idx} />;
            })}
        </div>
      )}
      <PaginationCustom
        totalPages={totalPages}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </div>
  );
}
