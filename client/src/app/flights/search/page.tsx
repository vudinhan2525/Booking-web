"use client";

import { useSearchParams } from "next/navigation";
import SortBar from "@/components/component/SortBar/SortBar";
export default function SearchFlightPage() {
  const searchParams = useSearchParams();

  return (
    <div className="h-[2000px] bg-[#F7F9FA] border-t-[1px] flex gap-8 px-28 py-10">
      <div className="basis-[32%] ">
        <SortBar />
      </div>
      <div className="basis-[68%]">search</div>
    </div>
  );
}
