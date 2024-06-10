"use client";
import userApiRequest from "@/apiRequest/user";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { isValidEmail, isValidPhoneNumber } from "@/utils/validate";
import React, { useState } from "react";

export default function Info() {
  const { toast } = useToast();
  const { user, setUser } = useAppContext();
  const [error, setError] = useState<string[]>([]);
  const [email, setEmail] = useState(() => {
    if (user?.email) return user.email;
    return "";
  });
  const [phone, setPhone] = useState(() => {
    if (user?.phone) {
      return user.phone;
    }
    return "";
  });
  const [firstName, setFirstName] = useState(() => {
    if (user?.firstName) {
      return user.firstName;
    }
    return "";
  });
  const [lastName, setLastName] = useState(() => {
    if (user?.lastName) {
      return user.lastName;
    }
    return "";
  });
  const [emailMsg, setEmailMsg] = useState("Email is not valid.");
  const handleUpdateUser = async () => {
    if (!isValidEmail(email)) {
      setError((prev) => {
        return [...prev, "email"];
      });
    }
    if (!isValidPhoneNumber(phone)) {
      setError((prev) => {
        return [...prev, "phone"];
      });
      return;
    }
    if (
      firstName.trim() === user?.firstName &&
      lastName.trim() === user?.lastName &&
      email.trim() === user?.email &&
      phone.trim() === user?.phone
    ) {
      return;
    }
    try {
      const response = await userApiRequest.updateme({
        email: email.trim(),
        phone: phone.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      if (response.status === "success") {
        setUser(response.data);
        toast({
          title: "",
          status: "success",
          description: "Updated user successfully !",
        });
      }
    } catch (error) {}
  };
  return (
    <div className="py-4 border-[1px] rounded-md border-gray-300 mt-4">
      <header className="px-6 font-bold pb-4 border-gray-300 border-b-[1px]">
        Personal details
      </header>
      <div className="px-6 mt-4">
        <div className="flex ">
          <div className="basis-[50%]">
            <p className="text-sm font-bold text-gray-600">First name</p>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-sm font-semibold text-gray-700 px-4 w-[60%] py-2 outline-none border-[1px] rounded-md border-gray-300 mt-1"
            ></input>
          </div>
          <div className="basis-[50%]">
            <p className="text-sm font-bold text-gray-600">Last name</p>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="text-sm font-semibold text-gray-700 px-4 w-[60%] py-2 outline-none border-[1px] rounded-md border-gray-300 mt-1"
            ></input>
          </div>
        </div>
        <div className="flex mt-4">
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
                setError([]);
                setEmailMsg("Email is not valid.");
                setEmail(e.target.value);
              }}
              className={`${
                error.includes("email")
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              } text-sm font-semibold px-4 w-[60%] py-2 outline-none border-[1px] rounded-md  mt-1`}
            ></input>
            {error.includes("email") && (
              <p className="text-red-500 font-bold text-xs mt-1">{emailMsg}</p>
            )}
          </div>
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
                setPhone(e.target.value);
              }}
              className={`${
                error.includes("phone")
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              } text-sm font-semibold px-4 w-[60%] py-2 outline-none border-[1px] rounded-md  mt-1`}
            ></input>
            {error.includes("phone") && (
              <p className="text-red-500 font-bold text-xs mt-1">
                Phone number is invalid.
              </p>
            )}
          </div>
        </div>
        <div className="flex mt-4 gap-3 mr-16">
          <Button
            onClick={() => {
              if (user) {
                setEmail(user.email);
                setPhone(user.phone);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setError([]);
              }
            }}
            className="bg-white font-bold text-primary-color border-[1px] border-primary-color hover:bg-gray-100 hover:opacity-90 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdateUser();
            }}
            className="bg-primary-color font-bold text-white hover:bg-blue-600 transition-all"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
