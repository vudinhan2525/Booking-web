"use client";
import hotelApiRequest from "@/apiRequest/hotel";
import SortBarHotels from "@/components/component/SortBar/SortBarHotels";
import { Button } from "@/components/ui/button";
import { IHotel } from "@/interfaces/IHotel";
import { IFilterHotel } from "@/interfaces/IfliterObj";
import { formatNumber } from "@/utils/convertTime";
import {
  faHotel,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkeletonItem from "./skeletonItem";
import useDebounce from "@/hooks/useDebounce";
import objectToQueryString from "@/utils/convertToQueryString";
import SavedBookmark from "@/components/component/Saved/SavedBookmark";
const sortArr = ["Lowest Price", "Highest Price", "Top Rating", "Most Viewed"];
const initialFilObj: IFilterHotel = {
  rating: "",
  facilities: "",
  priceMin: 0,
  priceMax: 10000000,
  accomodation: "Hotels",
  sortBy: "Lowest Price",
};
export default function MainSearchHotelPages() {
  const [sortSelected, setSortSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState<IHotel[]>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterObj, setFilterObj] = useState<IFilterHotel>(initialFilObj);
  const debouncedSearchParams = useDebounce(searchParams, 500);
  const debouncedFilterObj = useDebounce(filterObj, 500);
  useEffect(() => {
    if (debouncedSearchParams && debouncedFilterObj) {
      getHotels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchParams, debouncedFilterObj]);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const getHotels = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await delay(1000);
    const long = Number(searchParams.get("long"));
    const lat = Number(searchParams.get("lat"));
    try {
      const hotels = await hotelApiRequest.getHotels({
        long,
        lat,
        filter: filterObj,
      });
      setHotels(hotels.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleNavigate = (hotelId: number) => {
    const obj: any = {};
    obj.hotelId = hotelId;
    if (searchParams.get("code") !== "") {
      obj.code = searchParams.get("code");
    }
    if (searchParams.get("departureTime") !== "") {
      obj.departureTime = searchParams.get("departureTime");
    }
    if (searchParams.get("duration") !== "") {
      obj.duration = searchParams.get("duration");
    }
    if (searchParams.get("numberPassenger") !== "") {
      obj.numberPassenger = searchParams.get("numberPassenger");
    }
    router.push("/hotels/detail?" + objectToQueryString(obj));
  };
  return (
    <div className=" bg-[#F7F9FA]  border-t-[1px] flex gap-8 px-16 py-10">
      <div className="basis-[27%] ">
        <SortBarHotels filterObj={filterObj} setFilterObj={setFilterObj} />
      </div>
      <div className="basis-[73%]">
        <div className="flex items-center bg-white px-6 gap-4 py-4 shadow-md rounded-lg">
          <p>Sort by:</p>
          {sortArr.map((el, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  if (idx === sortSelected) {
                    return;
                  }
                  setFilterObj((prev) => {
                    return { ...prev, sortBy: el };
                  });
                  setSortSelected(idx);
                }}
                className={`${
                  sortSelected === idx
                    ? "bg-primary-color text-white border-transparent"
                    : "text-gray-700 hover:bg-gray-100"
                } text-sm  select-none  transition-all cursor-pointer px-4 py-2 rounded-lg border-[1px] border-gray-400`}
              >
                {el}
              </div>
            );
          })}
        </div>
        {!isLoading &&
          hotels &&
          hotels.map((el, idx) => {
            return (
              <div
                key={idx}
                onClick={(e) => {
                  handleNavigate(el.id);
                }}
                className="mt-4 flex gap-4 p-3 cursor-pointer hover:border-[1px] hover:border-primary-color border-[1px] border-transparent bg-white rounded-lg shadow-md"
              >
                <div className="basis-[35%]">
                  <div className="w-full relative h-[140px]">
                    <Image
                      alt="img"
                      fill
                      priority
                      sizes="100%"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      src={
                        "https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                      }
                    />
                    <div className="absolute right-[10px] top-[10px]">
                      <SavedBookmark hotel={el} fromHotelCart={true} />
                    </div>
                  </div>
                  <div className="flex gap-[2px] mt-[2px]">
                    <div className="basis-1/3 relative h-[70px]">
                      <Image
                        alt="img"
                        fill
                        priority
                        sizes="100%"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        src={
                          "https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                        }
                      />
                    </div>
                    <div className="basis-1/3 relative h-[70px]">
                      <Image
                        alt="img"
                        fill
                        priority
                        sizes="100%"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        src={
                          "https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                        }
                      />
                    </div>
                    <div className="basis-1/3 relative h-[70px]">
                      <Image
                        alt="img"
                        fill
                        priority
                        sizes="100%"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        src={
                          "https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="basis-[65%] flex">
                  <div className="basis-[70%]">
                    <h1 className="mt-1 text-lg font-bold">{el.name}</h1>
                    <div className="flex gap-[3px] items-end">
                      {[1, 2, 3, 4, 5].map((el2, idx) => {
                        return (
                          <div key={idx}>
                            <FontAwesomeIcon
                              icon={faStar}
                              className={`${
                                el2 < Number(el.rating)
                                  ? "text-[#FFDC00]"
                                  : "text-[#E5E7EB]"
                              }  text-sm `}
                            />
                          </div>
                        );
                      })}
                      <p className="text-xs text-gray-700 mb-[2px] ml-[3px]">{`${el.rating} /5`}</p>
                      <p className="text-xs text-gray-500 mb-[2px] ml-[3px]">
                        {`(${el.numberOfRating} reviews)`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-gray-600"
                        />
                      </div>
                      <p className="text-sm text-gray-700">{el.location}</p>
                    </div>
                    <div className="flex mt-1">
                      <div className="text-sm px-3 py-1 bg-blue-100/60 rounded-full text-blue-600">
                        {el.accomodation}
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-2 overflow-x-auto gap-1">
                      {el.facilities.split(",").map((el1, idx) => {
                        if (idx >= 5) return;
                        return (
                          <div
                            key={idx}
                            className="text-sm px-3 py-1 bg-gray-200 rounded-full"
                          >
                            {el1}
                          </div>
                        );
                      })}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-sm px-3 py-1 bg-gray-200 rounded-full">
                              ...
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" sideOffset={10}>
                            <div className="flex flex-wrap max-w-[230px] gap-2">
                              {el.facilities.split(",").map((el2, idx2) => {
                                return <p key={idx2}>{el2}</p>;
                              })}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="basis-[30%] border-l-[1px]">
                    <div className="flex flex-col  items-end">
                      <div className="flex items-center mt-10 gap-2">
                        <div>
                          <FontAwesomeIcon
                            icon={faHotel}
                            className="text-[#02A851]"
                          />
                        </div>
                        <p className="text-[#02A851] text-xs">{`Save ${Math.round(
                          (el.rooms[0].roomOpts[0].price * 100) /
                            el.rooms[0].roomOpts[0].originalPrice
                        )}%!`}</p>
                      </div>
                      <div className="text-gray-500 mt-2 text-sm line-through">
                        {formatNumber(el.rooms[0].roomOpts[0].originalPrice) +
                          " VNĐ"}
                      </div>
                      <p className="text-xl text-orange-600 font-bold">
                        {formatNumber(el.rooms[0].roomOpts[0].price) + " VNĐ"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Included tax & fees
                      </p>

                      <Button className="bg-orange-600 font-bold mt-4 hover:bg-orange-700">
                        Select Room
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {isLoading && (
          <div>
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </div>
        )}
      </div>
    </div>
  );
}
