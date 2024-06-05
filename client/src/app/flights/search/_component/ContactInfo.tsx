"use client";
import { Button } from "@/components/ui/button";
import { isValidEmail, isValidPhoneNumber } from "@/utils/validate";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function ContactInfo({
  iniData,
  setInfoContact,
  setIsCheckedInfo,
  showErrorSavedInfo,
  setShowErrorSavedInfo,
}: {
  iniData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  setInfoContact: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    }>
  >;
  setIsCheckedInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showErrorSavedInfo: boolean;
  setShowErrorSavedInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState(() => {
    return iniData.email ? iniData.email : "";
  });
  const [firstName, setFirstName] = useState(() => {
    return iniData.firstName ? iniData.firstName : "";
  });
  const [lastName, setLastName] = useState(() => {
    return iniData.lastName ? iniData.lastName : "";
  });
  const [phone, setPhone] = useState(() => {
    return iniData.phone ? iniData.phone : "";
  });
  const [error, setError] = useState<string[]>([]);
  const handleSaveContact = () => {
    let flag = 0;
    if (firstName.trim() === "") {
      setError((prev) => [...prev, "firstName"]);
      flag = 1;
    }
    if (lastName.trim() === "") {
      setError((prev) => [...prev, "lastName"]);
      flag = 1;
    }
    if (email.trim() === "" || !isValidEmail(email)) {
      setError((prev) => [...prev, "email"]);
      flag = 1;
    }
    if (phone.trim() === "" || !isValidPhoneNumber(phone)) {
      setError((prev) => [...prev, "phone"]);
      flag = 1;
    }
    if (flag === 1) {
      return;
    }
    setStatus(2);
    setShowErrorSavedInfo(false);
    setIsCheckedInfo(true);
    setInfoContact({ firstName, lastName, phone, email });
  };
  const [status, setStatus] = useState(1);
  return (
    <div className="px-6 mt-4">
      <header
        className={`${
          showErrorSavedInfo && "text-red-500"
        } mt-4 text-lg font-bold`}
      >
        Contact information
      </header>
      {showErrorSavedInfo && (
        <p className="italic text-xs font-light text-red-500">
          *Save your information before booking.
        </p>
      )}
      <div
        className={`${
          status === 2 && "border-primary-color bg-blue-50"
        } px-4 mt-2 pt-4 relative pb-3 border-[1px] ${
          showErrorSavedInfo && "border-red-400 bg-red-50"
        } rounded-md`}
      >
        {status === 2 && (
          <div className="absolute top-[20xp] right-[20px]">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-primary-color"
            />
          </div>
        )}
        <div className="flex items-center">
          <div className="basis-[50%]">
            <p
              className={`${
                error.includes("firstName") ? "text-red-500" : "text-gray-600"
              } text-sm font-bold `}
            >
              First name
            </p>
            <input
              value={firstName}
              onChange={(e) => {
                setError([]);
                setIsCheckedInfo(false);
                setShowErrorSavedInfo(false);
                setStatus(1);
                setFirstName(e.target.value);
              }}
              className={`${
                error.includes("firstName")
                  ? "bg-red-50 border-red-300"
                  : "border-gray-300"
              } outline-none px-4 py-2 w-[70%] mt-1 text-sm font-bold text-gray-700 border-[1px]  rounded-md`}
            ></input>
            {error.includes("firstName") && (
              <p className="text-xs font-bold mt-[2px] text-red-500">
                First name is invalid
              </p>
            )}
          </div>
          <div className="basis-[50%]">
            <p
              className={`${
                error.includes("lastName") ? "text-red-500" : "text-gray-600"
              } text-sm font-bold `}
            >
              Last name
            </p>
            <input
              value={lastName}
              onChange={(e) => {
                setError([]);
                setIsCheckedInfo(false);
                setShowErrorSavedInfo(false);
                setStatus(1);
                setLastName(e.target.value);
              }}
              className={`${
                error.includes("lastName")
                  ? "bg-red-50 border-red-300"
                  : "border-gray-300"
              } outline-none px-4 py-2 w-[70%] mt-1 text-sm font-bold text-gray-700 border-[1px]  rounded-md`}
            ></input>
            {error.includes("lastName") && (
              <p className="text-xs font-bold mt-[2px] text-red-500">
                Last name is invalid
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="basis-[50%]">
            <p
              className={`${
                error.includes("phone") ? "text-red-500" : "text-gray-600"
              } text-sm font-bold `}
            >
              Phone number
            </p>
            <input
              value={phone}
              onChange={(e) => {
                setError([]);
                setIsCheckedInfo(false);
                setShowErrorSavedInfo(false);
                setStatus(1);
                setPhone(e.target.value);
              }}
              className={`${
                error.includes("phone")
                  ? "bg-red-50 border-red-300"
                  : "border-gray-300"
              } outline-none px-4 py-2 w-[70%] mt-1 text-sm font-bold text-gray-700 border-[1px]  rounded-md`}
            ></input>
            {error.includes("phone") && (
              <p className="text-xs font-bold mt-[2px] text-red-500">
                Phone number is invalid
              </p>
            )}
          </div>
          <div className="basis-[50%]">
            <p
              className={`${
                error.includes("email") ? "text-red-500" : "text-gray-600"
              } text-sm font-bold `}
            >
              Email
            </p>
            <input
              value={email}
              onChange={(e) => {
                setIsCheckedInfo(false);
                setShowErrorSavedInfo(false);
                setError([]);
                setStatus(1);
                setEmail(e.target.value);
              }}
              className={`${
                error.includes("email")
                  ? "bg-red-50 border-red-300"
                  : "border-gray-300"
              } outline-none px-4 py-2 w-[80%] mt-1 text-sm font-bold text-gray-700 border-[1px]  rounded-md`}
            ></input>
            {error.includes("email") && (
              <p className="text-xs font-bold mt-[2px] text-red-500">
                Phone number is invalid
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={() => {
            handleSaveContact();
          }}
          className="mt-3 bg-primary-color font-bold hover:bg-blue-600 transition-all"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
