"use client";
import notiApiRequest from "@/apiRequest/notifications";
import { INoti } from "@/interfaces/INoti";
import { IUser } from "@/interfaces/IUser";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

export default function NotificationMenu({
  onTop,
  notifications,
  user,
  setNotifications,
}: {
  onTop: boolean;
  notifications: INoti[];
  user: IUser;
  setNotifications: Dispatch<SetStateAction<INoti[]>>;
}) {
  const [showNotis, setShowNotis] = useState(false);
  // if i useEffect and call req to get data here if it good when hover and it will call again ???
  const calcNoneRead = () => {
    let cnt = 0;
    for (let i = 0; i < notifications.length; i++) {
      if (!notifications[i].isRead) {
        cnt++;
      }
    }
    return cnt;
  };
  const handleReadThisNoti = async (notiId: number) => {
    if (user) {
      const response = await notiApiRequest.readNoti({
        userId: user.id,
        notiId,
      });
      if (response.status === "success") {
        setNotifications(response.data);
      }
    }
  };
  return (
    <div
      onMouseEnter={() => {
        setShowNotis(true);
      }}
      onMouseLeave={() => {
        setShowNotis(false);
      }}
      className="relative flex justify-center"
    >
      <div
        className={`${
          onTop ? "hover:bg-black/30" : "hover:bg-slate-100"
        } flex items-center px-3 py-2 rounded-sm relative  cursor-pointer transition-all justify-center`}
      >
        <FontAwesomeIcon
          icon={faBell}
          className={`${onTop ? "text-white" : "text-gray-600"} text-lg`}
        ></FontAwesomeIcon>
        <div className="px-2 flex items-center justify-center right-0 top-[5px]  absolute bg-red-600 rounded-full">
          <p className="text-[10px] mt-[1px] font-bold text-white">
            {calcNoneRead()}
          </p>
        </div>
      </div>
      {showNotis && (
        <div className="absolute top-[30px] animate-fadeIn w-[400px] h-[20px] bg-transparent"></div>
      )}
      {showNotis && (
        <div className="z-[22] absolute top-[50px] pb-3 border-[1px] rounded-md shadow-lg animate-fadeIn w-[400px]  bg-white">
          <header className="px-4 py-3 border-b-[1px] font-bold ">
            {`Notifications (${calcNoneRead()})`}
          </header>
          <div className="flex flex-col max-h-[400px] overflow-y-auto">
            {notifications.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (!el.isRead) {
                      handleReadThisNoti(el.id);
                    }
                  }}
                  className={`${
                    !el.isRead ? "bg-gray-50" : ""
                  } px-4 py-3 hover:bg-gray-200 cursor-pointer w-full flex gap-2`}
                >
                  <div className="relative min-w-[60px] h-[50px]">
                    <Image
                      alt="logo"
                      quality={100}
                      src={
                        el.image
                          ? el.image
                          : "https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp"
                      }
                      fill
                      sizes="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="">
                    <p className="text-sm font-bold line-clamp-1">
                      {el.header}
                    </p>
                    <p className="text-sm line-clamp-2">{el.content}</p>
                  </div>
                </div>
              );
            })}
            {/* {notifications.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className="px-4 py-3 hover:bg-gray-50 w-full flex gap-2"
                >
                  <div className="relative min-w-[60px] h-[50px]">
                    <Image
                      alt="logo"
                      quality={100}
                      src={
                        el.image
                          ? el.image
                          : "https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp"
                      }
                      fill
                      sizes="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="">
                    <p className="text-sm font-bold">{el.header}</p>
                    <p className="text-sm">{el.content}</p>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      )}
    </div>
  );
}
