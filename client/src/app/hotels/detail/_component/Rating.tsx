import { Progress } from "@/components/ui/progress";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function Rating() {
  //https://shopcartimg2.blob.core.windows.net/shopcartctn/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg
  return (
    <div className="bg-white px-4 py-4 mt-8 rounded-lg">
      <header className="text-2xl font-bold">Overall Rating & Reviews</header>
      <div className="flex gap-4 mt-4">
        <div className="basis-[25%]">
          <div className="flex items-center border-r-[1px] flex-col mt-4">
            <h2 className="text-xl font-bold">Overall score</h2>
            <div className="flex items-end mt-2">
              <p className="text-4xl font-bold">4.2</p>
              <p className="">/5</p>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((el, idx) => {
                return (
                  <div key={idx}>
                    <FontAwesomeIcon icon={faStar} className="text-[#FFDC00]" />
                  </div>
                );
              })}
            </div>
            <div className="text-sm px-3 py-2 rounded-full bg-gray-200 mt-2 font-semibold">
              Based on 125 reviews
            </div>
          </div>
        </div>
        <div className="basis-[65%]">
          <div className="flex px-6 items-center my-2">
            <p className="min-w-[13%]">Fantastic</p>
            <div className="w-[60%] ml-[30px]">
              <Progress value={72} />
            </div>
            <p className="text-sm font-bold ml-[15px]">5 Star</p>
          </div>
          <div className="flex px-6 items-center my-3">
            <p className="min-w-[13%]">Very Good</p>
            <div className="w-[60%] ml-[30px]">
              <Progress value={54} />
            </div>
            <p className="text-sm font-bold ml-[15px]">4 Star</p>
          </div>
          <div className="flex px-6 items-center my-3">
            <p className="min-w-[13%]">Satisfying</p>
            <div className="w-[60%] ml-[30px]">
              <Progress value={32} />
            </div>
            <p className="text-sm font-bold ml-[15px]">3 Star</p>
          </div>
          <div className="flex px-6 items-center my-3">
            <p className="min-w-[13%]">Average</p>
            <div className="w-[60%] ml-[30px]">
              <Progress value={5} />
            </div>
            <p className="text-sm font-bold ml-[15px]">2 Star</p>
          </div>
          <div className="flex px-6 items-center my-3">
            <p className="min-w-[13%]">Poor</p>
            <div className="w-[60%] ml-[30px]">
              <Progress value={0} />
            </div>
            <p className="text-sm font-bold ml-[15px]">1 Star</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 rounded-lg border-[1px] flex">
        <div className="basis-[30%]">
          <div className="flex items-center gap-4">
            <div className="w-[70px] border-[2px] relative h-[70px] rounded-full overflow-hidden">
              <Image
                alt="img"
                fill
                priority
                sizes="100%"
                quality={60}
                style={{ objectFit: "cover", objectPosition: "center" }}
                src="https://shopcartimg2.blob.core.windows.net/shopcartctn/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              />
            </div>
            <p className="font-bold text-lg">Anh Khoa Pham</p>
          </div>
        </div>
        <div className="basis-[70%]">
          <div className="flex justify-between">
            <div className="flex gap-[2px] items-end">
              {[1, 2, 3, 4, 5].map((el, idx) => {
                return (
                  <div key={idx}>
                    <FontAwesomeIcon icon={faStar} className="text-[#FFDC00]" />
                  </div>
                );
              })}
              <p className="text-sm ml-2">4.2/5</p>
            </div>
            <div className="text-sm text-gray-700">29 Dec 2023</div>
          </div>
          <p className="text-sm mt-2">
            The room was very clean, all the staff were very friendly and
            helpful. The breakfast buffet was so good especially the mixed
            berries yogurt. You can also rent a motorbike at the hotel.
          </p>
          <div className="flex gap-2 mt-4">
            <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden">
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
            <div className="w-[100px] h-[100px] relative rounded-lg overflow-hidden">
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
          </div>
          <div className="px-4 py-4 bg-gray-100 rounded-lg mt-4">
            <p className="text-blue-700 font-bold">Accomodation&apos;s reply</p>
            <p className="text-sm font-bold text-gray-700 mt-1">21 Jan, 2024</p>
            <p className="text-sm mt-2">
              Dear Dey Maputra! Greetings from seashore hotel-APARTMENT. Thank
              you for sharing your experience during your recent stay with us
              and for recommending us to people. Nothing gives us more pleasure
              knowing that you have had an enjoyable experience. We are very
              much overwhelmed by your kind words. It would be nice to be able
              to welcome you back again in our hotel in the near future.
              Seashore team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
