"use client";
import { ComboBox } from "@/components/component/Search/ComboBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { RoomOptsForm } from "./RoomItem";

export default function RoomOptItem({
  id,
  setRoomOpts,
  roomOpts,
  iniRoom,
}: {
  id: string;
  setRoomOpts: React.Dispatch<React.SetStateAction<RoomOptsForm[]>>;
  roomOpts: RoomOptsForm[];
  iniRoom?: RoomOptsForm;
}) {
  const [bedType, setBedType] = useState({ name: "1 Single Bed" });
  const [isRefundable, setIsRefundable] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(0);
  const [roomLeft, setRoomLeft] = useState(0);
  const [oriPrice, setOriPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [saveSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    iniState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iniState = () => {
    if (iniRoom) {
      setName(iniRoom.name);
      setNumberOfGuest(iniRoom.numberOfGuest);
      if (iniRoom.bed) {
        setBedType({ name: iniRoom.bed });
      }
      setIsRefundable(iniRoom.isRefundable);
      setRoomLeft(iniRoom.roomLeft);
      setOriPrice(iniRoom.originalPrice);
      setPrice(iniRoom.price);
      if (iniRoom.saved) {
        setShowSuccess(true);
      }
    }
  };
  const handleSaveRoomOpt = () => {
    let flag = 0;
    if (name.trim() === "") {
      flag = 1;
      setError((prev) => [...prev, "name"]);
    }
    if (!numberOfGuest) {
      flag = 1;
      setError((prev) => [...prev, "numberOfGuest"]);
    }
    if (!roomLeft) {
      flag = 1;
      setError((prev) => [...prev, "roomLeft"]);
    }
    if (!oriPrice) {
      flag = 1;
      setError((prev) => [...prev, "oriPrice"]);
    }
    if (!price) {
      flag = 1;
      setError((prev) => [...prev, "price"]);
    }
    if (flag === 1) {
      return;
    }
    setShowSuccess(true);
    setRoomOpts((prev) => {
      const newArr = [...prev];
      const idx = newArr.findIndex((el) => el.id === id);
      if (idx !== -1) {
        newArr[idx] = {
          id: newArr[idx].id,
          name: name,
          numberOfGuest: numberOfGuest,
          bed: bedType.name,
          isRefundable: isRefundable,
          roomLeft: roomLeft,
          originalPrice: oriPrice,
          price: price,
          saved: true,
        };
        return newArr;
      }
      return prev;
    });
  };
  const handleUnSaved = () => {
    setRoomOpts((prev) => {
      const newArr = [...prev];
      const idx = newArr.findIndex((el) => el.id === id);
      if (idx !== -1) {
        newArr[idx] = {
          ...newArr[idx],
          saved: false,
        };
        return newArr;
      }
      return prev;
    });
  };
  return (
    <div
      className={`border-[1px] rounded-md mt-2 ${
        saveSuccess && "bg-blue-50 border-primary-color"
      }`}
    >
      <div className="flex px-4 justify-between border-b-[1px] py-2">
        <div className="basis-[53%]">
          <div className="flex items-center w-full gap-2">
            <p
              className={`${
                error.includes("name") && "text-red-500"
              } text-sm font-bold`}
            >
              Name:
            </p>
            <input
              value={name}
              onChange={(e) => {
                setShowSuccess(false);
                handleUnSaved();
                setError([]);
                setName(e.target.value);
              }}
              className={`${
                error.includes("name") ? "border-red-400 bg-red-50" : ""
              } px-3 w-full py-2 border-[1px] rounded-md text-sm font-bold text-gray-700 outline-none`}
            ></input>
          </div>
          {error.includes("name") && (
            <p className="text-xs ml-14 mt-1 font-bold text-red-500">
              Please enter name for room options.
            </p>
          )}
        </div>
        <div
          onClick={() => {
            setRoomOpts((prevItems) => {
              const newItems = prevItems.filter((item) => item.id !== id);
              return newItems;
            });
          }}
          className="cursor-pointer flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faXmark} className="text-2xl" />
        </div>
      </div>
      <div className="flex px-4 py-4 items-center">
        <div className="basis-[33%] relative ">
          <div className="flex gap-2 items-center">
            <p
              className={`${
                error.includes("numberOfGuest") && "text-red-500"
              } text-sm min-w-[120px] font-bold`}
            >
              Number of guest:
            </p>
            <input
              value={numberOfGuest}
              onChange={(e) => {
                setShowSuccess(false);
                handleUnSaved();
                setError([]);
                setNumberOfGuest(Number(e.target.value));
              }}
              type="number"
              min={0}
              className={`${
                error.includes("numberOfGuest")
                  ? "border-red-400 bg-red-50"
                  : ""
              } px-3 w-[30%] py-2 border-[1px] rounded-md text-sm font-bold text-gray-700 outline-none`}
            ></input>
          </div>
          {error.includes("numberOfGuest") && (
            <p className="text-xs absolute mt-2 font-bold text-red-500">
              Number of guest is invalid.
            </p>
          )}
        </div>

        <div className="basis-[33%] flex gap-2 items-center">
          <p className="text-sm font-bold min-w-[90px]">Bed type:</p>
          <ComboBox
            value={bedType}
            isSeatList={true}
            setValue={(data: any) => {
              setShowSuccess(false);
              setBedType(data);
              handleUnSaved();
            }}
            child={
              <div className="bg-white px-4 text-sm font-bold text-gray-600 border-[1px] rounded-md py-2">
                {bedType.name}
              </div>
            }
            frameworks={[
              { name: "1 Single Bed" },
              { name: "2 Single Bed" },
              { name: "3 Single Bed" },
              { name: "1 Twin Bed" },
              { name: "2 Twin Bed" },
              { name: "3 Twin Bed" },
              { name: "1 Double Bed" },
              { name: "2 Double Bed" },
              { name: "3 Double Bed" },
              { name: "1 King Bed" },
              { name: "2 King Bed" },
              { name: "3 King Bed" },
            ]}
          />
        </div>
        <div className="basis-[33%]">
          <div className="flex items-center mt-4 space-x-2 mb-4">
            <Checkbox
              id={`checkbox-${id}`}
              checked={isRefundable}
              onCheckedChange={() => {
                setShowSuccess(false);
                handleUnSaved();
                setIsRefundable((prev) => !prev);
              }}
              className="bg-white"
            />
            <label
              htmlFor={`checkbox-${id}`}
              className="text-sm cursor-pointer font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Is refundable ?
            </label>
          </div>
        </div>
      </div>
      <div className="flex px-4 py-4 items-center">
        <div className="basis-[33%] relative">
          <div className="flex gap-2 items-center">
            <p
              className={`${
                error.includes("roomLeft") && "text-red-500"
              } text-sm min-w-[120px] font-bold`}
            >
              Room left:
            </p>
            <input
              type="number"
              min={0}
              value={roomLeft}
              onChange={(e) => {
                setError([]);
                handleUnSaved();
                setShowSuccess(false);
                setRoomLeft(Number(e.target.value));
              }}
              className={`${
                error.includes("roomLeft") ? "border-red-400 bg-red-50" : ""
              } px-3 w-[30%] py-2 border-[1px] rounded-md text-sm font-bold text-gray-700 outline-none`}
            ></input>
          </div>
          {error.includes("roomLeft") && (
            <p className="text-xs absolute mt-2 font-bold text-red-500">
              Room left is invalid.
            </p>
          )}
        </div>
        <div className="basis-[33%] relative">
          <div className="flex gap-2 items-center">
            <p
              className={`${
                error.includes("oriPrice") && "text-red-500"
              } text-sm min-w-[90px] font-bold`}
            >
              Original price:
            </p>
            <input
              type="number"
              value={oriPrice}
              min={0}
              onChange={(e) => {
                setError([]);
                handleUnSaved();
                setShowSuccess(false);
                setOriPrice(Number(e.target.value));
              }}
              className={`${
                error.includes("oriPrice") ? "border-red-400 bg-red-50" : ""
              } px-3 w-[40%] py-2 border-[1px] rounded-md text-sm font-bold text-gray-700 outline-none`}
            ></input>
          </div>
          {error.includes("oriPrice") && (
            <p className="text-xs absolute mt-2 font-bold text-red-500">
              Original price is invalid.
            </p>
          )}
        </div>
        <div className="basis-[33%] relative">
          <div className="flex gap-2 items-center">
            <p
              className={`${
                error.includes("price") && "text-red-500"
              } text-sm font-bold`}
            >
              Price:
            </p>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => {
                setError([]);
                handleUnSaved();
                setShowSuccess(false);
                setPrice(Number(e.target.value));
              }}
              className={`${
                error.includes("price") ? "border-red-400 bg-red-50" : ""
              } px-3 w-[40%] py-2 border-[1px] rounded-md text-sm font-bold text-gray-700 outline-none`}
            ></input>
          </div>
          {error.includes("price") && (
            <p className="text-xs absolute mt-2 font-bold text-red-500">
              Original price is invalid.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            handleSaveRoomOpt();
          }}
          className={`${
            saveSuccess
              ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
              : "bg-primary-color hover:bg-blue-600"
          } mx-4 mb-3   transition-all  font-bold`}
        >
          {saveSuccess ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
}
