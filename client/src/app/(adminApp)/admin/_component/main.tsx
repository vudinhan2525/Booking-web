"use client";
import Account from "@/app/(userApp)/user/_component/Settings/Account/Account";
import {
  faFileInvoice,
  faHotel,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import HotelDashboard from "./Settings/Hotels/HotelDashboard";
import { useAdminContext } from "../AdminProvider";
import BillDashBoard from "./Settings/Bills/BillDashBoard";
import Logo from "@/components/component/Header/Logo";
import ReviewDashboard from "./Settings/Reviews/ReviewDashboard";
const settings = [
  {
    title: "Hotels",
    icon: <FontAwesomeIcon icon={faHotel} />,
  },
  {
    title: "Bills",
    icon: <FontAwesomeIcon icon={faFileInvoice} />,
  },
  {
    title: "Reviews",
    icon: <FontAwesomeIcon icon={faStar} />,
  },
  {
    title: "Account",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
];
export default function MainPage() {
  const searchParams = useSearchParams();
  const { isAdminAuthenticated, setShowLoginAdminModal } = useAdminContext();
  const [optSlt, setOptSlt] = useState(() => {
    if (searchParams.get("slt")) {
      return Number(searchParams.get("slt"));
    }
    return 0;
  });
  return (
    <div className="flex gap-12">
      <div className="basis-[20%] px-6 py-6 bg-white h-[80vh] border-[1px] rounded-md border-gray-300">
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
      {isAdminAuthenticated && (
        <div className="basis-[75%] min-w-[75%]">
          {optSlt === 0 && <HotelDashboard />}
          {optSlt === 1 && <BillDashBoard />}
          {optSlt === 2 && <ReviewDashboard />}
          {optSlt === 3 && <Account />}
        </div>
      )}
      {!isAdminAuthenticated && (
        <div className="basis-[75%] rounded-md shadow-md flex-col bg-white flex items-center min-w-[75%]">
          <div className="w-[200px] mt-12">
            <Logo />
          </div>
          <div className="w-[400px] h-[0.5px] bg-gray-300 my-6"></div>
          <p className="text-primary-color text-3xl font-bold">
            Welcome back!!
          </p>
          <p className="text-sm text-gray-600 my-4">Please Login to continue</p>
          <div
            onClick={() => {
              setShowLoginAdminModal(true);
            }}
            className="px-5 py-2 border-primary-color rounded-md border-[1px] font-bold text-primary-color cursor-pointer hover:bg-gray-50"
          >
            Login now
          </div>
        </div>
      )}
    </div>
  );
}
