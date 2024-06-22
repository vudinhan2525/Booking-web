"use client";

import hotelApiRequest from "@/apiRequest/hotel";
import PaginationCustom from "@/components/component/Pagination/PaginationCustom";
import { IHotel } from "@/interfaces/IHotel";
import { destinationsMap } from "@/lib/dataHotel";
import { formatNumber, getCurrentDateFormatted } from "@/utils/convertTime";
import { delay } from "@/utils/delay";
import {
  faCircleNotch,
  faPaperPlane,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MostPopularHotel() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage]);
  const getHotels = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    const response = await hotelApiRequest.getHotels(
      {
        long: 0,
        lat: 0,
        filter: {
          accomodation: "Hotels",
          facilities: "",
          priceMax: 10000000,
          priceMin: 0,
          rating: "",
          sortBy: "",
        },
      },
      `?page=${curPage}&limit=4`
    );
    if (response.status === "success") {
      setHotels(response.data);
      setTotalPages(Math.ceil(response.totalCount / 4));
    }
    try {
    } catch (error) {}
    setIsLoading(false);
  };
  ///hotels/detail?hotelId=5&departureTime=2024-06-22&duration=1&numberPassenger=1-0-1
  return (
    <div className="py-16 flex items-center flex-col px-24">
      <div className="flex gap-2 ">
        <p className="text-4xl font-bold text-primary-color">Popular</p>
        <p className="text-4xl font-bold text-gray-700">
          Accomodations Near You
        </p>
      </div>
      <p className="text-gray-700 mt-4 mb-8">
        Explore a range of popular accomodations near you. Comfort place for a
        memorable stay!
      </p>
      {isLoading && (
        <div className="w-full flex items-center justify-center min-h-[275px] mt-20">
          <div className="flex items-center justify-center">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin={true}
              className="text-[40px] text-gray-400"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="flex gap-4 w-full">
          {hotels &&
            hotels.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    router.push(
                      `/hotels/detail?hotelId=${
                        el.id
                      }&departureTime=${getCurrentDateFormatted()}&duration=1&numberPassenger=1-0-1`
                    );
                  }}
                  className="cursor-pointer hover:scale-[1.02] transition-all basis-[25%]"
                >
                  <div className="w-full px-4 py-4 rounded-lg border-[1px]">
                    <div className="relative w-full rounded-lg overflow-hidden h-[220px]">
                      <Image
                        src={
                          el.images[0]
                            ? el.images[0]
                            : "https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg"
                        }
                        alt="bg"
                        quality={100}
                        fill
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                        className="select-none"
                      />
                    </div>
                    <p className="mt-3 text-lg font-bold line-clamp-1">
                      {el.name}
                    </p>
                    <div className="flex justify-between mt-1 items-center">
                      <div className="flex justify-center gap-2 items-center">
                        <div>
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="text-sm text-primary-color"
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          {destinationsMap.get(el.location).title}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-sm text-yellow-400"
                          />
                        </div>
                        <p className="text-xs mt-[2px] text-gray-600">
                          {el.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-1 items-center">
                      <p className="text-orange-600 font-bold text-lg">
                        {formatNumber(el?.rooms[0]?.roomOpts[0].price)}
                      </p>
                      <p className="text-xs text-gray-600">VNĐ</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <PaginationCustom
        totalPages={totalPages}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </div>
  );
}
