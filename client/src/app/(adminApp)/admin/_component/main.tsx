"use client";
import Account from "@/app/(userApp)/user/_component/Settings/Account/Account";
import {
  faFileInvoice,
  faHotel,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
const settings = [
  {
    title: "Account",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    title: "Hotels",
    icon: <FontAwesomeIcon icon={faHotel} />,
  },
  {
    title: "Bills",
    icon: <FontAwesomeIcon icon={faFileInvoice} />,
  },
];
export default function MainPage() {
  const searchParams = useSearchParams();
  const [optSlt, setOptSlt] = useState(() => {
    if (searchParams.get("slt")) {
      return Number(searchParams.get("slt"));
    }
    return 0;
  });
  return (
    <div className="flex gap-6">
      <div className="basis-[20%] px-6 py-6 bg-white min-h-[80vh] border-[1px] rounded-md border-gray-300">
        <div className="flex flex-col gap-2">
          {settings.map((el, idx) => {
            return (
              <div
                onClick={() => {
                  setOptSlt(idx);
                }}
                key={idx}
                className={`${
                  idx === optSlt
                    ? "bg-primary-color text-white"
                    : "text-gray-700 hover:bg-gray-200"
                } flex px-5 py-3 items-center gap-3  rounded-lg cursor-pointer transition-all`}
              >
                <div className="text-xl min-w-[20px]">{el.icon}</div>
                <p className="text-lg font-semibold ">{el.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="basis-[75%]">{optSlt === 0 && <Account />}</div>
    </div>
  );
}
