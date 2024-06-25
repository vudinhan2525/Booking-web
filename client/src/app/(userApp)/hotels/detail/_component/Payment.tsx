"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
export default function Payment({
  paymentSlt,
  setPaymentSlt,
}: {
  paymentSlt: string;
  setPaymentSlt: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className=" mt-2">
      <header className="text-xl text-black font-bold">Payment methods</header>
      <p className="text-sm font-semibold text-gray-400">Direct payment</p>
      <div
        onClick={() => {
          setPaymentSlt("direct");
        }}
        className={`${
          paymentSlt === "direct" ? "border-primary-color " : ""
        } mt-2 flex items-center border-[1px] cursor-pointer transition-all px-4 py-4  rounded-lg`}
      >
        <Checkbox
          id="terms1"
          defaultChecked={paymentSlt === "direct"}
          checked={paymentSlt === "direct"}
        />
        <div className="ml-3 mt-[2px]">
          <FontAwesomeIcon icon={faHotel} className="text-gray-600" />
        </div>
        <p className="ml-[6px] select-none font-semibold cursor-pointer">
          Pay at hotel
        </p>
      </div>
      <p className="text-sm font-semibold text-gray-400 mt-2">Online payment</p>
      <div className="grid grid-cols-4 mt-2 gap-2">
        <div
          onClick={() => {
            setPaymentSlt("paypal");
          }}
          className={`${
            paymentSlt === "paypal" && " border-primary-color"
          } cursor-pointer px-2 py-2 border-[1px] flex justify-center items-center rounded-md overflow-hidden`}
        >
          <div className="relative w-[80px] h-[20px] ">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={
                "https://shopcartimg2.blob.core.windows.net/shopcartctn/paypal.png"
              }
            />
          </div>
        </div>
        <div
          onClick={() => {
            setPaymentSlt("stripe");
          }}
          className={`${
            paymentSlt === "stripe" && " border-primary-color "
          } cursor-pointer px-2 py-2 border-[1px] flex justify-center items-center rounded-md overflow-hidden`}
        >
          <div className="relative w-[70px] h-[20px] ">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={
                "https://shopcartimg2.blob.core.windows.net/shopcartctn/stripe.png"
              }
            />
          </div>
        </div>
        <div
          onClick={() => {
            setPaymentSlt("momo");
          }}
          className={`${
            paymentSlt === "momo" && " border-primary-color"
          } cursor-pointer px-2 py-2 border-[1px] flex justify-center gap-1 items-center rounded-md overflow-hidden`}
        >
          <div className="relative w-[20px] h-[20px] rounded-sm overflow-hidden">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={
                "https://shopcartimg2.blob.core.windows.net/shopcartctn/momo.png"
              }
            />
          </div>
          <p className="text-sm font-bold">MoMo</p>
        </div>
        <div
          onClick={() => {
            setPaymentSlt("zalopay");
          }}
          className={`${
            paymentSlt === "zalopay" && " border-primary-color"
          } cursor-pointer px-2 py-2 border-[1px] flex justify-center gap-1 items-center rounded-md overflow-hidden`}
        >
          <div className="relative w-[20px] h-[20px] rounded-sm overflow-hidden">
            <Image
              alt="img"
              fill
              priority
              sizes="100%"
              quality={60}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={
                "https://shopcartimg2.blob.core.windows.net/shopcartctn/zalopay.png"
              }
            />
          </div>
          <p className="text-sm font-bold">ZaloPay</p>
        </div>
      </div>
    </div>
  );
}
