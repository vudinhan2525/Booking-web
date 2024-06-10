import { IFlight } from "@/interfaces/IFlight";
import { RescheduleIcon } from "@/lib/icon";
import { formatNumber } from "@/utils/convertTime";
import {
  faBan,
  faCalendarDays,
  faCircleCheck,
  faPlug,
  faSuitcase,
  faTabletScreenButton,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function TicketType({
  sltSeatType,
  setSltSeatType,
  flight,
}: {
  sltSeatType: number;
  setSltSeatType: React.Dispatch<React.SetStateAction<number>>;
  flight: IFlight;
}) {
  return (
    <div className="px-6">
      <header className="my-4 text-lg font-bold">Your ticket type</header>
      <div className="gap-2 flex flex-col">
        {flight.flightSeats.map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setSltSeatType(idx)}
              className={`${
                sltSeatType === idx ? "border-primary-color bg-blue-50" : ""
              } px-4 py-4 border-[1px] transition-all cursor-pointer rounded-lg relative`}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-[40px] h-[40px]">
                  <Image
                    alt="logo"
                    quality={100}
                    src="https://shopcartimg2.blob.core.windows.net/shopcartctn/flightSeat.webp"
                    fill
                    sizes="100%"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="">
                  <p className="font-semibold">{el.name}</p>
                  <div className="flex items-center gap-[2px] mr-3">
                    <p className="text-orange-600 font-semibold">
                      {formatNumber(el.price) + " VNĐ"}
                    </p>
                    <p className="text-xs mt-[2px] text-gray-700">/pax</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div className="basis-[50%]">
                  <div className="flex gap-2 items-center">
                    <div className="min-w-[20px]">
                      <FontAwesomeIcon
                        icon={faSuitcase}
                        className="text-gray-700"
                      />
                    </div>
                    <p className="text-sm">{`Cabin baggage 1 x ${el.cabinBaggage} kg`}</p>
                  </div>
                  <div className="flex mt-1 gap-2 items-center">
                    <div className="min-w-[20px]">
                      <FontAwesomeIcon
                        icon={faSuitcase}
                        className="text-gray-700"
                      />
                    </div>
                    <p className="text-sm">{`Baggage 1 x ${el.baggage} kg`}</p>
                  </div>
                  {!el.isReschedule && (
                    <div className="flex mt-1 gap-2 items-center">
                      <div className="min-w-[20px]">
                        <RescheduleIcon
                          width="18px"
                          height="18px"
                          fill="#000000"
                        />
                      </div>
                      <p className="text-sm">{`Reschedule fee only ${
                        formatNumber(el.reschedulePrice) + " VNĐ"
                      }`}</p>
                    </div>
                  )}
                  {el.isReschedule && (
                    <div className="flex mt-1 gap-2 items-center">
                      <div className="min-w-[20px]">
                        <RescheduleIcon width="18px" height="18px" />
                      </div>
                      <p className="text-sm text-[#05A569] font-semibold">{`Reschedule fee free`}</p>
                    </div>
                  )}
                  {!el.isRefundable && (
                    <div className="flex mt-1 gap-2 items-center">
                      <div className="min-w-[20px]">
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </div>
                      <p className="text-sm">{`Refundable fee only ${
                        formatNumber(el.refundablePrice) + " VNĐ"
                      }`}</p>
                    </div>
                  )}
                  {el.isRefundable && (
                    <div className="flex mt-1 gap-2 items-center">
                      <div className="min-w-[20px]">
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="text-[#05A569]"
                        />
                      </div>
                      <p className="text-sm text-[#05A569] font-semibold">{`Refundable fee free`}</p>
                    </div>
                  )}
                </div>
                <div className="basis-[50%]">
                  {el.facilities.split(",")[3] && (
                    <div className="flex gap-2 items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={
                            el.facilities.split(",")[3].startsWith("Has")
                              ? faWifi
                              : faBan
                          }
                          className={`${
                            el.facilities.split(",")[3].startsWith("Has")
                              ? "text-gray-700"
                              : "text-gray-400"
                          } min-w-[20px] `}
                        />
                      </div>
                      <p
                        className={`${
                          el.facilities.split(",")[3].startsWith("Has")
                            ? ""
                            : "text-gray-400"
                        } text-sm`}
                      >
                        {el.facilities.split(",")[3].startsWith("Has")
                          ? "Wifi Available"
                          : "Wifi is not allowed"}
                      </p>
                    </div>
                  )}
                  {el.facilities.split(",")[2] && (
                    <div className="flex mt-1 gap-2 items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={faPlug}
                          className={`${
                            el.facilities.split(",")[2].startsWith("Has")
                              ? "text-gray-700"
                              : "text-gray-400"
                          } min-w-[20px] `}
                        />
                      </div>
                      <p
                        className={`${
                          el.facilities.split(",")[2].startsWith("Has")
                            ? ""
                            : "text-gray-400"
                        } text-sm`}
                      >
                        {el.facilities.split(",")[2].startsWith("Has")
                          ? "Power & USB port Available"
                          : "Without Power & USB port"}
                      </p>
                    </div>
                  )}
                  {el.facilities.split(",")[1] && (
                    <div className="flex mt-1 gap-2 items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={faTabletScreenButton}
                          className={`${
                            el.facilities.split(",")[1].startsWith("Has")
                              ? "text-gray-700"
                              : "text-gray-400"
                          } min-w-[20px] `}
                        />
                      </div>
                      <p
                        className={`${
                          el.facilities.split(",")[1].startsWith("Has")
                            ? ""
                            : "text-gray-400"
                        } text-sm`}
                      >
                        {el.facilities.split(",")[1].startsWith("Has")
                          ? "In-flight entertainment Available"
                          : "Without In-flight entertainment"}
                      </p>
                    </div>
                  )}
                  {el.facilities.split(",")[0] && (
                    <div className="flex mt-1 gap-2 items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={faUtensils}
                          className={`${
                            el.facilities.split(",")[0].startsWith("Has")
                              ? "text-gray-700"
                              : "text-gray-400"
                          } min-w-[20px] `}
                        />
                      </div>
                      <p
                        className={`${
                          el.facilities.split(",")[0].startsWith("Has")
                            ? ""
                            : "text-gray-400"
                        } text-sm`}
                      >
                        {el.facilities.split(",")[0].startsWith("Has")
                          ? "In-flight meal entertainment Available"
                          : "Without In-flight meal"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {sltSeatType === idx && (
                <div className="absolute right-[25px] top-[25px]">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-primary-color text-lg"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
