"use client";
import { ComboBox } from "@/components/component/Search/ComboBox";
import { IHotel } from "@/interfaces/IHotel";
import { destinations } from "@/lib/dataHotel";
import {
  faCamera,
  faChevronDown,
  faChevronLeft,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import MapPicker from "@/components/component/Map/MapPicker";
import { Textarea } from "@/components/ui/textarea";
import facilitiesMap, { facilities } from "@/utils/facilities";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import hotelApiRequest from "@/apiRequest/hotel";
import RoomEditForm from "./RoomEditForm";
// const MapPicker = dynamic(
//   () => import("@/components/component/Map/MapPicker"),
//   {
//     ssr: false,
//   }
// );
const accomodationType = [
  { name: "Homes" },
  { name: "Others" },
  { name: "Hotels" },
  { name: "Apartments" },
  { name: "Guest Houses" },
  { name: "B&B" },
  { name: "Resorts" },
  { name: "Homestays" },
  { name: "Hostels" },
  { name: "Villas" },
];
const DEFAULT_LAT = 10.797752036781176;
const DEFAULT_LONG = 106.6675132954067;
export default function EditForm({
  isEditForm,
  setTurnOffForm,
}: {
  isEditForm: boolean;
  setTurnOffForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [error, setError] = useState<string[]>([]);
  const [errorNameMsg, setErrorNameMsg] = useState("Please enter hotel name.");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [summary, setSummary] = useState("");
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [destination, setDestination] = useState({
    code: "",
    name: "",
    title: "",
    lat: "",
    long: "",
  });
  const [accomodations, setAccomodations] = useState({ name: "Hotels" });
  const [location, setLocation] = useState<LatLng | null>(null);
  const [fac, setFac] = useState<string[]>(["AC", "Parking"]);
  const [isAdded, setIsAdded] = useState(false);
  const roomRef = useRef<HTMLDivElement>(null);
  const handleLocationSelect = (latlng: LatLng) => {
    setLocation(latlng);
  };
  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreview(objectUrls);
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);
  const handleClickDeleteImage = (idx: number) => {
    const updatedFiles = files.filter((el, id) => id !== idx);
    setFiles(updatedFiles);
  };
  const handleAddHotel = async () => {
    let flg = 0;
    if (name.trim() === "") {
      setError((prev) => [...prev, "name"]);
      flg = 1;
    }
    if (address.trim() === "") {
      setError((prev) => [...prev, "address"]);
      flg = 1;
    }
    if (destination.code === "") {
      setError((prev) => [...prev, "destination"]);
      flg = 1;
    }
    if (summary.trim() === "") {
      setError((prev) => [...prev, "summary"]);
      flg = 1;
    }
    if (!files || files.length !== 5) {
      setError((prev) => [...prev, "files"]);
      flg = 1;
    }
    if (!fac || fac.length === 0) {
      setError((prev) => [...prev, "facilities"]);
      flg = 1;
    }
    if (location === null) {
      setError((prev) => [...prev, "location"]);
      flg = 1;
    }
    if (flg === 1) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("accomodation", accomodations.name);
      formData.append("address", address);
      formData.append("summary", summary);
      formData.append("location", destination.title);
      formData.append("facilities", fac.join(","));
      formData.append("long", (location?.lng as number).toString());
      formData.append("lat", (location?.lat as number).toString());
      files.forEach((file, index) => {
        formData.append("files", file);
      });
      const response = await hotelApiRequest.addHotel(formData);
      if (response.status === "success") {
        setIsAdded(true);
        roomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {}
  };
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
      <div className="px-6 mt-2 py-6 bg-white rounded-md relative shadow-md">
        {isAdded && (
          <div className="absolute z-[10] bg-blue-100/70 rounded-md  top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <p className="text-xl font-bold text-primary-color">
              Hotel added successfully.
            </p>
          </div>
        )}
        <header className="text-2xl mb-2 font-bold">Hotel Information</header>
        <div className="flex mt-3 gap-6">
          <div className="basis-[50%]">
            <p
              className={`font-bold text-sm ${
                error.includes("name") && "text-red-500"
              }`}
            >
              Hotel name
            </p>
            <input
              value={name}
              onChange={(e) => {
                setError([]);
                setName(e.target.value);
              }}
              className={`${
                error.includes("name") ? "bg-red-50 border-red-300" : ""
              } mt-1 w-full outline-none px-4 py-2 border-[1px] rounded-md font-bold text-gray-600`}
            ></input>
            {error.includes("name") && (
              <p className="text-xs font-bold text-red-500 mt-1">
                {errorNameMsg}
              </p>
            )}
          </div>
          <div className="basis-[50%]">
            <p className="font-bold text-sm">Accomodation type</p>
            <ComboBox
              value={accomodations}
              frameworks={accomodationType}
              isSeatList={true}
              setValue={setAccomodations}
              child={
                <div
                  className={`mt-1 border-[1px] min-w-[150px] cursor-pointer inline-flex items-center gap-2 px-4 rounded-md py-2 bg-white`}
                >
                  <p className="font-bold text-gray-600 text-[15px]">
                    {accomodations.name}
                  </p>
                </div>
              }
            />
          </div>
        </div>
        <div className="mt-3 flex gap-6">
          <div className=" basis-[60%]">
            <p
              className={`font-bold text-sm ${
                error.includes("address") && "text-red-500"
              }`}
            >
              Address
            </p>
            <input
              value={address}
              onChange={(e) => {
                setError([]);
                setAddress(e.target.value);
              }}
              className={`${
                error.includes("address") ? "bg-red-50 border-red-300" : ""
              } mt-1 w-full outline-none px-4 py-2 border-[1px] rounded-md font-bold text-gray-600`}
            ></input>
            {error.includes("address") && (
              <p className="text-xs font-bold text-red-500 mt-1">
                Please enter address for your hotel.
              </p>
            )}
          </div>
          <div className="basis-[30%]">
            <p
              className={`font-bold text-sm ${
                error.includes("destination") && "text-red-500"
              }`}
            >
              Location
            </p>
            <ComboBox
              isDestination={true}
              value={destination}
              frameworks={destinations}
              setValue={(el: any) => {
                setError([]);
                setDestination(el);
              }}
              child={
                <div
                  className={`${
                    error.includes("destination")
                      ? "bg-red-50 border-red-300"
                      : "bg-white"
                  } z-[4] mt-1 flex items-center gap-2 cursor-pointer  border-[1px] px-4 py-2 rounded-lg`}
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-primary-color"
                    />
                  </div>
                  <p className="text-gray-700 font-semibold mt-[2px] line-clamp-1">
                    {destination.name
                      ? destination.name + ", Việt Nam"
                      : "Select city, destination,..."}
                  </p>
                </div>
              }
            />
            {error.includes("destination") && (
              <p className="text-xs font-bold text-red-500 mt-1">
                Please select location for your hotel.
              </p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <p
            className={`font-bold text-sm ${
              error.includes("location") && "text-red-500"
            }`}
          >
            Pick a location
          </p>
          {error.includes("location") && (
            <p className="text-xs italic text-red-500 mt-1">
              * Please select a location for your hotel.
            </p>
          )}
          <div className="z-[2] h-[400px] relative  mx-4 rounded-xl overflow-hidden mt-2">
            <MapPicker
              onLocationSelect={handleLocationSelect}
              iniLat={DEFAULT_LAT}
              iniLong={DEFAULT_LONG}
            />
          </div>
        </div>
        <div className="mt-5 flex gap-6">
          <div className=" basis-[50%]">
            <p
              className={`font-bold text-sm ${
                error.includes("summary") && "text-red-500"
              }`}
            >
              Summary
            </p>
            <Textarea
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
                setError([]);
              }}
              className={`${
                error.includes("summary") ? "bg-red-50 border-red-300" : ""
              } mt-1 w-full outline-none h-[150px] px-4 py-2 border-[1px] rounded-md font-bold text-gray-600`}
            ></Textarea>
            {error.includes("summary") && (
              <p className="text-xs font-bold text-red-500 mt-1">
                Please enter summary for your hotel.
              </p>
            )}
          </div>
          <div className=" basis-[50%]">
            <p
              className={`font-bold text-sm ${
                error.includes("facilities") && "text-red-500"
              }`}
            >
              Facilities
            </p>
            <Popover>
              <PopoverTrigger className="w-full">
                <div
                  className={`flex ${
                    error.includes("facilities") ? "bg-red-50" : "bg-gray-50"
                  } items-center cursor-pointer rounded-md mt-1 py-4 px-4`}
                >
                  <div className="basis-[95%] flex-wrap w-full flex gap-2 ">
                    {fac.map((el, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="cursor-default flex gap-2 items-center px-4 py-2 rounded-md bg-white"
                        >
                          <div>{facilitiesMap.get(el).icon}</div>
                          <p className="text-sm font-bold text-gray-600">
                            {facilitiesMap.get(el).title}
                          </p>
                          <div
                            onClick={() => {
                              const newFac = fac.filter((fa) => fa !== el);
                              setFac(newFac);
                            }}
                            className="ml-2 cursor-pointer flex items-center justify-center"
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="text-sm font-bold text-gray-600"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col max-h-[250px] overflow-auto">
                  {facilities.map((el, idx) => {
                    return (
                      <div
                        onClick={() => {
                          const id = fac.indexOf(el.title);
                          if (id === -1) {
                            setError([]);
                            setFac((prev) => {
                              return [...prev, el.title];
                            });
                            return;
                          }
                        }}
                        key={idx}
                        className="hover:bg-gray-50 px-4 flex gap-2 py-2 cursor-pointer"
                      >
                        <div className="min-w-[20px]">{el.icon}</div>
                        <p className="text-sm font-bold text-gray-600">
                          {el.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
            {error.includes("facilities") && (
              <p className="text-xs font-bold text-red-500 mt-1">
                Please select facilities for your hotel.
              </p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <p
            className={`font-bold text-sm ${
              error.includes("files") && "text-red-500"
            }`}
          >
            Images
          </p>
          <p
            className={`text-sm italic ${
              error.includes("files") && "text-red-500"
            }`}
          >
            * 5 images is required
          </p>
          <div className="px-4 py-4 mt-2 bg-gray-50  rounded-lg h-[230px] max-w-[70%] flex gap-4 items-center  overflow-x-auto">
            <div
              onClick={() => {
                if (imagesRef.current) {
                  setError([]);
                  imagesRef.current.click();
                }
              }}
              className="min-w-[180px] flex-col h-[180px] cursor-pointer border-[4px] border-dashed rounded-md flex justify-center items-center"
            >
              <div>
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-gray-400 text-5xl"
                />
              </div>

              <p className="text-xs font-bold text-gray-400">
                Upload images here
              </p>
            </div>
            {preview.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className="relative min-w-[180px] h-[180px] rounded-md overflow-hidden"
                >
                  <Image
                    alt="img"
                    fill
                    priority
                    sizes="100%"
                    quality={60}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    src={el}
                  />
                  <div
                    onClick={() => handleClickDeleteImage(idx)}
                    className="absolute w-[30px] h-[30px] right-[5px] hover:bg-gray-200 transition-all top-[5px] rounded-full bg-white flex items-center justify-center cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
              );
            })}
          </div>
          <input
            type="file"
            className="hidden"
            ref={imagesRef}
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const fileListAsArray = Array.from(e.target.files);
                setFiles((prev) => [...prev, ...fileListAsArray]);
              }
            }}
          ></input>
        </div>
        <Button
          onClick={() => handleAddHotel()}
          className="bg-primary-color hover:bg-blue-500 transition-all mt-6  font-bold px-4 py-3"
        >
          Add hotel
        </Button>
      </div>
      <div ref={roomRef}>
        <RoomEditForm />
      </div>
    </div>
  );
}