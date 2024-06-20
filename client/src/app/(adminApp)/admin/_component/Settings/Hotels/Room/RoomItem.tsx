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
import RoomOptItem from "./RoomOptItem";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@/components/modals/Dialog";
import roomApiRequest from "@/apiRequest/room";
import { IRoom } from "@/interfaces/IRoom";
import { useToast } from "@/components/ui/use-toast";

export interface RoomOptsForm {
  id: string;
  name: string;
  numberOfGuest: number;
  bed: string;
  isRefundable: boolean;
  roomLeft: number;
  originalPrice: number;
  price: number;
  saved: boolean;
}
export default function RoomItem({
  isAddedForm,
  onDeleteForm,
  hotelId,
  roomEdit,
}: {
  isAddedForm: boolean;
  onDeleteForm?: () => void;
  hotelId: number;
  roomEdit?: IRoom;
}) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [area, setArea] = useState(0);
  const [error, setError] = useState<string[]>([]);
  const [isSmoking, setIsSmoking] = useState(false);
  const [fac, setFac] = useState<string[]>(["Wifi"]);
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [roomOpts, setRoomOpts] = useState<RoomOptsForm[]>([]);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [addRoomDialog, setAddRoomDialog] = useState(false);
  const [deleteRoomDialog, setDeleteRoomDialog] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    if (!files) return;
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(objectUrls);
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);
  useEffect(() => {
    iniState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomEdit, isAddedForm]);

  const iniState = () => {
    if (roomEdit && !isAddedForm) {
      setName(roomEdit.name);
      setArea(roomEdit.area);
      setIsSmoking(roomEdit.isSmoking);
      setFac(roomEdit.facilitiesRoom.split(","));
      setPreview(roomEdit.images);
      if (roomEdit.roomOpts && roomEdit.roomOpts.length > 0) {
        let newArr: RoomOptsForm[] = [];
        roomEdit.roomOpts.forEach((roomOpt) => {
          const newItem = {
            id: uuidv4(),
            numberOfGuest: roomOpt.numberOfGuest,
            name: roomOpt.name,
            bed: roomOpt.bed,
            isRefundable: roomOpt.isRefundable,
            roomLeft: roomOpt.roomLeft,
            originalPrice: roomOpt.originalPrice,
            price: roomOpt.price,
            saved: true,
          };
          newArr.push(newItem);
        });
        setRoomOpts(newArr);
      }
    }
  };

  const handleClickDeleteImage = (idx: number) => {
    const updatedFiles = files.filter((el, id) => id !== idx);
    setFiles(updatedFiles);
  };
  const handleAddRoom = async () => {
    let flag = 0;
    if (name.trim() === "") {
      flag = 1;
      setError((prev) => [...prev, "name"]);
    }
    if (!area) {
      flag = 1;
      if (areaRef.current) {
        areaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setError((prev) => [...prev, "area"]);
    }
    if (!(preview.length === 3) || !(files.length === 0)) {
      if (!files || files.length !== 3) {
        setError((prev) => [...prev, "files"]);
        flag = 1;
      }
    }
    if (roomOpts.length === 0) {
      flag = 1;
      setError((prev) => [...prev, "roomOpt"]);
    }
    roomOpts.forEach((el) => {
      if (el.saved === false) {
        flag = 1;
        setError((prev) => [...prev, "roomOpt"]);
      }
    });
    if (flag === 1) {
      return;
    }
    try {
      const body: any = {};
      body.hotelId = hotelId;
      body.name = name;
      body.area = area;
      body.isSmoking = isSmoking;
      body.facilities = fac.join(",");

      let arr: any = [];
      roomOpts.forEach((el, idx) => {
        arr.push({
          name: el.name,
          numberOfGuest: el.numberOfGuest,
          bedType: el.bed,
          isRefundable: el.isRefundable,
          roomLeft: el.roomLeft,
          originalPrice: el.originalPrice,
          price: el.price,
        });
      });
      body.roomOpts = arr;
      const formData = new FormData();
      if (!isAddedForm && roomEdit) {
        body.roomId = roomEdit.id;
        body.oldImageUrls = JSON.stringify(roomEdit.images);
      }
      formData.append("data", JSON.stringify(body));
      files.forEach((file, index) => {
        formData.append("files", file);
      });
      if (!isAddedForm && roomEdit) {
        console.log(1);
        const response = await roomApiRequest.updateRoom(formData);
        if (response.status === "success") {
          toast({
            title: "",
            status: "success",
            description: "Update hotel successfully !",
          });
        }
        return;
      }

      const response = await roomApiRequest.createRoom(formData);
      if (response.status === "success") {
        setSuccess(true);
      }
    } catch (error) {}
  };
  const handleDeleteRoom = async () => {
    if (!roomEdit) return;
    try {
      const response = await roomApiRequest.deleteRoom({
        roomId: roomEdit.id,
        oldImageUrls: JSON.stringify(roomEdit.images),
      });
      if (response.status === "success") {
        toast({
          title: "",
          status: "success",
          description: "Delete room successfully !",
        });
        setIsDeleted(true);
      } else {
        toast({
          title: "",
          status: "error",
          description: "Delete room failed !",
        });
      }
    } catch (error) {}
  };
  return (
    <div className={`relative border-gray-300 border-[1px] rounded-md`}>
      {success && (
        <div className="absolute z-[10] bg-blue-100/70 rounded-md  top-0 right-0 left-0 bottom-0 flex items-center justify-center">
          <p className="text-xl font-bold text-primary-color">
            Room added successfully.
          </p>
        </div>
      )}
      {isDeleted && (
        <div className="absolute z-[10] bg-red-100/70 rounded-md  top-0 right-0 left-0 bottom-0 flex items-center justify-center">
          <p className="text-xl font-bold text-red-500">
            Room has been deleted.
          </p>
        </div>
      )}
      <div className="px-4 py-2 border-b-[1px] border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full gap-2">
            <p
              className={`${
                error.includes("name") && "text-red-500"
              } font-bold text-sm `}
            >
              Name:
            </p>
            <input
              value={name}
              onChange={(e) => {
                setError([]);
                setName(e.target.value);
              }}
              className={`${
                error.includes("name") ? "bg-red-50 border-red-300" : ""
              } px-3 w-[35%] py-2 border-[1px] text-gray-700 rounded-md text-sm font-bold outline-none`}
            ></input>
          </div>
          <div
            onClick={() => {
              if (onDeleteForm) {
                onDeleteForm();
              }
            }}
            className="cursor-pointer flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </div>
        </div>
        {error.includes("name") && (
          <p className="text-xs ml-14 mt-1 font-bold text-red-500">
            Please enter name for your room.
          </p>
        )}
      </div>
      <div className="px-4 py-4">
        <div className="flex">
          <div ref={areaRef}></div>
          <div className="basis-[50%] flex gap-4 items-center">
            <div className="basis-[50%]">
              <p
                className={`${
                  error.includes("area") && "text-red-500"
                } font-bold text-sm `}
              >
                Area(m2):
              </p>
              <input
                type="number"
                value={area}
                onChange={(e) => {
                  setError([]);
                  setArea(Number(e.target.value));
                }}
                className={`${
                  error.includes("area") ? "bg-red-50 border-red-300" : ""
                } px-3 w-[70%] mt-1 py-2 border-[1px] text-gray-700 rounded-md text-sm font-bold outline-none`}
              ></input>
            </div>
            <div className="basis-[50%]">
              <div className="flex items-center mt-4 space-x-2">
                <Checkbox
                  id="terms"
                  checked={isSmoking}
                  onCheckedChange={() => {
                    setError([]);
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
                          setError([]);
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
          <p
            className={`font-bold text-sm ${
              error.includes("files") && "text-red-500"
            } `}
          >
            Images:
          </p>
          <p
            className={`text-sm italic ${
              error.includes("files") && "text-red-500"
            }`}
          >
            * 3 images is required
          </p>
          <div className="px-4 py-2 mt-2 bg-gray-50  rounded-lg h-[180px] max-w-[100%] flex gap-4 items-center  overflow-x-auto">
            <div
              onClick={() => {
                if (imagesRef.current) {
                  setError([]);
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
            {preview &&
              preview.map((el, idx) => {
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
                setError([]);
                const fileListAsArray = Array.from(e.target.files);
                setFiles((prev) => [...prev, ...fileListAsArray]);
              }
            }}
          ></input>
        </div>
        <div className="mt-6 border-t-[1px] pt-4">
          <p
            className={`font-bold text-sm ${
              error.includes("roomOpt") && "text-red-500"
            }`}
          >
            Room options:
          </p>
          <p
            className={` text-sm italic ${
              error.includes("roomOpt") && "text-red-500"
            }`}
          >
            * At least 1 room options
          </p>
          <div
            onClick={() => {
              setError([]);
            }}
            className=""
          >
            {roomOpts &&
              roomOpts.map((el, idx) => {
                return (
                  <RoomOptItem
                    key={el.id}
                    id={el.id}
                    iniRoom={roomOpts[idx]}
                    roomOpts={roomOpts}
                    setRoomOpts={setRoomOpts}
                  />
                );
              })}
          </div>
          <Button
            onClick={() => {
              const newItem = {
                id: uuidv4(),
                numberOfGuest: 0,
                name: "",
                bed: "",
                isRefundable: false,
                roomLeft: 0,
                originalPrice: 0,
                price: 0,
                saved: false,
              };
              setRoomOpts((prev) => {
                if (prev) {
                  return [...prev, newItem];
                }
                return [newItem];
              });
            }}
            className="mt-2 bg-white border-primary-color border-[1px] transition-all text-primary-color  hover:bg-white font-bold"
          >
            Add room option
          </Button>
        </div>
        <div className="mt-3 gap-2 flex justify-end">
          {!isAddedForm && (
            <Button
              onClick={() => {
                setDeleteRoomDialog(true);
              }}
              className=" bg-red-500 transition-all hover:bg-red-600  font-bold"
            >
              Delete this room
            </Button>
          )}
          <Button
            onClick={() => {
              setAddRoomDialog(true);
            }}
            className=" bg-primary-color transition-all hover:bg-blue-600  font-bold"
          >
            {isAddedForm ? "Add this room" : "Update this room"}
          </Button>
        </div>
      </div>
      {deleteRoomDialog && (
        <Dialog
          onClose={() => {
            setDeleteRoomDialog(false);
          }}
          onYes={() => {
            handleDeleteRoom();
            setDeleteRoomDialog(false);
          }}
          buttonContent={"Yes"}
          message={`Are you sure want to delete this room.`}
          content={`Your room will be deleted, you cannot undo this action !!`}
        />
      )}
      {addRoomDialog && (
        <Dialog
          onClose={() => {
            setAddRoomDialog(false);
          }}
          onYes={() => {
            handleAddRoom();
            setAddRoomDialog(false);
          }}
          buttonContent={"Yes"}
          message={`Are you sure want to ${
            isAddedForm ? "add" : "update"
          } this room.`}
          content={`Your room will be ${
            isAddedForm ? "added to your hotel" : "updated"
          }, you cannot undo this action !!`}
        />
      )}
    </div>
  );
}
