"use client";
import React, { useState } from "react";
import RoomItem from "./RoomItem";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique ids

export default function RoomEditForm() {
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
      id: uuidv4(), // Generate a unique id
      data: 1, // Replace with your actual data for the room item
    };
    setNumberItemAdd((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="bg-white mt-6 px-6 py-6 rounded-md shadow-md">
      <header className="text-2xl mb-2 font-bold">Room Information</header>
      <div className="flex flex-col gap-2">
        {numberItemAdd.map((item) => (
          <RoomItem
            key={item.id}
            onDeleteForm={() => handleDeleteForm(item.id)}
            isAddedForm={true}
          />
        ))}
        <div
          onClick={handleAddRoom}
          className="px-4 w-[140px] py-2 cursor-pointer border-[1px] rounded-md border-primary-color font-bold text-primary-color text-sm"
        >
          Add more room
        </div>
      </div>
    </div>
  );
}
