"use client";
import Image from "next/image";
import { UserIcon } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAdminContext } from "@/app/(adminApp)/admin/AdminProvider";
import NotificationMenu from "./NotificationMenu";
import notiApiRequest from "@/apiRequest/notifications";
import { INoti } from "@/interfaces/INoti";
export default function Header({ fromAdminPage }: { fromAdminPage?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [onTop, setOnTop] = useState(false);
  const [notifications, setNotifications] = useState<INoti[]>([]);
  const debounce = useDebounce(onTop, 500);
  const { isAuthenticated, user, setShowLoginModal } = useAppContext();
  const { isAdminAuthenticated, admin } = useAdminContext();
  useEffect(() => {
    function handleScroll() {
      if (pathname === "/") {
        setOnTop(window.scrollY === 0);
      }
    }
    if (pathname === "/") {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
    // Add event listener when the component mounts
    if (pathname === "/") window.addEventListener("scroll", handleScroll);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  useEffect(() => {
    getNotifications();
  }, [user]);
  const getNotifications = async () => {
    if (!isAuthenticated || !user) return;
    try {
      const response = await notiApiRequest.getNoti({ userId: user.id });
      if (response.status === "success") {
        setNotifications(response.data);
      }
    } catch (error) {}
  };
  return (
    <div
      className={`${!onTop && "bg-white"} transition-all pb-2 px-24 z-20 ${
        pathname !== "/flights/search" &&
        pathname !== "/hotels/detail" &&
        pathname !== "/hotels/search" &&
        "fixed"
      } top-0 left-0 pt-2 right-0 ${pathname === "/user" && "border-b-[1px]"} ${
        isAdminAuthenticated && "border-b-[1px]"
      }`}
    >
      <div className="absolute z-[100] right-0"></div>
      <div className="flex items-center justify-between ">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="flex cursor-pointer justify-center items-center"
        >
          <Image
            alt="logo"
            src={"/logo.png"}
            priority={true}
            width={80}
            height="0"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="flex select-none ml-[-10px]">
            <p className="text-[#31AE84] text-2xl font-bold">Sun</p>
            <p className="text-[#14B0C4] text-2xl font-bold">Travel</p>
          </div>
        </div>
        {!fromAdminPage && (
          <div className={`flex gap-2`}>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginModal(true);
                    return;
                  }
                  router.push("/user?slt=2");
                }}
                variant={onTop ? "transparent" : "outline"}
                className={`${
                  onTop
                    ? "text-white hover:bg-black/30"
                    : "text-gray-600 hover:text-gray-600 border-[0px]"
                } text-[15px] font-bold `}
              >
                Saved
              </Button>
              <Button
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginModal(true);
                    return;
                  }
                  router.push("/user?slt=1");
                }}
                variant={onTop ? "transparent" : "outline"}
                className={`${
                  onTop
                    ? "text-white hover:bg-black/30"
                    : "text-gray-600 hover:text-gray-600 border-[0px]"
                } text-[15px] font-bold `}
              >
                My Bookings
              </Button>
            </div>
            <div className={`flex gap-2`}>
              {!isAuthenticated && (
                <div className="flex gap-2">
                  <CustomButton
                    showLoginModal={true}
                    variant={onTop ? "transparent" : "outline"}
                    className={`${
                      onTop
                        ? "text-white border-[1px] border-white"
                        : "hover:text-primary-color text-primary-color border-primary-color "
                    } flex justify-center items-center gap-1 text-[15px] `}
                  >
                    <UserIcon width="18px" height="18px"></UserIcon>
                    <p className="">Log In</p>
                  </CustomButton>
                  <CustomButton
                    showRegisterModal={true}
                    variant={"outline"}
                    className="text-[15px] border-primary-color text-white bg-primary-color hover:bg-primary-color hover:text-white hover:bg-opacity-80"
                  >
                    Register
                  </CustomButton>
                </div>
              )}
              {isAuthenticated && user && (
                <NotificationMenu
                  onTop={onTop}
                  user={user}
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              )}
              {isAuthenticated && user && (
                <Button
                  onClick={() => {
                    router.push("/user?slt=0");
                  }}
                  variant={onTop ? "transparent" : "outline"}
                  className={`${
                    onTop
                      ? "text-white hover:bg-black/30"
                      : "text-gray-600 hover:text-gray-600 border-[0px]"
                  } text-[15px] font-bold flex items-center gap-2`}
                >
                  <div className="mb-[2px] border-r-[1px] pr-2 border-gray-400">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                  </div>
                  <p>{user.firstName + " " + user.lastName}</p>
                </Button>
              )}
              {isAuthenticated && (
                <CustomButton
                  variant={"outline"}
                  buttonLogout={true}
                  className="text-[15px] font-bold text-gray-600 hover:text-gray-600 border-[0px]"
                >
                  Log out
                </CustomButton>
              )}
            </div>
          </div>
        )}
        {fromAdminPage && (
          <div className="flex gap-2">
            {!isAdminAuthenticated && (
              <div className="flex gap-2">
                <CustomButton
                  showLoginModal={true}
                  variant={onTop ? "transparent" : "outline"}
                  className={`${
                    onTop
                      ? "text-white border-[1px] border-white"
                      : "hover:text-primary-color text-primary-color border-primary-color "
                  } flex justify-center items-center gap-1 text-[15px] `}
                >
                  <UserIcon width="18px" height="18px"></UserIcon>
                  <p className="">Log In</p>
                </CustomButton>
                <CustomButton
                  showRegisterModal={true}
                  variant={"outline"}
                  className="text-[15px] border-primary-color text-white bg-primary-color hover:bg-primary-color hover:text-white hover:bg-opacity-80"
                >
                  Register
                </CustomButton>
              </div>
            )}
            {isAdminAuthenticated && admin && (
              <Button
                onClick={() => {
                  router.push("/user");
                }}
                variant={onTop ? "transparent" : "outline"}
                className={`${
                  onTop
                    ? "text-white hover:bg-black/30"
                    : "text-gray-600 hover:text-gray-600 border-[0px]"
                } text-[15px] font-bold flex items-center gap-2`}
              >
                <div className="mb-[2px] border-r-[1px] pr-2 border-gray-400">
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <p>{admin.firstName + " " + admin.lastName}</p>
              </Button>
            )}
            {isAdminAuthenticated && (
              <CustomButton
                variant={"outline"}
                buttonLogout={true}
                className="text-[15px] font-bold text-gray-600 hover:text-gray-600 border-[0px]"
              >
                Log out
              </CustomButton>
            )}
          </div>
        )}
      </div>
      {!isAdminAuthenticated && (
        <div className="mt-2 flex gap-2">
          <Button
            onClick={() => {
              router.push("/hotels");
            }}
            variant={onTop ? "transparent" : "outline"}
            className={`${
              onTop
                ? "text-white hover:bg-black/30"
                : "text-gray-600 hover:text-gray-600 border-[0px]"
            } text-[15px] font-bold `}
          >
            Hotels
          </Button>
          <Button
            onClick={() => {
              router.push("/flights");
            }}
            variant={onTop ? "transparent" : "outline"}
            className={`${
              onTop
                ? "text-white hover:bg-black/30"
                : "text-gray-600 hover:text-gray-600 border-[0px]"
            } text-[15px] font-bold `}
          >
            Flights
          </Button>
          <Button
            variant={onTop ? "transparent" : "outline"}
            className={`${
              onTop
                ? "text-white hover:bg-black/30"
                : "text-gray-600 hover:text-gray-600 border-[0px]"
            } text-[15px] font-bold `}
          >
            Car Rentals
          </Button>
        </div>
      )}
    </div>
  );
}
