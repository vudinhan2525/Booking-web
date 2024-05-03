import Image from "next/image";
import React from "react";

export default function ResetToken({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="px-24 fixed top-0 left-0 pt-2 right-0 border-b-[1px] pb-2">
        <div className="flex items-center justify-between ">
          <div className="flex  justify-center items-center">
            <Image
              alt="logo"
              src={"/logo.png"}
              priority={true}
              width={80}
              height="0"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="flex select-none ml-[-10px]">
              <p className="text-[#31AE84] text-2xl font-bold">Sun</p>
              <p className="text-[#14B0C4] text-2xl font-bold">Travel</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">Hellod</div>
    </div>
  );
}
