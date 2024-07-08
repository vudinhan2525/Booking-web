"use client";
import ComboBox from "@/components/component/Search/ComboBox";
import { Button } from "@/components/ui/button";
import {
  faBed,
  faCalendarDays,
  faCircleNotch,
  faDoorClosed,
  faHotel,
  faMagnifyingGlass,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../AdminProvider";
import billHotelApiRequest from "@/apiRequest/billHotel";
import { IBillHotel } from "@/interfaces/IBillHotel";
import { convertTime4, formatISODate, formatNumber } from "@/utils/convertTime";
import { RefundableIcon } from "@/lib/icon";
import { delay } from "@/utils/delay";
import Image from "next/image";
import Dialog from "@/components/modals/Dialog";
import { useToast } from "@/components/ui/use-toast";
import PaginationCustom from "@/components/component/Pagination/PaginationCustom";

export default function BillDashBoard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({ name: "All" });
  const [bills, setBills] = useState<IBillHotel[]>([]);
  const [billSlt, setBillSlt] = useState(-1);
  const [showCheckinForm, setShowCheckinForm] = useState(false);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [floor, setFloor] = useState(0);
  const [roomCode, serRoomCode] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const { admin } = useAdminContext();
  useEffect(() => {
    getBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage]);
  const getBills = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    if (!admin) return;
    try {
      const response = await billHotelApiRequest.getBillHotelForAdmin(
        {
          adminId: admin.id,
          search: search,
          status: unCapitalizeFirstLetter(status.name),
        },
        `?page=${curPage}&limit=4`
      );
      if (response.status === "success") {
        setBills(response.data);
        setTotalPages(Math.ceil(response.totalCount / 4));
      }
    } catch (error) {}
    setIsLoading(false);
  };
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function unCapitalizeFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  const handleCheckIn = async () => {
    if (roomCode.trim() === "") {
      setError((prev) => [...prev, "roomCode"]);
      return;
    }
    try {
      const res = await billHotelApiRequest.checkIn({
        billHotelId: bills[billSlt].id,
        floor: floor.toString(),
        roomCode,
      });
      if (res.status === "success") {
        const newArr = [...bills];
        const idx = newArr.findIndex((el) => el.id === res.data.id);
        if (idx !== -1) {
          newArr[idx] = res.data;
        }
        setBills(newArr);
        toast({
          title: "",
          status: "success",
          description: "Check in room successfully !",
        });
      }
    } catch (error) {}
    setShowCheckinForm(false);
  };
  const handleCheckOut = async () => {
    try {
      const res = await billHotelApiRequest.checkOut({
        billHotelId: bills[billSlt].id,
      });
      if (res.status === "success") {
        const newArr = [...bills];
        const idx = newArr.findIndex((el) => el.id === res.data.id);
        if (idx !== -1) {
          newArr[idx] = res.data;
        }
        setBills(newArr);
        toast({
          title: "",
          status: "success",
          description: "Check out room successfully !",
        });
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <header className="text-3xl font-bold">Bills</header>
      </div>
      <div className="px-6 py-6 bg-white gap-6 rounded-md shadow-md mt-4 flex">
        <div className="basis-[50%]">
          <p className="font-bold text-gray-700 text-sm">
            Search by booking code:
          </p>
          <div className="relative mt-2 ">
            <div className="absolute top-[50%] left-[3%] text-gray-600 flex items-center justify-center translate-y-[-50%]">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by booking code,..."
              className="outline-none pr-4 pl-10 rounded-lg py-3 text-sm font-bold text-gray-700 w-full bg-gray-50"
            ></input>
          </div>
        </div>
        <div className="">
          <p className="font-bold text-gray-700 text-sm mb-2">Status</p>
          <ComboBox
            value={status}
            frameworks={[
              { name: "All" },
              { name: "Pending" },
              { name: "Completed" },
            ]}
            isSeatList={true}
            setValue={setStatus}
            child={
              <div
                className={`border-[1px] min-w-[150px] cursor-pointer inline-flex items-center gap-2 px-4 rounded-xl py-3 bg-white`}
              >
                <p className="font-bold text-gray-600 text-[15px]">
                  {status.name}
                </p>
              </div>
            }
          />
        </div>
        <div className="">
          <p className="font-bold text-gray-700 text-sm">Search</p>
          <div
            onClick={() => {
              getBills();
            }}
            className="flex justify-center items-center mt-2 cursor-pointer hover:bg-blue-600 transition-all gap-2 px-4 py-3 text-white bg-primary-color rounded-lg text-[15px]"
          >
            <div className=" text-gray-600 flex items-center justify-center ">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-white text-lg "
              />
            </div>
            <p className="font-bold">Search now</p>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-full mt-20">
          <div className="flex my-12 items-center justify-center">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin={true}
              className="text-[40px] text-gray-400"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="flex gap-2 flex-col px-4 py-4 mt-6 shadow-md bg-white rounded-md">
          {bills &&
            bills.length > 0 &&
            bills.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className="px-6 bg-white py-4 border-[1px] border-gray-300 rounded-md"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <p className="text-xs font-bold text-gray-400 ">
                        Booking code:
                      </p>
                      <p className="mb-[2px] font-bold text-primary-color">
                        {el.id}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-xs font-bold text-gray-400 ">
                        Status:
                      </p>
                      <p className="mb-[2px] font-bold text-primary-color">
                        {capitalizeFirstLetter(el.status)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <header className="font-bold text-lg">
                      {el.nameHotel}
                    </header>
                    <div className="flex gap-2 items-center">
                      <p className="text-xs font-bold text-gray-400 ">Date:</p>
                      <p className="mb-[2px] font-bold text-gray-600">
                        {formatISODate(el.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">{`(${el.numberOfRoom}x) ${el.nameRoom}`}</p>
                  <div className="bg-gray-300 w-full h-[0.5px] my-4"></div>
                  <div className="flex mt-4 justify-between mx-20">
                    <div className="basis-[35%]">
                      <div
                        className={`${
                          el.isCheckIn
                            ? "border-primary-color border-[2px] bg-blue-50"
                            : "border-gray-300 border-[1px]"
                        } w-full px-4 py-3   rounded-xl flex flex-col items-center`}
                      >
                        <p className="text-xs text-gray-600 font-semibold">
                          Check in
                        </p>
                        <p className="  font-bold">
                          {convertTime4(el.dateCheckIn)}
                        </p>
                        <p className="text-xs mt-1 text-gray-600 font-semibold">
                          After 14:00
                        </p>
                      </div>
                    </div>
                    <div className="basis-[20%] flex items-center gap-1 flex-col justify-center">
                      <p className="text-xs text-gray-600 font-semibold">{`${el.duration} Night(s)`}</p>
                      <div className="w-full h-[1px] bg-gray-200 relative">
                        <div className="absolute w-[10px] h-[10px] border-[1px] rounded-full top-0 translate-y-[-50%] bg-white"></div>
                        <div className="absolute w-[10px] h-[10px] border-[1px] border-gray-600 rounded-full right-0 translate-y-[-50%] bg-gray-600"></div>
                      </div>
                    </div>
                    <div className="basis-[35%]">
                      <div
                        className={`${
                          el.isCheckOut
                            ? "border-primary-color border-[2px] bg-blue-50"
                            : "border-gray-300 border-[1px]"
                        } w-full px-4 py-3   rounded-xl flex flex-col items-center`}
                      >
                        <p className="text-xs text-gray-600 font-semibold">
                          Check out
                        </p>
                        <p className="  font-bold">
                          {convertTime4(el.dateCheckOut)}
                        </p>
                        <p className="text-xs mt-1 text-gray-600 font-semibold">
                          Before 12:00
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-6 mx-6 gap-16">
                    <div className="flex gap-2 flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <RefundableIcon
                            width="18px"
                            height="19px"
                            fill="#000000"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                          Refundable
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="text-gray-800"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                          Reschedule
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <FontAwesomeIcon
                            icon={faBed}
                            className="text-gray-800"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                          {el.bed}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="min-w-[18px]">
                          <FontAwesomeIcon
                            icon={faMoon}
                            className="text-gray-800"
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">{`${el.duration} Night(s), ${el.numberOfRoom} Room(s)`}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                      {el.floor && (
                        <div className="flex gap-2 items-center">
                          <div className="min-w-[18px]">
                            <FontAwesomeIcon
                              icon={faHotel}
                              className="text-gray-800"
                            />
                          </div>
                          <p className="text-sm font-bold text-gray-600">{`Floor: ${el.floor}`}</p>
                        </div>
                      )}
                      {el.roomCode && (
                        <div className="flex gap-2 items-center">
                          <div className="min-w-[18px]">
                            <FontAwesomeIcon
                              icon={faDoorClosed}
                              className="text-gray-800"
                            />
                          </div>
                          <p className="text-sm font-bold text-gray-600">{`Room code: ${el.roomCode}`}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-300 w-full h-[0.5px] my-4"></div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-600">Total price:</p>
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center gap-1 ">
                          <p
                            className={`${
                              el.isPayment && "line-through"
                            } text-xl font-bold text-orange-600`}
                          >{`${formatNumber(el.price)}`}</p>
                          <p className="mt-[3px] text-xs font-semibold text-gray-500">
                            VNĐ
                          </p>
                        </div>
                        {el.isPayment && (
                          <p className="text-sm font-bold text-orange-600">
                            Payment completed
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          setShowCheckinForm(true);
                          setBillSlt(idx);
                        }}
                        className="ml-4 bg-primary-color  font-bold hover:bg-blue-600"
                      >
                        Check in
                      </Button>
                      <Button
                        onClick={() => {
                          setBillSlt(idx);
                          setShowCheckoutDialog(true);
                        }}
                        className="bg-white border-[1px] border-primary-color text-primary-color font-bold hover:bg-gray-100 ml-2"
                      >
                        Check out
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          {bills.length === 0 && (
            <div className="px-4 py-4 flex gap-8 mt-2 border-[1px] rounded-md">
              <div className="relative w-[180px] h-[130px]">
                <Image
                  alt="logo"
                  quality={100}
                  src="https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp"
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="">
                <header className="font-bold text-lg mt-4">
                  No result found
                </header>
                <p className=" max-w-[500px]">
                  Could not find a result for the booking tickets. Change filter
                  to see all your booking tickets.
                </p>
              </div>
            </div>
          )}
          <PaginationCustom
            totalPages={totalPages}
            curPage={curPage}
            setCurPage={setCurPage}
          />
        </div>
      )}
      <div className="h-[200px]"></div>
      {showCheckinForm && (
        <div className="modal animate-fadeIn fixed top-0 animate-slideTopDown right-0 left-0 bottom-0 bg-black/30 z-[51] ">
          <div className="absolute py-6 px-6 top-[50%] translate-y-[-50%] overflow-hidden dark:bg-dark-flat w-[470px] right-[50%] rounded-xl translate-x-[50%] bg-white">
            <header className="text-center text-2xl pb-2 font-bold border-b-[1px]">
              Check In Information
            </header>
            <div className="flex mt-3">
              <div className="basis-[50%]">
                <p className="text-sm font-bold">Floor:</p>
                <input
                  type="number"
                  min={0}
                  value={floor}
                  onChange={(e) => {
                    setFloor(Number(e.target.value));
                  }}
                  className="font-bold text-sm px-3 py-2 outline-none border-[1px] rounded-md mt-1"
                ></input>
              </div>
              <div className="basis-[50%]">
                <p
                  className={`${
                    error.includes("roomCode") && "text-red-500"
                  } text-sm font-bold`}
                >
                  Room code:
                </p>
                <input
                  value={roomCode}
                  onChange={(e) => {
                    setError([]);
                    serRoomCode(e.target.value);
                  }}
                  className={`${
                    error.includes("roomCode") && "bg-red-50 border-red-400"
                  } font-bold text-sm px-3 py-2 outline-none border-[1px] rounded-md mt-1`}
                ></input>
                {error.includes("roomCode") && (
                  <p className="text-xs font-bold text-red-500 mt-1">
                    Please enter roomcode
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm italic mt-4">
              I already received the payment, check in for the passenger now.
            </p>
            <div className="flex items-center gap-6 mt-2">
              <div
                onClick={() => {
                  setBillSlt(-1);
                  setShowCheckinForm(false);
                }}
                className="bg-gray-300 dark:bg-gray-700 font-semibold px-6 cursor-pointer hover:opacity-80 transition-all py-2 rounded-lg"
              >
                Cancel
              </div>
              <div
                onClick={() => {
                  handleCheckIn();
                }}
                className=" px-6 cursor-pointer py-2 rounded-lg font-semibold hover:opacity-80 transition-all bg-orange-400 text-white"
              >
                Check In
              </div>
            </div>
          </div>
        </div>
      )}
      {showCheckoutDialog && (
        <Dialog
          onClose={() => {
            setBillSlt(-1);
            setShowCheckoutDialog(false);
          }}
          onYes={() => {
            handleCheckOut();
            setShowCheckoutDialog(false);
          }}
          buttonContent={"Yes"}
          message={"Are you sure want to check out this room."}
          content={
            "This room will be checked out, you cannot undo this action !!"
          }
        />
      )}
    </div>
  );
}
