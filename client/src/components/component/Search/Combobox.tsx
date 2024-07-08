"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  faBaby,
  faChild,
  faDoorClosed,
  faMinus,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
export default function ComboBox({
  child,
  setValue,
  value,
  frameworks,
  isAirportList,
  isCalendar,
  departureDate,
  isReviews,
  isSeatList,
  isSetNumberPassenger,
  isDestination,
  isDurationList,
  setSearchTxt,
  setIsSearching,
  preview,
}: {
  child: React.ReactNode;
  setValue: any;
  isCalendar?: boolean;
  value: any;
  frameworks?: {
    nameAirport?: string;
    name: string;
    title?: string;
  }[];
  isAirportList?: boolean;
  departureDate?: any;
  isSeatList?: boolean;
  isSetNumberPassenger?: boolean;
  isDestination?: boolean;
  isDurationList?: boolean;
  isReviews?: boolean;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTxt?: React.Dispatch<React.SetStateAction<string>>;
  preview?: JSX.Element | null;
}) {
  const [isFirst, setIsFirst] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowWarningInfant(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showWarningInfant, setShowWarningInfant] = React.useState(false);
  React.useEffect(() => {
    if (setValue && isCalendar) {
      setValue(date);
      if (departureDate && isFirst) {
        setValue(new Date(departureDate));
        setIsFirst(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  React.useEffect(() => {
    if (departureDate && date) {
      setDate(new Date(departureDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureDate]);
  return (
    <div className="relative " ref={dropdownRef}>
      <div onClick={() => setOpen(true)}>{child}</div>

      {open && (
        <div
          className={`${isAirportList && "w-[300px]"} ${
            isSeatList && "w-[200px]"
          } ${isSetNumberPassenger && "w-full"} ${isDestination && "w-full"} ${
            isDurationList && "w-[165px]"
          } ${
            isReviews && "w-full"
          } py-3  bg-white animate-fadeIn border-[1px] rounded-lg max-h-[300px] overflow-y-auto absolute z-10`}
        >
          {" "}
          {preview && (
            <div className="">
              <p className="text-xs px-4 font-bold text-gray-400">
                Related hotel
              </p>
              {preview}
              <p className="text-xs px-4 font-bold text-gray-400 mt-2">
                Orther location
              </p>
            </div>
          )}
          {frameworks &&
            frameworks.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setValue(el);
                    setOpen(false);
                    if (setSearchTxt) {
                      setSearchTxt(el.name + ", Việt Nam");
                    }
                    if (setIsSearching) {
                      setIsSearching(false);
                    }
                  }}
                  className="cursor-pointer px-4 hover:bg-gray-200 transition-all py-2"
                >
                  {isAirportList && (
                    <div>
                      <p className="font-bold">{el.name}</p>
                      <p className="text-sm text-gray-700">{el.nameAirport}</p>
                    </div>
                  )}
                  {isSeatList && (
                    <div
                      className={`relative ${
                        value.name === el.name && "text-primary-color"
                      }`}
                    >
                      {value.name === el.name && (
                        <div className="absolute top-[50%] translate-y-[-52%] text-xl">
                          •
                        </div>
                      )}
                      <p className="pl-4 font-semibold">{el.name}</p>
                    </div>
                  )}
                  {isDestination && (
                    <div>
                      <p className="font-bold">{el.name}</p>
                      <p className="text-sm text-gray-700">{el.title}</p>
                    </div>
                  )}
                </div>
              );
            })}
          {isCalendar && (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {
                if (departureDate) {
                  const newDate = new Date(departureDate);
                  return date < newDate;
                }
                var currentDate = new Date();
                currentDate.setDate(currentDate.getDate() - 1);
                return date < currentDate;
              }}
            />
          )}
          {isSetNumberPassenger && (
            <div className="px-4">
              <div className="flex py-2 items-center justify-between">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon className="text-gray-700" icon={faUser} />
                  <div className="flex flex-col">
                    <p className="font-semibold">Adult</p>
                    <p className="text-xs text-gray-700">{"(Age >= 12)"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => {
                      if (
                        value.bedroom !== undefined &&
                        value.adult - 1 < value.bedroom
                      ) {
                        setShowWarningInfant(true);
                        return;
                      }
                      if (
                        value.infant !== undefined &&
                        value.adult - 1 < value.infant
                      ) {
                        setShowWarningInfant(true);

                        return;
                      }
                      setValue((prev: any) => {
                        if (prev.adult <= 1) return prev;
                        return { ...prev, adult: prev.adult - 1 };
                      });
                    }}
                    className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </div>
                  <div className="max-w-[25px] select-none text-center min-w-[20px]">
                    {value.adult}
                  </div>
                  <div
                    onClick={() => {
                      setShowWarningInfant(false);
                      setValue((prev: any) => {
                        return { ...prev, adult: prev.adult + 1 };
                      });
                    }}
                    className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
              </div>
              <div className="flex py-2 items-center justify-between">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    className="text-gray-700 text-xl"
                    icon={faChild}
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Child</p>
                    <p className="text-xs text-gray-700">{"(Age 2 - 11)"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => {
                      setValue((prev: any) => {
                        if (prev.child <= 0) return prev;
                        return { ...prev, child: prev.child - 1 };
                      });
                    }}
                    className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </div>
                  <div className="max-w-[25px] select-none text-center min-w-[20px]">
                    {value.child}
                  </div>
                  <div
                    onClick={() => {
                      setValue((prev: any) => {
                        return { ...prev, child: prev.child + 1 };
                      });
                    }}
                    className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
              </div>
              {value.infant !== undefined && (
                <div className="flex py-2 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                      className="text-gray-700 text-lg"
                      icon={faBaby}
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">Infant</p>
                      <p className="text-xs text-gray-700">{"(Age < 2)"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => {
                        setShowWarningInfant(false);
                        setValue((prev: any) => {
                          if (prev.infant <= 0) return prev;
                          return { ...prev, infant: prev.infant - 1 };
                        });
                      }}
                      className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </div>
                    <div className="text-center select-none max-w-[25px] min-w-[20px]">
                      {value.infant}
                    </div>
                    <div
                      onClick={() => {
                        if (value.infant + 1 > value.adult) {
                          setShowWarningInfant(true);
                          return;
                        }
                        setValue((prev: any) => {
                          return { ...prev, infant: prev.infant + 1 };
                        });
                      }}
                      className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                </div>
              )}
              {value.bedroom !== undefined && (
                <div className="flex py-2 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                      className="text-gray-700 text-base"
                      icon={faDoorClosed}
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">Room</p>
                      <p className="text-xs text-gray-700">{""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => {
                        setShowWarningInfant(false);
                        setValue((prev: any) => {
                          if (prev.bedroom <= 0) return prev;
                          return { ...prev, bedroom: prev.bedroom - 1 };
                        });
                      }}
                      className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </div>
                    <div className="text-center select-none max-w-[25px] min-w-[20px]">
                      {value.bedroom}
                    </div>
                    <div
                      onClick={() => {
                        if (value.bedroom + 1 > value.adult) {
                          setShowWarningInfant(true);
                          return;
                        }
                        setValue((prev: any) => {
                          return { ...prev, bedroom: prev.bedroom + 1 };
                        });
                      }}
                      className="px-3 hover:bg-gray-100 transition-all rounded-lg py-2 cursor-pointer text-primary-color"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                </div>
              )}
              {showWarningInfant && (
                <p className="text-sm italic">
                  {` *The number of ${
                    value.infant !== undefined ? "infants" : "bedrooms"
                  } must not exceed the number of adult
                  passenger(s)`}
                </p>
              )}
            </div>
          )}
          {isDurationList && (
            <div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setValue(el);
                      setOpen(false);
                    }}
                    className="cursor-pointer px-4 hover:bg-gray-200 transition-all py-2"
                  >
                    {idx === 0 ? (
                      <p>{`${el} Night`}</p>
                    ) : (
                      <p>{`${el} Nights`}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
