"use client";

import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
export function Combobox({
  child,
  setValue,
  value,
  frameworks,
  isAirportList,
  isCalendar,
  departureDate,
}: {
  child: React.ReactNode;
  setValue: any;
  isCalendar?: boolean;
  value: any;
  frameworks?: {
    nameAirport?: string;
    name: string;
  }[];
  isAirportList?: boolean;
  departureDate?: any;
}) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  React.useEffect(() => {
    if (setValue) {
      setValue(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  React.useEffect(() => {
    if (departureDate && date) {
      if (departureDate > date) {
        setDate(departureDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureDate]);
  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setOpen((prev) => !prev)}>{child}</div>
      {open && (
        <div className=" py-3  bg-white border-[1px] rounded-lg w-[300px] absolute z-10">
          {frameworks &&
            frameworks.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setValue(el);
                    setOpen(false);
                  }}
                  className="cursor-pointer px-4 hover:bg-gray-200 transition-all py-2"
                >
                  {isAirportList && (
                    <div>
                      <p className="font-bold">{el.name}</p>
                      <p className="text-sm text-gray-700">{el.nameAirport}</p>
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
                  return date < departureDate;
                }
                var currentDate = new Date();
                currentDate.setDate(currentDate.getDate() - 1);
                return date < currentDate;
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
