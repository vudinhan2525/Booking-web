"use client";
import couponApiRequest from "@/apiRequest/coupon";
import { ICoupon } from "@/interfaces/ICoupon";
import { formatNumber } from "@/utils/convertTime";
import {
  faChevronDown,
  faChevronUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function Coupon({
  paymentPrice,
  userId,
  setDiscountPrice,
}: {
  paymentPrice: number;
  userId: number;
  setDiscountPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [showCoupon, setShowCoupon] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [couponSlt, setCouponSlt] = useState(-1);
  const getCoupon = async () => {
    try {
      const response = await couponApiRequest.getCoupon({ userId: userId });
      if (response.status === "success") {
        setCoupons(response.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (couponSlt > -1 && coupons[couponSlt]) {
      if (coupons[couponSlt].price) {
        setDiscountPrice(coupons[couponSlt].price as number);
      }
      if (coupons[couponSlt].percent) {
        setDiscountPrice(
          (paymentPrice * (coupons[couponSlt].percent as number)) / 100
        );
      }
    } else {
      setDiscountPrice(0);
    }
  }, [couponSlt, coupons]);
  return (
    <div className="mt-2">
      <header className="text-xl  text-black font-bold">Coupons</header>
      <div className="flex mt-2 gap-4 items-center ">
        <input className="outline-none w-[60%] px-4 py-3 border-gray-300 text-sm font-bold border-[1px] rounded-md"></input>
        <div className="px-4 rounded-md cursor-pointer hover:bg-green-700 transition-all py-3 text-sm font-bold text-white bg-green-600">
          Apply coupon
        </div>
      </div>
      <p className="text-sm font-semibold mt-2 text-gray-400">
        Available coupon for you
      </p>
      {showCoupon && (
        <div className="mt-2 flex flex-col gap-2 animate-fadeIn">
          {coupons.map((el, idx) => {
            return (
              <div key={idx} className="flex items-center gap-2">
                <div
                  onClick={() => {
                    if (couponSlt === idx) {
                      setCouponSlt(-1);
                      return;
                    }
                    setCouponSlt(idx);
                  }}
                  className={`${
                    couponSlt === idx && "border-green-600 bg-green-50"
                  } px-4 py-2 w-[70%] transition-all relative rounded-md border-[1px] cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">Code:</p>
                    <p className="text-sm font-semibold text-gray-500">
                      {el.code}
                    </p>
                  </div>
                  {el.price && (
                    <div className="text-sm font-medium">{`Reduce ${formatNumber(
                      el.price
                    )} for ${el.priceRequire} payment.`}</div>
                  )}
                  {el.percent && (
                    <div className="text-sm font-medium">{`Reduce ${el.percent}% for ${el.priceRequire} payment.`}</div>
                  )}
                  {el.priceRequire > paymentPrice && (
                    <div className="absolute flex items-center justify-end  top-0 right-0 left-0 bottom-0 rounded-md bg-gray-50/60"></div>
                  )}
                  {couponSlt === idx && (
                    <div className="absolute top-[5px] right-[10px]">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-500"
                      />
                    </div>
                  )}
                </div>
                {el.priceRequire > paymentPrice && (
                  <div className="text-sm font-bold text-orange-600">
                    Not available
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div
        onClick={() => {
          if (!showCoupon && !isFirstLoad) {
            getCoupon();
          }
          if (!isFirstLoad) {
            setIsFirstLoad(true);
          }
          setShowCoupon((prev) => !prev);
        }}
        className="border-[1px] cursor-pointer mt-2 border-orange-600 px-4 py-2 rounded-md inline-flex gap-2"
      >
        <div className="text-[13px] font-bold text-orange-600 ">
          Show coupon
        </div>
        <FontAwesomeIcon
          icon={!showCoupon ? faChevronDown : faChevronUp}
          className="text-orange-600 text-sm mt-[2px] transition-all"
        />
      </div>
    </div>
  );
}
