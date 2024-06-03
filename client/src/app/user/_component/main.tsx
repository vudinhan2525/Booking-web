"use client";
import React, { useState } from "react";
import {
  faBookmark,
  faFileInvoice,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Account from "./Settings/Account";
import { useAppContext } from "@/app/AppProvider";
const settings = [
  {
    title: "Account",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    title: "Bookings",
    icon: <FontAwesomeIcon icon={faFileInvoice} />,
  },
  {
    title: "Saved",
    icon: <FontAwesomeIcon icon={faBookmark} />,
  },
];
export default function MainUserPage() {
  const [optSlt, setOptSlt] = useState(0);
  const { isAuthenticated, user } = useAppContext();
  return (
    <div>
      {isAuthenticated && (
        <div className="mt-[122px]  pt-[35px] px-36 flex gap-8">
          <div className="basis-[20%]">
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
                    <div className="text-xl ">{el.icon}</div>
                    <p className="text-lg font-semibold ">{el.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-[500px] w-[1px] bg-gray-300"></div>
          <div className="basis-[70%]">{optSlt === 0 && <Account />}</div>
        </div>
      )}
    </div>
  );
}
