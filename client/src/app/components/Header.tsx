import Image from "next/image";
import { UserIcon } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";

export default function Header() {
  return (
    <div className="px-24 fixed top-0 left-0 pt-2 right-0">
      <div className="flex items-center justify-between ">
        <div className="flex  justify-center items-center">
          <Image alt="logo" src={"/logo.png"} width={80} height={50} />
          <div className="flex select-none ml-[-10px]">
            <p className="text-[#31AE84] text-2xl font-bold">Sun</p>
            <p className="text-[#14B0C4] text-2xl font-bold">Travel</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"} className="text-[15px] border-[0px]">
            Saved
          </Button>
          <Button variant={"outline"} className="text-[15px] border-[0px]">
            My Bookings
          </Button>
          <CustomButton
            showLoginModal={true}
            variant={"outline"}
            className="flex justify-center items-center gap-1 text-[15px] border-primary-color hover:text-primary-color text-primary-color"
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
        </div>
      </div>
      <div className="mt-2">
        <Button
          variant={"outline"}
          className="text-[15px] font-bold text-gray-600 hover:text-gray-600 border-[0px]"
        >
          Hotels
        </Button>
        <Button
          variant={"outline"}
          className="text-[15px] font-bold text-gray-600 hover:text-gray-600 border-[0px]"
        >
          Flights
        </Button>
        <Button
          variant={"outline"}
          className="text-[15px] font-bold text-gray-600 hover:text-gray-600 border-[0px]"
        >
          Car Rentals
        </Button>
      </div>
    </div>
  );
}
