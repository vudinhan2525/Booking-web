import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IHotel } from "@/interfaces/IHotel";
import React from "react";

export default function SheetSelectRoom({
  hotel,
  roomSelected,
  roomOptSelected,
}: {
  hotel: IHotel;
  roomSelected: number;
  roomOptSelected: number;
}) {
  return (
    <SheetHeader>
      <SheetTitle>
        <header className="text-xl">{hotel.name}</header>
      </SheetTitle>
      <SheetDescription>{hotel.rooms[roomSelected].name}</SheetDescription>
    </SheetHeader>
  );
}
