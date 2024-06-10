"use client";
import userApiRequest from "@/apiRequest/user";
import FlightItem from "@/components/component/FlightCart/FlightItem";
import { IFlight } from "@/interfaces/IFlight";
import { delay } from "@/utils/delay";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function FlightSaved() {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getSavedFlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getSavedFlight = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    try {
      const response = await userApiRequest.getSavedFlight();
      if (response.status === "success") {
        setFlights(response.data);
      }
    } catch (error) {}
    setIsLoading(false);
  };
  return (
    <div>
      {isLoading && (
        <div className="w-full">
          <div className="flex my-12 items-center justify-center">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin={true}
              className="text-[40px] text-gray-400"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div>
          {flights.length === 0 && (
            <div className="px-4 py-4 flex gap-8 mt-2 border-[1px] rounded-md">
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
                <p className="">
                  Could not find a result for the flight ticket you saved. Save
                  any flight to see all your saved flight tickets.
                </p>
              </div>
            </div>
          )}
          {flights.length > 0 &&
            flights.map((flight, idx) => {
              return (
                <FlightItem flight={flight} key={idx} fromSavedPage={true} />
              );
            })}
        </div>
      )}
    </div>
  );
}
