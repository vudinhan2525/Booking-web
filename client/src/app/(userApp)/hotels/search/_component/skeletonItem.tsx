import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonItem() {
  return (
    <div className="mt-4 rounded-lg shadow-md bg-white px-6 py-6">
      <div className="flex gap-4">
        <div className="35%">
          <Skeleton className="w-[300px] h-[200px]" />
        </div>
        <div className="65% flex flex-col gap-2 justify-center">
          <Skeleton className="w-[500px] h-[20px] rounded-full " />
          <Skeleton className="w-[80%] h-[20px] rounded-full" />
          <Skeleton className="w-[20%] h-[20px] rounded-full" />
          <Skeleton className="w-[40%] h-[20px] rounded-full" />
          <Skeleton className="w-[60%] h-[20px] rounded-full" />
          <Skeleton className="w-[10%] h-[20px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
