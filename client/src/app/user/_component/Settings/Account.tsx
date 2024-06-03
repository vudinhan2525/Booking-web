"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Info from "./Info";
import Security from "./Security";

export default function Account() {
  const [tabSlt, setTabSlt] = useState(0);
  return (
    <div className="">
      <header className="text-2xl font-bold">Account</header>
      <div className="flex mt-4">
        <div
          onClick={() => setTabSlt(0)}
          className={`${
            tabSlt === 0
              ? "border-b-primary-color text-primary-color"
              : "text-gray-600"
          } px-4 py-3 font-bold transition-all cursor-pointer border-b-[2px]`}
        >
          Information
        </div>
        <div
          onClick={() => setTabSlt(1)}
          className={`${
            tabSlt === 1
              ? "border-b-primary-color text-primary-color"
              : "text-gray-600"
          } px-4 py-3 font-bold transition-all cursor-pointer border-b-[2px]`}
        >
          Password & security
        </div>
      </div>
      {tabSlt === 0 && <Info />}
      {tabSlt === 1 && <Security />}
    </div>
  );
}
