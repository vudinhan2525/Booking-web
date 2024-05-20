import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { facilitiesRoom } from "@/utils/facilities";
import {
  faBanSmoking,
  faBed,
  faRulerCombined,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function RoomList() {
  return (
    <div className="mt-4">
      <header className="text-xl font-bold">
        Available Room Types in Seashore Hotel & Apartment
      </header>
      <div className="px-4 mt-2 py-4 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-bold">Superior Twin</h2>
        <div className="flex gap-4 mt-2">
          <div className="basis-[30%] group">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="w-full rounded-xl overflow-hidden h-[200px] relative">
                    <Image
                      alt="img"
                      fill
                      priority
                      sizes="100%"
                      quality={60}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="w-full rounded-xl overflow-hidden h-[200px] relative">
                    <Image
                      alt="img"
                      fill
                      priority
                      sizes="100%"
                      quality={60}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="w-full  rounded-xl overflow-hidden h-[200px] relative">
                    <Image
                      alt="img"
                      fill
                      priority
                      sizes="100%"
                      quality={60}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      src="https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                    />
                  </div>
                </CarouselItem>
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
                <p className="text-sm ml-[2px]">32.0 m²</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div>
                  <FontAwesomeIcon
                    icon={faBanSmoking}
                    className="text-primary-color text-lg"
                  />
                </div>
                <p className="text-sm">Non-smoking</p>
              </div>
              <div className="grid grid-cols-2">
                {facilitiesRoom.map((el, idx) => {
                  return (
                    <div key={idx} className="flex items-center gap-2 mt-2">
                      <div>{el.icon}</div>
                      <p className="text-sm ml-[2px]">{el.title}</p>
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
            <div className="flex border-[1px]">
              <div className="basis-[45%] px-3 py-3 border-l-[1px]">
                <p className="text-xs text-gray-600">Superior Twin.</p>
                <p className="text-sm font-bold my-2">
                  Breakfast included for 2 pax
                </p>
                <p className="text-sm text-gray-600 mb-2 font-light">
                  Non-refundable
                </p>
                <div className="flex items-center gap-2">
                  <div>
                    <FontAwesomeIcon icon={faBed} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600">2 Twin Bed</p>
                </div>
              </div>
              <div className="basis-[15%] px-3 py-3 flex flex-wrap border-l-[1px] items-center justify-center gap-1 text-gray-600">
                <div>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
              <div className="basis-[30%] px-3 py-3 border-l-[1px] text-end ">
                <p className="line-through text-sm text-gray-500 mt-6">
                  4.486.111 VNĐ
                </p>
                <div className="text-orange-600 font-bold text-lg">
                  574.234 VNĐ
                </div>
                <p className="text-xs text-gray-500">Exclude taxes & fees</p>
              </div>
              <div className="basis-[20%] px-3  py-3 border-l-[1px]">
                <div className="px-6 text-center cursor-pointer hover:bg-orange-700 transition-all py-2 rounded-lg text-sm font-bold bg-orange-600 text-white ">
                  Choose
                </div>
                <p className="text-xs text-orange-600  mt-1">
                  Only 4 room(s) available
                </p>
              </div>
            </div>
            <div className="flex border-[1px]">
              <div className="basis-[45%] px-3 py-3 border-l-[1px]">
                <p className="text-xs text-gray-600">Superior Twin.</p>
                <p className="text-sm font-bold my-2">
                  Breakfast included for 2 pax
                </p>
                <p className="text-sm text-gray-600 mb-2 font-light">
                  Non-refundable
                </p>
                <div className="flex items-center gap-2">
                  <div>
                    <FontAwesomeIcon icon={faBed} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600">2 Twin Bed</p>
                </div>
              </div>
              <div className="basis-[15%] px-3 py-3 flex flex-wrap border-l-[1px] items-center justify-center gap-1 text-gray-600">
                <div>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
              <div className="basis-[30%] px-3 py-3 border-l-[1px] text-end ">
                <p className="line-through text-sm text-gray-500 mt-6">
                  4.486.111 VNĐ
                </p>
                <div className="text-orange-600 font-bold text-lg">
                  854.600 VNĐ
                </div>
                <p className="text-xs text-gray-500">Exclude taxes & fees</p>
              </div>
              <div className="basis-[20%] px-3  py-3 border-l-[1px]">
                <div className="px-6 text-center cursor-pointer hover:bg-orange-700 transition-all py-2 rounded-lg text-sm font-bold bg-orange-600 text-white ">
                  Choose
                </div>
                <p className="text-xs text-orange-600  mt-1">
                  Only 4 room(s) available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
