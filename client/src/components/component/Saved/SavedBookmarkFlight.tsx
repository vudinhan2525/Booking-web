"use client";
import userApiRequest from "@/apiRequest/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/app/AppProvider";
import { IFlight } from "@/interfaces/IFlight";
export default function SavedBookmarkFlight({
  flight,
  fromSearchPage,
}: {
  flight: IFlight;
  fromSearchPage?: boolean;
}) {
  const { setUser, user } = useAppContext();
  const { toast } = useToast();
  const handleSavedHotel = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    if (user && user.savedFlight.split(",").includes(flight.id.toString())) {
      //handle remove saved
      try {
        const response = await userApiRequest.unSavedFlight({
          flightId: flight.id,
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
      const response = await userApiRequest.savedFlight({
        flightId: flight.id,
      });
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
      className={`flex items-center ${
        fromSearchPage ? "w-[40px] h-[40px]" : "w-[50px] h-[50px]"
      } justify-center  hover:bg-gray-200  cursor-pointer transition-all rounded-full`}
    >
      {user && user.savedFlight.split(",").includes(flight.id.toString()) ? (
        <FontAwesomeIcon
          icon={faBookmarkSolid}
          className={`text-2xl ${
            fromSearchPage && "text-base"
          } text-yellow-500`}
        />
      ) : (
        <FontAwesomeIcon
          icon={faBookmark}
          className={`text-2xl ${fromSearchPage && "text-base"} text-gray-800`}
        />
      )}
    </div>
  );
}
