import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { facilitiesRoom, facilitiesRoomMap } from "@/utils/facilities";
import {
  faCamera,
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function RoomItem({
  isAddedForm,
  onDeleteForm,
}: {
  isAddedForm: boolean;
  onDeleteForm: () => void;
}) {
  const [area, setArea] = useState("");
  const [isSmoking, setIsSmoking] = useState(false);
  const [fac, setFac] = useState<string[]>(["Wifi"]);
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const imagesRef = useRef<HTMLInputElement>(null);
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
  return (
    <div className="border-gray-300 border-[1px] rounded-md">
      <div className="flex items-center px-4 justify-between py-2 border-b-[1px] border-gray-300">
        <div className="flex items-center w-full gap-2">
          <p className="text-sm font-bold">Name:</p>
          <input className="px-3 w-[35%] py-2 border-[1px] rounded-md text-sm font-bold text-gray-700 outline-none"></input>
        </div>
        <div
          onClick={() => {
            onDeleteForm();
          }}
          className="cursor-pointer flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faXmark} className="text-2xl" />
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex">
          <div className="basis-[50%] flex gap-4 items-center">
            <div className="basis-[50%]">
              <p className={`font-bold text-sm `}>Area(m2):</p>
              <input
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                }}
                className={`mt-1 text-sm w-[70%] outline-none px-4 py-2 border-[1px] rounded-md font-bold text-gray-600`}
              ></input>
            </div>
            <div className="basis-[50%]">
              <div className="flex items-center mt-4 space-x-2">
                <Checkbox
                  id="terms"
                  checked={isSmoking}
                  onCheckedChange={() => {
                    setIsSmoking((prev) => !prev);
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm cursor-pointer font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Can smoking?
                </label>
              </div>
            </div>
          </div>
          <div className="basis-[50%]">
            <p className={`font-bold text-sm `}>Facilities room:</p>
            <Popover>
              <PopoverTrigger className="w-full">
                <div
                  className={`flex items-center cursor-pointer rounded-md  bg-gray-100 mt-1 py-4 px-4`}
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
                          <div>{facilitiesRoomMap.get(el)?.icon}</div>
                          <p className="text-sm font-bold text-gray-600">
                            {facilitiesRoomMap.get(el)?.title}
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
                  {facilitiesRoom.map((el, idx) => {
                    return (
                      <div
                        onClick={() => {
                          const id = fac.indexOf(el.title);
                          if (id === -1) {
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
          </div>
        </div>
        <div className="mt-3">
          <p className={`font-bold text-sm `}>Images</p>
          <p className={`text-sm italic `}>* 3 images is required</p>
          <div className="px-4 py-2 mt-2 bg-gray-50  rounded-lg h-[180px] max-w-[100%] flex gap-4 items-center  overflow-x-auto">
            <div
              onClick={() => {
                if (imagesRef.current) {
                  imagesRef.current.click();
                }
              }}
              className="min-w-[150px] flex-col h-[150px] cursor-pointer border-[4px] border-dashed rounded-md flex justify-center items-center"
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
                  className="relative min-w-[150px] h-[150px] rounded-md overflow-hidden"
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
        <Button className="mt-3 bg-primary-color transition-all hover:bg-blue-600  font-bold">
          Add this room
        </Button>
      </div>
    </div>
  );
}
