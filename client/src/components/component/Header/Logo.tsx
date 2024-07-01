import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/");
      }}
      className="flex cursor-pointer justify-center items-center"
    >
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
  );
}
