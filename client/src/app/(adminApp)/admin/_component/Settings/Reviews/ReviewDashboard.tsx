"use client";
import { useEffect, useState } from "react";
import { useAdminContext } from "../../../AdminProvider";
import { IReview } from "@/interfaces/IReview";
import reviewApiRequest from "@/apiRequest/review";
import Image from "next/image";
import { toDayMonthYear } from "@/utils/convertTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewDashboard() {
  const { admin } = useAdminContext();
  const [reviews, setReviews] = useState<IReview[]>([]);
  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getReviews = async () => {
    if (!admin) return;
    try {
      const response = await reviewApiRequest.getReviewsForAdmin({
        adminId: admin.id,
      });
      if (response.status === "success") {
        console.log(response.data);
        setReviews(response.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <header className="text-3xl font-bold">Reviews</header>
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
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        src="https://shopcartimg2.blob.core.windows.net/shopcartctn/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                      />
                    </div>
                    <p className="font-bold text-lg">
                      {el.user.firstName + " " + el.user.lastName}
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
                  <div className="px-4 py-4 bg-gray-100 rounded-lg mt-4">
                    <p className="text-blue-700 font-bold">
                      Accomodation&apos;s reply
                    </p>
                    <p className="text-sm font-bold text-gray-700 mt-1">
                      21 Jan, 2024
                    </p>
                    <p className="text-sm mt-2">
                      Dear Dey Maputra! Greetings from seashore hotel-APARTMENT.
                      Thank you for sharing your experience during your recent
                      stay with us and for recommending us to people. Nothing
                      gives us more pleasure knowing that you have had an
                      enjoyable experience. We are very much overwhelmed by your
                      kind words. It would be nice to be able to welcome you
                      back again in our hotel in the near future. Seashore team.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
