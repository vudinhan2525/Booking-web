"use client";
import couponApiRequest from "@/apiRequest/coupon";
import { useToast } from "@/components/ui/use-toast";
import { ICoupon } from "@/interfaces/ICoupon";
import { formatNumber } from "@/utils/convertTime";
import {
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faXmarkCircle,
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
  const { toast } = useToast();
  const [showCoupon, setShowCoupon] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [globalCoupons, setGlobalCoupons] = useState<ICoupon[]>([]);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [couponSlt, setCouponSlt] = useState(-1);
  const [couponInp, setCouponInt] = useState("");
  const getCoupon = async () => {
    try {
      const response = await couponApiRequest.getCoupon({ userId: userId });
      if (response.status === "success") {
        setCoupons(response.data);
      }
    } catch (error) {}
  };
  const checkCoupon = async () => {
    if (couponInp.trim() === "") return;
    let fl = 0;
    globalCoupons.forEach((el, id) => {
      if (el.code === couponInp.trim()) {
        toast({
          title: "",
          status: "error",
          description: "Coupon has been used.",
        });
        fl = 1;
      }
    });
    if (fl === 1) return;
    try {
      const response = await couponApiRequest.checkCoupon({
        couponId: couponInp,
        payment: paymentPrice,
      });
      if (response.status === "failed") {
        toast({
          title: "",
          status: "error",
          description: response.message,
        });
      } else if (response.status === "success") {
        toast({
          title: "",
          status: "success",
          description: "Coupon apply successfully!",
        });
        setGlobalCoupons((prev) => [...prev, response.data]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    let discount = 0;
    if (couponSlt > -1 && coupons[couponSlt]) {
      if (coupons[couponSlt].price) {
        discount = coupons[couponSlt].price as number;
      }
      if (coupons[couponSlt].percent) {
        discount =
          (paymentPrice * (coupons[couponSlt].percent as number)) / 100;
      }
    }
    globalCoupons.forEach((cp, idx) => {
      if (cp.price) {
        discount += cp.price as number;
      } else if (cp.percent) {
        discount += (paymentPrice * (cp.percent as number)) / 100;
      }
    });
    setDiscountPrice(discount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalCoupons, couponSlt, coupons]);
  return (
    <div className="mt-2">
      <header className="text-xl  text-black font-bold">Coupons</header>
      <div className="flex mt-2 gap-4 items-center ">
        <input
          value={couponInp}
          onChange={(e) => setCouponInt(e.target.value)}
          className={`border-gray-300 outline-none w-[60%] px-4 py-3 text-sm font-bold border-[1px] rounded-md`}
        ></input>
        <div
          onClick={() => {
            checkCoupon();
          }}
          className="px-4 rounded-md cursor-pointer hover:bg-green-700 transition-all py-3 text-sm font-bold text-white bg-green-600"
        >
          Apply coupon
        </div>
      </div>
      {globalCoupons && (
        <div className="flex flex-col gap-2 my-3">
          {globalCoupons.map((el, idx) => {
            return (
              <div key={idx} className="flex items-center gap-2">
                <div
                  onClick={() => {}}
                  className={` px-4 py-2 w-[70%] border-green-600 bg-green-50 transition-all relative rounded-md border-[1px] cursor-pointer`}
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
                  <div className="absolute top-[5px] right-[10px]">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-green-500"
                    />
                  </div>
                  <div
                    onClick={() => {
                      const newArr = globalCoupons.filter(
                        (el, id) => id !== idx
                      );
                      setGlobalCoupons(newArr);
                    }}
                    className="absolute bottom-[5px]  right-[10px]"
                  >
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="text-gray-400 hover:text-gray-500 transition-all"
                    />
                  </div>
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
