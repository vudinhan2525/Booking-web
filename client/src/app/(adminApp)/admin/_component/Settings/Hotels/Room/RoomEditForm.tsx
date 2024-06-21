"use client";
import React, { useState } from "react";
import RoomItem from "./RoomItem";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique ids
import { IHotel } from "@/interfaces/IHotel";

export default function RoomEditForm({
  hotelId,
  hotelEdit,
}: {
  hotelId: number;
  hotelEdit?: IHotel;
}) {
  const [numberItemAdd, setNumberItemAdd] = useState<
    { id: string; data: number }[]
  >([]);

  const handleDeleteForm = (id: string) => {
    setNumberItemAdd((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      return newItems;
    });
  };

  const handleAddRoom = () => {
    const newItem = {
      id: uuidv4(),
      data: 1,
    };
    setNumberItemAdd((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="bg-white mt-6 px-6 py-6 rounded-md shadow-md">
      <header className="text-2xl mb-2 font-bold">Room Information</header>
      <div className="flex flex-col gap-2">
        {hotelEdit &&
          hotelEdit.rooms.map((room, idx) => {
            return (
              <RoomItem
                hotelId={hotelId}
                key={idx}
                id={uuidv4()}
                isAddedForm={false}
                roomEdit={room}
              />
            );
          })}

        {numberItemAdd.map((item) => (
          <RoomItem
            hotelId={hotelId}
            key={item.id}
            id={uuidv4()}
            onDeleteForm={() => handleDeleteForm(item.id)}
            isAddedForm={true}
          />
        ))}
        <div
          onClick={handleAddRoom}
          className="px-4 text-center w-[180px] py-3 cursor-pointer border-[1px] rounded-md border-primary-color font-bold text-primary-color"
        >
          Add more room
        </div>
      </div>
    </div>
  );
}
