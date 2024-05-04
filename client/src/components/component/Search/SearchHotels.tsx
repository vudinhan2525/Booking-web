import { Button } from "@/components/ui/button";
import {
  faCalendarDays,
  faLocationDot,
  faMoon,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchHotels() {
  return (
    <div className="animate-fadeIn py-4 mx-12 px-4">
      <p className="text-gray-200 mb-2 font-semibold">
        City, destination, or hotel name
      </p>
      <div className="flex gap-2 px-4 rounded-xl py-3 bg-white">
        <div>
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-primary-color"
          />
        </div>
        <p> City, destination, or hotel to go</p>
      </div>
      <div className="flex mt-2 gap-4">
        <div className="basis-[33%]">
          <p className="text-gray-200 mb-2 font-semibold">Check-in</p>
          <div className="w-full flex items-center relative">
            <input
              placeholder="Sun, 05 May 2024"
              className="pointer-events-none w-[70%] outline-none pr-4 pl-10 py-3 rounded-xl"
            ></input>
            <div className="top-[50%] left-[12px] translate-y-[-50%] absolute">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className=" text-primary-color text-xl"
              />
            </div>
          </div>
        </div>
        <div className="basis-[33%]">
          <p className="text-gray-200 mb-2 font-semibold">Duration</p>
          <div className="w-full flex items-center relative">
            <input
              placeholder="3 Nights"
              className="pointer-events-none w-[70%] outline-none pr-4 pl-10 py-3 rounded-xl"
            ></input>
            <div className="top-[50%] left-[12px] translate-y-[-50%] absolute">
              <FontAwesomeIcon
                icon={faMoon}
                className=" text-primary-color text-xl"
              />
            </div>
          </div>
        </div>
        <div className="basis-[33%]">
          <p className="text-gray-200 mb-2 font-semibold">Check-out</p>
          <p className="text-gray-200 font-semibold">Wed, 08 May 2024</p>
        </div>
      </div>
      <p className="text-gray-200 my-2 font-semibold">Guests and Rooms</p>
      <div className="flex gap-4 items-center">
        <div className="flex basis-[66%] gap-2 px-4 rounded-xl py-3 bg-white">
          <div>
            <FontAwesomeIcon
              icon={faUserGroup}
              className="text-primary-color"
            />
          </div>
          <p>2 Adult(s), 0 Child, 1 Room</p>
        </div>
        <div className="basis-[33%] ">
          <Button
            type="submit"
            className="py-6 w-full text-[16px] bg-orange-600 font-bold hover:bg-orange-700 transition-all"
          >
            Search hotels
          </Button>
        </div>
      </div>
    </div>
  );
}
