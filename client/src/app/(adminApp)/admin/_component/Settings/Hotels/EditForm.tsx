import { IHotel } from "@/interfaces/IHotel";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function EditForm({
  isEditForm,
  setTurnOffForm,
}: {
  isEditForm: boolean;
  setTurnOffForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div
        onClick={() => setTurnOffForm(false)}
        className="w-[50px] cursor-pointer flex justify-center items-center h-[50px] hover:bg-gray-200 transition-all rounded-full"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-xl"
        ></FontAwesomeIcon>
      </div>
      <div className="px-6 mt-2 py-6 bg-white rounded-md shadow-md">
        <header className="text-xl font-bold">Hotel Information</header>
      </div>
    </div>
  );
}
