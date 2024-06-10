"use client";
import flightApiRequest from "@/apiRequest/flight";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import { IBillFlight } from "@/interfaces/IBillFlight";
import { formatNumber } from "@/utils/convertTime";
import { faCircleNotch, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DetailFlightBooking from "./DetailFlightBooking";
import { delay } from "@/utils/delay";
const datas = ["3 Months ago", "2 Months ago", "1 Month ago", "All time"];
export default function FlightBooking() {
  const [filterSlt, setFilterSlt] = useState(0);
  const [billFlights, setBillFlights] = useState<IBillFlight[]>([]);
  const { user } = useAppContext();
  const [showDetailFlight, setShowDetailFlight] = useState(false);
  const [detailFlightBooking, setDetailFlightBooking] = useState<IBillFlight>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getBillFlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSlt]);

  const getBillFlight = async () => {
    if (!user) return;
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    try {
      const body: any = { userId: user.id };
      if (filterSlt === 0) {
        body.from = getDateAgo(3);
      } else if (filterSlt === 1) {
        body.from = getDateAgo(2);
      } else if (filterSlt === 2) {
        body.from = getDateAgo(1);
      } else if (filterSlt === 3) {
        body.from = getDateAgo(360);
      }
      const response = await flightApiRequest.getBillFlight(body);
      if (response.status === "success") {
        setBillFlights(response.data);
      }
    } catch (error) {}
    setIsLoading(false);
  };
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const getDateAgo = (monthAgo: number) => {
    // Get the current date
    const currentDate = new Date();

    // Clone the current date to avoid modifying it
    const pastDate = new Date(currentDate);

    // Set the month to three months ago
    pastDate.setMonth(pastDate.getMonth() - monthAgo);
    return pastDate.toString();
  };
  return (
    <div className="mt-3">
      {!showDetailFlight && (
        <div>
          <div className="flex gap-2">
            {datas.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => setFilterSlt(idx)}
                  className={`${
                    filterSlt === idx
                      ? "bg-primary-color text-white border-white"
                      : "border-black"
                  } text-sm font-bold cursor-pointer hover:opacity-80 transition-all px-3 py-2 border-[1px]  rounded-md`}
                >
                  {el}
                </div>
              );
            })}
          </div>
          <p className="mt-4 font-bold">{datas[filterSlt]}</p>
          {isLoading && (
            <div className="w-full">
              <div className="flex my-8 items-center justify-center">
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
              {billFlights.length === 0 && (
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
                      Could not find a result for the filter you selected. Reset
                      filters to see all transactions.
                    </p>
                  </div>
                </div>
              )}
              {billFlights.length > 0 && (
                <div className="mt-2 flex gap-3 flex-col">
                  {billFlights.map((el, idx) => {
                    return (
                      <div
                        key={idx}
                        className=" py-4 bg-white rounded-md shadow-md"
                      >
                        <div className="flex px-4 items-center justify-between">
                          <div className="flex gap-1 items-center">
                            <p className="text-xs font-bold text-gray-400 ">{`Booking flight code:`}</p>
                            <p className="font-bold mb-1 text-primary-color text-lg">
                              {el.id}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="text-xl font-bold text-orange-600">{`${formatNumber(
                              el.price
                            )}`}</p>
                            <p className="mt-[3px] text-xs font-semibold text-gray-500">
                              VNĐ
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-100 mt-2 flex px-4 py-3 gap-2 items-center">
                          <div>
                            <FontAwesomeIcon
                              icon={faPlane}
                              className="text-primary-color"
                            />
                          </div>
                          <p className="text-sm font-bold text-gray-600">{`${el.from} → ${el.to}`}</p>
                        </div>
                        <div className="flex px-4 pt-2 mt-2 justify-between items-center">
                          <div className="flex gap-2 items-center">
                            <p className="text-xs font-bold text-gray-400 ">
                              Status:
                            </p>
                            <p className="mb-[2px] font-bold text-primary-color">
                              {capitalizeFirstLetter(el.status)}
                            </p>
                          </div>
                          <p
                            onClick={() => {
                              setShowDetailFlight(true);
                              setDetailFlightBooking(el);
                            }}
                            className="font-bold text-primary-color hover:text-blue-600 cursor-pointer transition-all"
                          >
                            See detail
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showDetailFlight && detailFlightBooking && (
        <DetailFlightBooking
          flightBooking={detailFlightBooking}
          setShowDetailFlight={setShowDetailFlight}
        />
      )}
    </div>
  );
}
