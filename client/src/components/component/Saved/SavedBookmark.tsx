"use client";
import userApiRequest from "@/apiRequest/user";
import { IHotel } from "@/interfaces/IHotel";
import { IUser } from "@/interfaces/IUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/app/(userApp)/AppProvider";
export default function SavedBookmark({
  hotel,
  fromHotelCart,
}: {
  hotel: IHotel;
  fromHotelCart?: boolean;
}) {
  const { setUser, user, setShowLoginModal } = useAppContext();
  const { toast } = useToast();
  const handleSavedHotel = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (user && user.savedHotel.split(",").includes(hotel.id.toString())) {
      //handle remove saved
      try {
        const response = await userApiRequest.unSavedHotel({
          hotelId: hotel.id,
        });
        if (response.status === "success") {
          setUser(response.data);
          toast({
            title: "",
            status: "success",
            description: "Unsaved successfully !",
          });
        }
      } catch (error) {}
      return;
    }
    try {
      const response = await userApiRequest.savedHotel({ hotelId: hotel.id });
      if (response.status === "success") {
        setUser(response.data);
        toast({
          title: "",
          status: "success",
          description: "Saved successfully !",
        });
      }
    } catch (error) {}
  };
  return (
    <div
      onClick={(e) => handleSavedHotel(e)}
      className={`flex items-center  justify-center  hover:bg-gray-200 ${
        fromHotelCart ? "bg-gray-50 w-[40px] h-[40px]" : "w-[50px] h-[50px]"
      } cursor-pointer transition-all rounded-full`}
    >
      {user && user.savedHotel.split(",").includes(hotel.id.toString()) ? (
        <FontAwesomeIcon
          icon={faBookmarkSolid}
          className={`text-2xl ${fromHotelCart && "text-base"} text-yellow-500`}
        />
      ) : (
        <FontAwesomeIcon
          icon={faBookmark}
          className={`text-2xl ${fromHotelCart && "text-base"} text-gray-800`}
        />
      )}
    </div>
  );
}
