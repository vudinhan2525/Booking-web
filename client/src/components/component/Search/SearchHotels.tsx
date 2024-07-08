"use client";
import { Button } from "@/components/ui/button";
import {
  faCalendarDays,
  faLocationDot,
  faMagnifyingGlass,
  faMoon,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComboBox from "./ComboBox";
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { destinations } from "@/lib/dataHotel";
import {
  convertTime,
  getFutureDate,
  toDayMonthYear,
} from "@/utils/convertTime";
import { useRouter } from "next/navigation";
import objectToQueryString from "@/utils/convertToQueryString";
import hotelApiRequest from "@/apiRequest/hotel";
import useDebounce from "@/hooks/useDebounce";
import { IHotel } from "@/interfaces/IHotel";
import Image from "next/image";
import Link from "next/link";

export default function SearchHotels({
  fromHotelsPage,
  fromSearchHotelsPage,
  iniDestination,
  iniDeparture,
  iniDuration,
  iniNumberPassenger,
  fromDetailHotelPage,
  hotelId,
}: {
  fromHotelsPage?: boolean;
  fromSearchHotelsPage?: boolean;
  iniDestination?: {
    code: string;
    name: string;
    title: string;
    long: number;
    lat: number;
  };
  iniDeparture?: string;
  iniDuration?: number;
  iniNumberPassenger?: {
    adult: number;
    child: number;
    bedroom: number;
  };
  fromDetailHotelPage?: boolean;
  hotelId?: number;
}) {
  const [destination, setDestination] = useState(() => {
    if (iniDestination && iniDestination.name !== "") {
      return iniDestination;
    }
    return {
      code: "",
      name: "",
      title: "",
      lat: "",
      long: "",
    };
  });
  const [departureTime, setDepatureTime] = useState(() => {
    if (iniDeparture && iniDeparture !== "") {
      return iniDeparture;
    }
    return "";
  });
  const [duration, setDuration] = useState(() => {
    return iniDuration ? iniDuration : 1;
  });
  const [arrivalTime, setArrivalTime] = useState({
    label: "",
    value: "",
  });
  const [numberPassenger, setNumberPassenger] = useState(() => {
    if (iniNumberPassenger) {
      return iniNumberPassenger;
    }
    return {
      adult: 1,
      child: 0,
      bedroom: 1,
    };
  });
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [preview, setPreview] = useState<JSX.Element | null>(null);
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();
  useEffect(() => {
    if (departureTime !== "") {
      setArrivalTime(getFutureDate(departureTime, duration));
    }
  }, [departureTime, duration]);

  const handleNavigate = () => {
    const obj: any = {};
    if (!isSearching) {
      if (destination.lat && destination.long && destination.code) {
        obj.lat = destination.lat;
        obj.long = destination.long;
        obj.code = destination.code;
      }
    } else {
      obj.search = search;
    }
    if (departureTime) {
      obj.departureTime = convertTime(departureTime);
    }
    if (arrivalTime) {
      obj.arrivalTime = convertTime(arrivalTime.value);
    }
    if (duration) {
      obj.duration = duration;
    }
    if (numberPassenger) {
      const res =
        numberPassenger.adult +
        "-" +
        numberPassenger.child +
        "-" +
        numberPassenger.bedroom;
      obj.numberPassenger = res;
    }
    if (fromDetailHotelPage && hotelId) {
      router.push(
        `/hotels/detail?hotelId=${hotelId}&` + objectToQueryString(obj)
      );
      return;
    }
    router.push("/hotels/search?" + objectToQueryString(obj));
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNavigate();
    }
  };

  useEffect(() => {
    if (isSearching && debouncedSearch.trim() !== "") {
      renderPreviewHotel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, isSearching]);
  const renderPreviewHotel = async () => {
    if (!isSearching || search.trim() === "") return;
    try {
      const response = await hotelApiRequest.getHotels(
        {
          long: 0,
          lat: 0,
          searchTxt: debouncedSearch,
          filter: {
            rating: "",
            facilities: "",
            priceMin: 0,
            priceMax: 10000000,
            accomodation: "Hotels",
            sortBy: "Top Rating",
          },
        },
        `?page=1&limit=4`
      );
      if (response.status === "success") {
        const previewJSX = (
          <div className="flex flex-col">
            {response.data &&
              response.data.map((el: IHotel, idx: number) => {
                return (
                  <Link
                    key={idx}
                    href={`/hotels/detail?hotelId=${el.id}`}
                    className="flex w-full gap-4 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <div className="w-[60px] rounded-md overflow-hidden relative h-[50px]">
                        <Image
                          alt="img"
                          fill
                          priority
                          sizes="100%"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          src={
                            el.images
                              ? el.images[0]
                              : "https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                          }
                        />
                      </div>
                    </div>
                    <div className="basis-[80%]">
                      <p className="font-bold">{el.name}</p>
                      <p className="text-[14px]">{el.address}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        );
        setPreview(previewJSX);
      }
    } catch (error) {}
  };
  return (
    <div
      className={`${
        fromHotelsPage
          ? "bg-white border-[1px] rounded-lg border-primary-color"
          : ""
      } animate-fadeIn   ${fromSearchHotelsPage ? "py-0 px-0" : "py-4 px-16"}`}
    >
      {fromSearchHotelsPage && (
        <div className="flex px-16 py-2 gap-3">
          <div className="basis-[35%]">
            <div className={`${fromDetailHotelPage && "hidden"}`}>
              <ComboBox
                isDestination={true}
                value={destination}
                frameworks={destinations}
                setValue={setDestination}
                setSearchTxt={setSearch}
                setIsSearching={setIsSearching}
                preview={preview}
                child={
                  <div className="flex  items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                    <div>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-white"
                      />
                    </div>
                    <input
                      onKeyDown={handleKeyDown}
                      placeholder="Select city, destination,..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setIsSearching(true);
                      }}
                      className="w-full text-white placeholder:text-white bg-transparent outline-none font-semibold mt-[2px]"
                    ></input>
                  </div>
                }
              />
            </div>
            {fromDetailHotelPage && (
              <div className="flex  items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-white"
                  />
                </div>
                <p className="text-white font-semibold mt-[2px]">
                  {destination.name
                    ? destination.name + ", Việt Nam"
                    : "Select city, destination,..."}
                </p>
              </div>
            )}
          </div>
          <div className="basis-[15%]">
            <ComboBox
              isCalendar={true}
              value={departureTime}
              departureDate={iniDeparture}
              setValue={setDepatureTime}
              child={
                <div className="flex items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                  <div>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-white"
                    />
                  </div>
                  <p className="text-white font-semibold mt-[2px]">
                    {departureTime !== ""
                      ? toDayMonthYear(departureTime)
                      : "Select date"}
                  </p>
                </div>
              }
            />
          </div>
          <div className="basis-[15%]">
            <ComboBox
              value={duration}
              setValue={setDuration}
              isDurationList={true}
              child={
                <div className="flex items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                  <div>
                    <FontAwesomeIcon icon={faMoon} className="text-white" />
                  </div>
                  <p className="text-white font-semibold mt-[2px]">
                    {duration === 1
                      ? `${duration} Night`
                      : `${duration} Nights`}
                  </p>
                </div>
              }
            />
          </div>
          <div className="basis-[25%]">
            <ComboBox
              isSetNumberPassenger={true}
              value={numberPassenger}
              setValue={setNumberPassenger}
              child={
                <div className="flex items-center gap-2 bg-gray-300/25 px-4 py-2 rounded-lg">
                  <div>
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      className="text-white"
                    />
                  </div>
                  <p className="text-white font-semibold mt-[2px]">
                    <span>{`${numberPassenger.adult} Adult(s), ${numberPassenger.child} Child, ${numberPassenger.bedroom} Room`}</span>
                  </p>
                </div>
              }
            />
          </div>
          <div
            onClick={() => handleNavigate()}
            className="flex basis-[10%] hover:opacity-80 transition-all cursor-pointer items-center gap-2 bg-white px-4 py-2 rounded-lg"
          >
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-primary-color"
              />
            </div>
            <p className="text-primary-color font-semibold mt-[2px]">{`${
              fromDetailHotelPage ? "Apply" : "Search"
            }`}</p>
          </div>
        </div>
      )}
      {!fromSearchHotelsPage && (
        <div>
          <p
            className={`${
              fromHotelsPage ? "text-gray-800" : "text-gray-200"
            } mb-2 font-semibold`}
          >
            City, destination, or hotel name
          </p>
          <ComboBox
            isDestination={true}
            value={destination}
            frameworks={destinations}
            setValue={setDestination}
            setSearchTxt={setSearch}
            setIsSearching={setIsSearching}
            preview={preview}
            child={
              <div
                className={`${
                  fromHotelsPage ? "border-[1px] border-gray-400" : ""
                } flex gap-2 px-4 rounded-xl cursor-pointer py-3 bg-white`}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-primary-color"
                  />
                </div>
                <input
                  onKeyDown={handleKeyDown}
                  placeholder="Select city, destination,..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsSearching(true);
                  }}
                  className="w-full text-gray-700 placeholder:text-gray-500 bg-transparent outline-none font-semibold mt-[2px]"
                ></input>
              </div>
            }
          />
          <div className="flex mt-2 gap-4">
            <div className="basis-[33%]">
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold`}
              >
                Check-in
              </p>
              <ComboBox
                isCalendar={true}
                value={departureTime}
                setValue={setDepatureTime}
                child={
                  <div className="w-full flex cursor-pointer items-center relative">
                    <div
                      className={`${
                        fromHotelsPage ? "border-[1px] border-gray-400" : ""
                      } select-none bg-white outline-none pr-8 pl-10 py-3 rounded-xl`}
                    >
                      {departureTime !== ""
                        ? toDayMonthYear(departureTime)
                        : "Select date"}
                    </div>
                    <div className="top-[52%] left-[12px] translate-y-[-50%] absolute">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className=" text-primary-color text-xl"
                      />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="basis-[33%]">
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold`}
              >
                Duration
              </p>
              <ComboBox
                value={duration}
                setValue={setDuration}
                isDurationList={true}
                child={
                  <div
                    className={` w-fit cursor-pointer flex  items-center relative`}
                  >
                    <div
                      className={`${
                        fromHotelsPage ? "border-[1px] border-gray-400" : ""
                      } pointer-events-none w-[165px] bg-white outline-none pr-8 pl-10 py-3 rounded-xl`}
                    >
                      {duration === 1
                        ? `${duration} Night`
                        : `${duration} Nights`}
                    </div>
                    <div className="top-[55%] left-[12px] translate-y-[-50%] absolute">
                      <FontAwesomeIcon
                        icon={faMoon}
                        className=" text-primary-color text-xl"
                      />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="basis-[33%]">
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold`}
              >
                Check-out
              </p>
              <p
                className={`${
                  fromHotelsPage ? "text-gray-800" : "text-gray-200"
                } mb-2 font-semibold `}
              >
                {arrivalTime.label}
              </p>
            </div>
          </div>
          <p
            className={`${
              fromHotelsPage ? "text-gray-800" : "text-gray-200"
            } mb-2 font-semibold mt-2`}
          >
            Guests and Rooms
          </p>
          <div className="flex gap-4 items-center">
            <div className="basis-[66%]">
              <ComboBox
                isSetNumberPassenger={true}
                value={numberPassenger}
                setValue={setNumberPassenger}
                child={
                  <div
                    className={`${
                      fromHotelsPage ? "border-[1px] border-gray-400" : ""
                    } flex basis-[66%] gap-2 px-4 rounded-xl py-3 bg-white`}
                  >
                    <div>
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        className="text-primary-color"
                      />
                    </div>
                    <p>{`${numberPassenger.adult} Adult(s), ${numberPassenger.child} Child, ${numberPassenger.bedroom} Room`}</p>
                  </div>
                }
              />
            </div>
            <div className="basis-[33%] ">
              <Button
                onClick={() => handleNavigate()}
                type="submit"
                className="py-6 select-none w-full text-[16px] bg-orange-600 font-bold hover:bg-orange-700 transition-all"
              >
                Search hotels
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
