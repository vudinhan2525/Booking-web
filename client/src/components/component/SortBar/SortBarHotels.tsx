"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { accomodationType } from "@/lib/dataHotel";
import {
  faChevronDown,
  faChevronUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { formatNumber } from "@/utils/convertTime";
import { facilities } from "@/utils/facilities";

export default function SortBarHotels() {
  const [showList, setShowList] = useState<string[]>([
    "rating",
    "facilities",
    "price",
    "type",
  ]);
  const [values, setValues] = useState([0, 3000000]);
  return (
    <div className="bg-white px-6 rounded-xl border-[1px] py-4">
      <header className="text-2xl font-bold">Filter:</header>
      <div className="bg-gray-200 my-4 w-full h-[1px]"></div>
      <div>
        <div
          onClick={() => {
            if (showList.includes("rating")) {
              const newArr = showList.filter((el) => el !== "rating");
              setShowList(newArr);
              return;
            }
            setShowList((prev) => {
              return [...prev, "rating"];
            });
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-lg font-semibold">Star Rating</p>
          {showList.includes("rating") ? (
            <div>
              <FontAwesomeIcon icon={faChevronUp} className="animate-fadeIn" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="animate-fadeIn"
              />
            </div>
          )}
        </div>
        {showList.includes("rating") && (
          <div className="animate-fadeIn flex flex-col gap-3 mt-2">
            {[1, 2, 3, 4, 5].map((el, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox id={`terms-${idx}`} onCheckedChange={() => {}} />
                  <label
                    htmlFor={`terms-${idx}`}
                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex cursor-pointer gap-2 items-center">
                      {[1, 2, 3, 4, 5].map((el2, idx) => {
                        if (el2 > el) return <div key={idx}></div>;
                        return (
                          <FontAwesomeIcon
                            key={idx}
                            icon={faStar}
                            className="text-lg text-[#FFDC00]"
                          />
                        );
                      })}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-gray-200 my-4 w-full h-[1px]"></div>
      <div>
        <div
          onClick={() => {
            if (showList.includes("facilities")) {
              const newArr = showList.filter((el) => el !== "facilities");
              setShowList(newArr);
              return;
            }
            setShowList((prev) => {
              return [...prev, "facilities"];
            });
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-lg font-semibold">Facilities</p>
          {showList.includes("facilities") ? (
            <div>
              <FontAwesomeIcon icon={faChevronUp} className="animate-fadeIn" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="animate-fadeIn"
              />
            </div>
          )}
        </div>
        {showList.includes("facilities") && (
          <div className="animate-fadeIn flex flex-col gap-3 mt-2">
            {facilities.map((el, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox id={`terms2-${idx}`} onCheckedChange={() => {}} />
                  <label
                    htmlFor={`terms2-${idx}`}
                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex cursor-pointer gap-2 items-center">
                      <p className="text-sm">{el.title}</p>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-gray-200 my-4 w-full h-[1px]"></div>
      <div>
        <div
          onClick={() => {
            if (showList.includes("price")) {
              const newArr = showList.filter((el) => el !== "price");
              setShowList(newArr);
              return;
            }
            setShowList((prev) => {
              return [...prev, "price"];
            });
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-lg font-semibold">Price</p>
          {showList.includes("price") ? (
            <div>
              <FontAwesomeIcon icon={faChevronUp} className="animate-fadeIn" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="animate-fadeIn"
              />
            </div>
          )}
        </div>
        {showList.includes("price") && (
          <div className="animate-fadeIn">
            <div className="text-end text-xs mt-2 text-gray-400">
              1.000.000VND - 3.000.000 VND
            </div>
            <Slider
              className="slider w-[90%] mx-auto h-[3px] rounded-lg bg-gray-200 mt-5"
              value={values}
              onChange={setValues}
              min={0}
              max={3000000}
            />
            <div className="mt-4 flex justify-between">
              <p className="text-sm text-gray-700">
                {formatNumber(values[0]) + " VND"}
              </p>
              <p className="text-sm text-gray-700">
                {formatNumber(values[1]) + " VND"}
              </p>
            </div>
            <div className="flex justify-center mt-2" onClick={() => {}}>
              <p className="border-primary-color cursor-pointer hover:bg-primary-color hover:text-white  transition-all text-primary-color border-[1px] w-fit px-6 py-2 rounded-lg">
                Filter by price
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-200 my-4 w-full h-[1px]"></div>
      <div>
        <div
          onClick={() => {
            if (showList.includes("type")) {
              const newArr = showList.filter((el) => el !== "type");
              setShowList(newArr);
              return;
            }
            setShowList((prev) => {
              return [...prev, "type"];
            });
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-lg font-semibold">Accomodation Type</p>
          {showList.includes("type") ? (
            <div>
              <FontAwesomeIcon icon={faChevronUp} className="animate-fadeIn" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="animate-fadeIn"
              />
            </div>
          )}
        </div>
        {showList.includes("type") && (
          <div className="animate-fadeIn flex flex-col gap-3 mt-2">
            {accomodationType.map((el, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox id={`terms3-${idx}`} onCheckedChange={() => {}} />
                  <label
                    htmlFor={`terms3-${idx}`}
                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex cursor-pointer gap-2 items-center">
                      <p className="text-sm">{el}</p>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
