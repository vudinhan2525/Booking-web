"use client";
import { useEffect, useState } from "react";
import { useAdminContext } from "../../../AdminProvider";
import { IReview } from "@/interfaces/IReview";
import reviewApiRequest from "@/apiRequest/review";
import Image from "next/image";
import { convertTime4, toDayMonthYear } from "@/utils/convertTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCircleNotch,
  faMagnifyingGlass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ReplyFormModal from "./ReplyFormModal";
import ComboBox from "@/components/component/Search/ComboBox";

import hotelApiRequest from "@/apiRequest/hotel";
import { delay } from "@/utils/delay";
import { useToast } from "@/components/ui/use-toast";

export default function ReviewDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { admin } = useAdminContext();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [showFormReply, setShowFormReply] = useState(false);
  const [hotelSrc, setHotelSrc] = useState({ name: "All", hotelId: 0 });
  const [reviewSlt, setReviewSlt] = useState(0);
  const [replyTxt, setReplyTxt] = useState("");
  const { toast } = useToast();
  const [hotelData, setHotelData] = useState<
    { name: string; hotelId: number }[]
  >([{ name: "All", hotelId: 0 }]);
  useEffect(() => {
    getHotels();
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHotels = async () => {
    if (!admin) return;
    try {
      const response = await hotelApiRequest.getHotelFromAdmin({
        adminId: admin.id,
        accomodation: "Hotels",
        searchText: "",
      });
      if (response.status === "success") {
        const newArr = [{ name: "All", hotelId: 0 }];
        response.data.forEach((el: any, idx: any) => {
          newArr.push({ name: el.name, hotelId: el.id });
        });
        setHotelData(newArr);
      }
    } catch (error) {}
  };
  const getReviews = async () => {
    if (!admin) return;
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    try {
      const response = await reviewApiRequest.getReviewsForAdmin({
        adminId: admin.id,
        hotelId: hotelSrc.hotelId,
      });
      if (response.status === "success") {
        setReviews(response.data);
      }
    } catch (error) {}
    setIsLoading(false);
  };
  const getNameHotel = (hotelId: number) => {
    let str = "";
    hotelData.forEach((el, idx) => {
      if (el.hotelId === hotelId) {
        str = el.name;
      }
    });
    return str;
  };
  const handleReply = async () => {
    try {
      const response = await reviewApiRequest.replyReview({
        reviewId: reviews[reviewSlt].id,
        reply: replyTxt,
      });
      if (response.status === "success") {
        const newArr = [...reviews];
        newArr[reviewSlt] = response.data;
        setReviews(newArr);
        setShowFormReply(false);
        toast({
          title: "",
          status: "success",
          description: "Reply successfully !",
        });
      }
    } catch (error) {}
  };
  return (
    <div>
      <header className="text-3xl font-bold">Reviews</header>
      <div className="px-6 py-6 bg-white gap-6 rounded-md shadow-md mt-4 flex">
        <div className="basis-[50%]">
          <p className="font-bold text-gray-700 text-sm">
            Select reviews by hotel
          </p>
          <ComboBox
            isSeatList={true}
            isReviews={true}
            value={hotelSrc}
            frameworks={hotelData}
            setValue={setHotelSrc}
            child={
              <div className="relative mt-2 ">
                <div className="absolute top-[50%] left-[3%] text-gray-600 flex items-center justify-center translate-y-[-50%]">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="outline-none pr-4 pl-10 rounded-lg py-3 text-sm font-bold text-gray-700 w-full bg-gray-50">
                  {hotelSrc.name}
                </div>
                <div className="absolute top-[50%] translate-y-[-50%] right-[4%] text-gray-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            }
          />
        </div>
        <div className="">
          <p className="font-bold text-gray-700 text-sm">Search</p>
          <div
            onClick={() => {
              getReviews();
            }}
            className="flex justify-center items-center mt-2 cursor-pointer hover:bg-blue-600 transition-all gap-2 px-4 py-3 text-white bg-primary-color rounded-lg text-[15px]"
          >
            <div className=" text-gray-600 flex items-center justify-center ">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-white text-lg "
              />
            </div>
            <p className="font-bold">Search now</p>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-full mt-20">
          <div className="flex my-12 items-center justify-center">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin={true}
              className="text-[40px] text-gray-400"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col gap-3 mt-4">
          {reviews &&
            reviews.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className={`px-6 py-4 rounded-lg border-[1px] flex bg-white`}
                >
                  <div className="basis-[30%]">
                    <div className="flex items-center gap-4">
                      <div className="w-[70px] border-[2px] relative h-[70px] rounded-full overflow-hidden">
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
                          src="https://shopcartimg2.blob.core.windows.net/shopcartctn/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                        />
                      </div>
                      <p className="font-bold text-lg">
                        {el.user.firstName + " " + el.user.lastName}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-bold text-gray-600">
                        Review about
                      </p>
                      <p className="text-sm line-clamp-1 font-bold text-primary-color">
                        {getNameHotel(el.hotelId)}
                      </p>
                    </div>
                  </div>
                  <div className="basis-[70%]">
                    <div className="flex justify-between">
                      <div className="flex gap-[2px] items-end">
                        {[1, 2, 3, 4, 5].map((e, idx) => {
                          return (
                            <div key={idx}>
                              <FontAwesomeIcon
                                icon={faStar}
                                className={` ${
                                  e <= el.rating
                                    ? "text-[#FFDC00]"
                                    : "text-[#E5E7EB]"
                                } text-sm`}
                              />
                            </div>
                          );
                        })}
                        <p className="text-sm ml-2">{`${el.rating}/5`}</p>
                      </div>
                      <div className="text-sm text-gray-700">
                        {toDayMonthYear(el.dateRate)}
                      </div>
                    </div>
                    <p className="text-sm mt-2">{el.summary}</p>
                    <div className="flex gap-2 mt-4">
                      {el.imageUrls.map((image, id) => {
                        return (
                          <div
                            key={id}
                            className="w-[100px] h-[100px] relative rounded-lg overflow-hidden"
                          >
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
                              src={image}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {!el.reply && (
                      <div
                        onClick={() => {
                          setShowFormReply(true);
                          setReviewSlt(idx);
                        }}
                        className="px-4 py-2 border-[1px] border-primary-color inline-block rounded-md text-sm font-bold text-primary-color cursor-pointer hover:bg-gray-50 transition-all"
                      >
                        Reply
                      </div>
                    )}
                    {el.reply && el.replyDate && (
                      <div className="px-4 py-4 bg-gray-100 rounded-lg mt-4">
                        <p className="text-blue-700 font-bold">
                          Accomodation&apos;s reply
                        </p>
                        <p className="text-sm font-bold text-gray-700 mt-1">
                          {convertTime4(el.replyDate)}
                        </p>
                        <p className="text-sm mt-2">{el.reply}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          {reviews.length === 0 && (
            <div className="px-4 py-4 flex gap-8 bg-white mt-2 border-[1px] rounded-md">
              <div className="relative w-[180px] h-[130px]">
                <Image
                  alt="logo"
                  quality={100}
                  src="https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp"
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="">
                <header className="font-bold text-lg mt-4">
                  No result found
                </header>
                <p className=" max-w-[500px]">
                  Could not find aany review for this hotel. Change hotel search
                  to see all reviews about that hotel.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {showFormReply && (
        <ReplyFormModal
          setShowFormReply={setShowFormReply}
          replyTxt={replyTxt}
          handleReply={handleReply}
          setReplyTxt={setReplyTxt}
        />
      )}
    </div>
  );
}
