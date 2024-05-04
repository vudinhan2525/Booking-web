"use client";
import Image from "next/image";
import { UserIcon } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
export default function Header() {
  const [onTop, setOnTop] = useState(true);
  const debounce = useDebounce(onTop, 500);
  useEffect(() => {
    function handleScroll() {
      setOnTop(window.scrollY === 0);
    }

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`${
        !onTop && "bg-white"
      } transition-all px-24 z-20  fixed top-0 left-0 pt-2 right-0`}
    >
      <div className="flex  items-center justify-between ">
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
        <div className="flex gap-2">
          <Button
            variant={onTop ? "transparent" : "outline"}
            className={`${
              onTop
                ? "text-white hover:bg-black/30"
                : "text-gray-600 hover:text-gray-600 border-[0px]"
            } text-[15px] font-bold `}
          >
            Saved
          </Button>
          <Button
            variant={onTop ? "transparent" : "outline"}
            className={`${
              onTop
                ? "text-white hover:bg-black/30"
                : "text-gray-600 hover:text-gray-600 border-[0px]"
            } text-[15px] font-bold `}
          >
            My Bookings
          </Button>
          <CustomButton
            showLoginModal={true}
            variant={onTop ? "transparent" : "outline"}
            className={`${
              onTop
                ? "text-white border-[1px] border-white"
                : "hover:text-primary-color text-primary-color border-primary-color "
            } flex justify-center items-center gap-1 text-[15px] `}
          >
            <UserIcon width="18px" height="18px"></UserIcon>
            <p className="">Log In</p>
          </CustomButton>
          <CustomButton
            showRegisterModal={true}
            variant={"outline"}
            className="text-[15px] border-primary-color text-white bg-primary-color hover:bg-primary-color hover:text-white hover:bg-opacity-80"
          >
            Register
          </CustomButton>
          <CustomButton
            variant={"outline"}
            buttonLogout={true}
            className="text-[15px] font-bold text-gray-600 hover:text-gray-600 border-[0px]"
          >
            Log out
          </CustomButton>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <Button
          variant={onTop ? "transparent" : "outline"}
          className={`${
            onTop
              ? "text-white hover:bg-black/30"
              : "text-gray-600 hover:text-gray-600 border-[0px]"
          } text-[15px] font-bold `}
        >
          Hotels
        </Button>
        <Button
          variant={onTop ? "transparent" : "outline"}
          className={`${
            onTop
              ? "text-white hover:bg-black/30"
              : "text-gray-600 hover:text-gray-600 border-[0px]"
          } text-[15px] font-bold `}
        >
          Flights
        </Button>
        <Button
          variant={onTop ? "transparent" : "outline"}
          className={`${
            onTop
              ? "text-white hover:bg-black/30"
              : "text-gray-600 hover:text-gray-600 border-[0px]"
          } text-[15px] font-bold `}
        >
          Car Rentals
        </Button>
      </div>
    </div>
  );
}
