import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SheetTrigger } from "@/components/ui/sheet";
import { IHotel } from "@/interfaces/IHotel";
import { RefundableIcon } from "@/lib/icon";
import { formatNumber } from "@/utils/convertTime";
import { facilitiesRoom, facilitiesRoomMap } from "@/utils/facilities";
import {
  faBanSmoking,
  faBed,
  faRulerCombined,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function RoomList({
  hotel,
  setRoomSelected,
  setRoomOptSelected,
}: {
  hotel: IHotel;
  setRoomSelected: React.Dispatch<React.SetStateAction<number>>;
  setRoomOptSelected: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="mt-4">
      <header className="text-xl font-bold">
        Available Room Types in Seashore Hotel & Apartment
      </header>
      {hotel.rooms.map((room, idx) => {
        return (
          <div
            key={idx}
            className="px-4 mt-2 py-4 bg-white rounded-md shadow-md"
          >
            <h2 className="text-lg font-bold">{room.name}</h2>
            <div className="flex gap-4 mt-2">
              <div className="basis-[30%] group">
                <Carousel>
                  <CarouselContent>
                    {room.images.map((el, idx2) => {
                      return (
                        <CarouselItem key={idx2}>
                          <div className="w-full rounded-xl overflow-hidden h-[200px] relative">
                            <Image
                              alt="img"
                              fill
                              priority
                              sizes="100%"
                              quality={60}
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              src={el}
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="left-0 transition-all group-hover:inline-flex hidden" />
                  <CarouselNext className="right-0 transition-all group-hover:inline-flex hidden" />
                </Carousel>
                <div className="px-2 py-4">
                  <div className="flex items-center gap-2 mt-2">
                    <div>
                      <FontAwesomeIcon
                        icon={faRulerCombined}
                        className="text-primary-color"
                      />
                    </div>
                    <p className="text-sm ml-[2px]">{`${room.area}.0 m²`}</p>
                  </div>
                  {room.isSmoking === false && (
                    <div className="flex items-center gap-2 mt-2">
                      <div>
                        <FontAwesomeIcon
                          icon={faBanSmoking}
                          className="text-primary-color text-lg"
                        />
                      </div>
                      <p className="text-sm">Non-smoking</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2">
                    {room.facilitiesRoom.split(",").map((el, idx) => {
                      return (
                        <div key={idx} className="flex items-center gap-2 mt-2">
                          <div>{facilitiesRoomMap.get(el)?.icon}</div>
                          <p className="text-sm ml-[2px]">{el}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="basis-[70%]">
                <div className="flex  rounded-t-[8px] bg-[#F7F9FA] border-[1px]">
                  <div className="basis-[45%] px-3 py-3 border-l-[1px] text-[15px] font-bold">
                    Room Option(s)
                  </div>
                  <div className="basis-[15%] px-3 py-3 border-l-[1px] text-[15px] font-bold">
                    Guest(s)
                  </div>
                  <div className="basis-[30%] px-3 py-3 border-l-[1px] text-end text-[15px] font-bold">
                    Price/room/night
                  </div>
                  <div className="basis-[20%] px-3 py-3 border-l-[1px]"></div>
                </div>
                {room.roomOpts.map((roomOpt, id) => {
                  return (
                    <div key={id} className="flex border-[1px]">
                      <div className="basis-[45%] px-3 py-3 border-l-[1px]">
                        <p className="text-xs text-gray-600">{room.name}</p>
                        <p className="text-sm font-bold my-2">{roomOpt.name}</p>
                        <div className="text-sm text-gray-600 mb-2 font-light">
                          {roomOpt.isRefundable ? (
                            <div className="flex items-end gap-1">
                              <RefundableIcon width="18px" height="18px" />
                              <p className="text-xs font-bold text-[#05A569]">
                                Refundable
                              </p>
                            </div>
                          ) : (
                            "Non-refundable"
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <FontAwesomeIcon
                              icon={faBed}
                              className="text-gray-600"
                            />
                          </div>
                          <p className="text-xs text-gray-600">{roomOpt.bed}</p>
                        </div>
                      </div>
                      <div className="basis-[15%] px-3 py-3 flex flex-wrap border-l-[1px] items-center justify-center gap-1 text-gray-600">
                        {[...Array(roomOpt.numberOfGuest)].map((x, i) => {
                          return (
                            <div key={i}>
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                          );
                        })}
                      </div>
                      <div className="basis-[30%] px-3 py-3 border-l-[1px] text-end ">
                        <p className="line-through text-sm text-gray-500 mt-6">
                          {`${formatNumber(roomOpt.originalPrice)} VNĐ`}
                        </p>
                        <div className="text-orange-600 font-bold text-lg">
                          {`${formatNumber(roomOpt.price)} VNĐ`}
                        </div>
                        <p className="text-xs text-gray-500">
                          Exclude taxes & fees
                        </p>
                      </div>
                      <div className="basis-[20%] px-3  py-3 border-l-[1px]">
                        <SheetTrigger
                          onClick={() => {
                            setRoomOptSelected(id);
                            setRoomSelected(idx);
                          }}
                        >
                          <div className="px-6 mt-4 text-center cursor-pointer hover:bg-orange-700 transition-all py-2 rounded-lg text-sm font-bold bg-orange-600 text-white ">
                            Choose
                          </div>
                        </SheetTrigger>

                        <p className="text-xs text-orange-600  mt-1">
                          {roomOpt.roomLeft < 10
                            ? `Only ${roomOpt.roomLeft} room(s) available`
                            : `${roomOpt.roomLeft} room(s) available`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
