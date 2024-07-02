"use client";
import billHotelApiRequest from "@/apiRequest/billHotel";
import Dialog from "@/components/modals/Dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { IHotel } from "@/interfaces/IHotel";
import { IUser } from "@/interfaces/IUser";
import { RefundableIcon } from "@/lib/icon";
import { convertTime4, formatNumber } from "@/utils/convertTime";
import {
  faBanSmoking,
  faBed,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import paymentApiRequest from "@/apiRequest/payment";
import Coupon from "@/components/component/Coupon/Coupon";
import Payment from "@/components/component/Payment/Payment";

export default function SheetSelectRoom({
  hotel,
  roomSelected,
  roomOptSelected,
  user,
}: {
  hotel: IHotel;
  roomSelected: number;
  roomOptSelected: number;
  user: IUser;
}) {
  const [paymentSlt, setPaymentSlt] = useState("direct");
  const searchParams = useSearchParams();
  const [duration, setDuration] = useState(() => {
    const string = searchParams.get("duration");
    if (string === null) {
      return 1;
    } else {
      if (Number.isNaN(Number(string))) {
        return 1;
      }
      return Number(string);
    }
  });
  const [numberOfPassenger, setNumberOfPassenger] = useState(() => {
    const string = searchParams.get("numberPassenger");
    if (string !== null) {
      const numberStringArr = string.split("-");
      for (let i = 0; i < numberStringArr.length; i++) {
        if (Number.isNaN(Number(numberStringArr[i]))) {
          return {
            adult: 1,
            child: 0,
            room: 1,
          };
        }
      }
      if (Number(numberStringArr[0]) === 0) {
        return {
          adult: 1,
          child: 0,
          room: 1,
        };
      }
      if (Number(numberStringArr[2]) > Number(numberStringArr[0])) {
        return {
          adult: Number(numberStringArr[0]),
          child: Number(numberStringArr[1]),
          room: Number(numberStringArr[0]),
        };
      }
      return {
        adult: Number(numberStringArr[0]),
        child: Number(numberStringArr[1]),
        room: Number(numberStringArr[2]),
      };
    }
    return {
      adult: 1,
      child: 0,
      room: 1,
    };
  });
  const [departureTime, setDepartureTime] = useState(() => {
    const string = searchParams.get("departureTime");
    if (!string) return new Date();
    const [year, month, day] = string.split("-");
    if (
      Number.isNaN(Number(year)) ||
      Number.isNaN(Number(month)) ||
      Number.isNaN(Number(day))
    ) {
      return new Date();
    }
    return new Date(Number(year), Number(month) - 1, Number(day));
  });
  const [arrivalTime, setArrivalTime] = useState<Date>();
  const { toast } = useToast();
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (departureTime && duration) {
      const durationInMilliseconds = duration * 24 * 60 * 60 * 1000;
      const arrival = new Date(
        departureTime.getTime() + durationInMilliseconds
      );
      setArrivalTime(arrival);
    }
  }, [departureTime, duration]);
  useEffect(() => {
    if (
      hotel &&
      roomOptSelected !== undefined &&
      roomSelected !== undefined &&
      numberOfPassenger
    ) {
      setPrice(
        hotel.rooms[roomSelected].roomOpts[roomOptSelected].price *
          numberOfPassenger.room *
          duration
      );
    }
  }, [hotel, roomOptSelected, roomSelected, numberOfPassenger, duration]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const handleAddBill = async () => {
    const body = {
      price: (price * 110) / 100 - discountPrice,
      status: "pending",
      isRefundable:
        hotel.rooms[roomSelected].roomOpts[roomOptSelected].isRefundable,
      isReschedule: false,
      numberOfPassenger: numberOfPassenger.adult + numberOfPassenger.child,
      numberOfRoom: numberOfPassenger.room,
      bed: hotel.rooms[roomSelected].roomOpts[roomOptSelected].bed,
      dateCheckIn: departureTime.toString(),
      dateCheckOut: arrivalTime?.toString(),
      nameRoom: hotel.rooms[roomSelected].name,
      nameHotel: hotel.name,
      duration: duration,
      userId: user.id,
      adminId: hotel.adminId,
      hotelId: hotel.id,
      isHotelBody: true,
    };
    if (paymentSlt === "momo") {
      try {
        const response = await paymentApiRequest.getMomo(body);
        if (response.status === "success") {
          window.location.href = response.data.payUrl;
        }
      } catch (error) {}
      return;
    }
    if (paymentSlt === "stripe") {
      try {
        const response = await paymentApiRequest.getStripe(body);
        if (response.status === "success") {
          window.location.href = response.data.url;
        }
      } catch (error) {}
      return;
    }
    try {
      const response = await billHotelApiRequest.addBillHotel(body);
      if (response.status === "success") {
        toast({
          title: "",
          status: "success",
          description: "Booking successfully !",
        });
      }
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <header className="text-2xl font-bold mt-4">{hotel.name}</header>
        <div className="flex items-end gap-[2px]">
          {[1, 2, 3, 4, 5].map((el, idx) => {
            if (el <= Number(hotel.rating)) {
              return (
                <div key={idx}>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-sm text-[#FFDC00]"
                  />
                </div>
              );
            }
          })}
          <p className="text-xs font-medium mb-[3px] ml-2 text-gray-700">{`${hotel.rating}/5`}</p>
          <p className="text-xs font-medium mb-[3px] ml-1 text-gray-700">{`(${hotel.numberOfRating} reviews)`}</p>
        </div>
        <div className="mt-4 relative group rounded-xl overflow-hidden">
          <Carousel>
            <CarouselContent>
              {/* {[1, 2, 3].map((el, idx2) => {
                return (
                  <CarouselItem key={idx2}>
                    <div className="w-full rounded-xl overflow-hidden h-[200px] relative">
                      <Image
                        alt="img"
                        fill
                        priority
                        sizes="100%"
                        quality={60}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={hotel.rooms[roomSelected].images}
                      />
                    </div>
                  </CarouselItem>
                );
              })} */}
            </CarouselContent>
            <CarouselPrevious className="left-0 transition-all group-hover:inline-flex hidden" />
            <CarouselNext className="right-0 transition-all group-hover:inline-flex hidden" />
          </Carousel>
        </div>
      </div>
      <div className="flex mt-4 justify-between">
        <div className="basis-[35%]">
          <div className="w-full px-4 py-3 border-[1px] border-gray-300 rounded-xl flex flex-col items-center">
            <p className="text-xs text-gray-600 font-semibold">Check in</p>
            <p className="  font-bold">
              {convertTime4(departureTime.toString())}
            </p>
            <p className="text-xs mt-1 text-gray-600 font-semibold">
              After 14:00
            </p>
          </div>
        </div>
        <div className="basis-[20%] flex items-center gap-1 flex-col justify-center">
          <p className="text-xs text-gray-600 font-semibold">{`${duration} Night(s)`}</p>
          <div className="w-full h-[1px] bg-gray-200 relative">
            <div className="absolute w-[10px] h-[10px] border-[1px] rounded-full top-0 translate-y-[-50%] bg-white"></div>
            <div className="absolute w-[10px] h-[10px] border-[1px] border-gray-600 rounded-full right-0 translate-y-[-50%] bg-gray-600"></div>
          </div>
        </div>
        <div className="basis-[35%]">
          <div className="w-full px-4 py-3 border-[1px] border-gray-300 rounded-xl flex flex-col items-center">
            <p className="text-xs text-gray-600 font-semibold">Check out</p>
            <p className="  font-bold">
              {arrivalTime && convertTime4(arrivalTime.toString())}
            </p>
            <p className="text-xs mt-1 text-gray-600 font-semibold">
              Before 12:00
            </p>
          </div>
        </div>
      </div>
      <div className="text-gray-600 ">
        <p className="text-lg mt-4 text-black font-bold">
          {`(${numberOfPassenger.room}x) ${hotel.rooms[roomSelected].name}`}
        </p>
        <p className="text-xs text-red-700 font-medium">
          {`${hotel.rooms[roomSelected].roomOpts[roomOptSelected].roomLeft} room(s) left!`}
        </p>
        <p className="text-sm font-bold mt-4 mb-1">
          {hotel.rooms[roomSelected].roomOpts[roomOptSelected].name}
        </p>
        <div className="flex items-center gap-2 mt-2 mb-1">
          <div>
            <FontAwesomeIcon icon={faUser} className="text-gray-500 text-lg" />
          </div>
          <p className="text-sm font-bold">{`${
            numberOfPassenger.adult + numberOfPassenger.child
          } Guests`}</p>
        </div>
        <div className="text-sm font-bold mt-2 mb-1">
          {hotel.rooms[roomSelected].roomOpts[roomOptSelected].isRefundable ? (
            <div className="flex items-end gap-1">
              <RefundableIcon width="20px" height="20px" />
              <p className="text-sm font-bold text-[#05A569]">Refundable</p>
            </div>
          ) : (
            "Non-refundable"
          )}
        </div>
        {hotel.rooms[roomSelected].isSmoking === false && (
          <div className="flex items-center gap-2 mt-2 mb-1">
            <div>
              <FontAwesomeIcon
                icon={faBanSmoking}
                className="text-gray-500 text-lg"
              />
            </div>
            <p className="text-sm font-bold">Non-smoking</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div>
            <FontAwesomeIcon
              icon={faBed}
              className="text-gray-500 text-[16px]"
            />
          </div>
          <p className="text-sm font-bold mt-1 mb-1">
            {hotel.rooms[roomSelected].roomOpts[roomOptSelected].bed}
          </p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-4"></div>
      <Payment paymentSlt={paymentSlt} setPaymentSlt={setPaymentSlt} />
      <div className="w-full h-[1px] bg-gray-300 my-5"></div>
      <Coupon
        paymentPrice={(price * 110) / 100}
        userId={user.id}
        setDiscountPrice={setDiscountPrice}
      />
      <div className="w-full h-[1px] bg-gray-300 my-5"></div>

      <div className="px-4 py-4 border-[1px] rounded-lg mt-2">
        <header className="text-xl text-black font-bold">Price detail</header>
        <div className="flex mt-2 justify-between items-center">
          <div>
            <p className="font-bold">Price: </p>
            <p className="text-sm">{`${numberOfPassenger.room} Room(s), ${duration} Night(s)`}</p>
          </div>
          <p className="text-sm font-semibold text-black">
            {formatNumber(price) + " VNĐ"}
          </p>
        </div>
        <div className="flex mt-1 justify-between items-center">
          <div>
            <p className="font-bold">Tax (10%): </p>
          </div>
          <p className="text-sm font-semibold text-black">
            {formatNumber((price * 10) / 100) + " VNĐ"}
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-300 my-4"></div>
        <div className="flex mt-2 justify-between items-center">
          <div>
            <p className="font-bold">Total price: </p>
          </div>
          <p className=" font-bold text-black">
            {formatNumber((price * 110) / 100) + " VNĐ"}
          </p>
        </div>
      </div>
      <div className="sticky py-2 justify-between bottom-0 flex border-t-[1px] w-full h-[60px] bg-white">
        <div>
          <p className=" font-bold">Total price:</p>
          <p className="text-sm">{`${numberOfPassenger.room} Room(s), ${duration} Night(s)`}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <p className="text-sm line-through text-gray-600">
              {formatNumber(
                hotel.rooms[roomSelected].roomOpts[roomOptSelected]
                  .originalPrice
              ) + " VNĐ"}
            </p>
            <p className=" text-orange-600 font-bold">
              {formatNumber((price * 110) / 100 - discountPrice) + " VNĐ"}
            </p>
          </div>
          <Button
            onClick={() => {
              setShowPaymentDialog(true);
            }}
            className="font-bold bg-orange-600 hover:bg-orange-700 text-white"
          >
            Payment
          </Button>
        </div>
        <SheetClose ref={closeRef} className="hidden">
          close
        </SheetClose>
      </div>
      {showPaymentDialog && (
        <Dialog
          onYes={() => {
            handleAddBill();
            setShowPaymentDialog(false);
            closeRef.current?.click();
          }}
          onClose={() => {
            setShowPaymentDialog(false);
          }}
          buttonContent={"Yes"}
          message={"Are you sure want to booking this hotel."}
          content={
            "You will get a ticket to booking this hotel, you cannot undo this action !!"
          }
        />
      )}
    </div>
  );
}
