"use client";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faCamera,
  faStar as faStar2,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { IHotel } from "@/interfaces/IHotel";
import { Textarea } from "../ui/textarea";
import { useAppContext } from "@/app/AppProvider";

export default function RatingModal({
  hotel,
  setShowRatingModal,
  editRating,
}: {
  hotel: IHotel;
  setShowRatingModal: React.Dispatch<React.SetStateAction<boolean>>;
  editRating?: boolean;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [rating, setRating] = useState(1);
  const [contentRating, setContentRating] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAppContext();
  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreview(objectUrls);
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);
  const handleClickDeleteImage = (idx: number) => {
    const updatedFiles = files.filter((el, id) => id !== idx);
    setFiles(updatedFiles);
  };
  return (
    <div className="fixed animate-slideTopDown z-[999] top-0 bottom-0 right-0 left-0 bg-black/30">
      <div className="fixed w-[580px]  px-6 pt-6 pb-3 bg-white top-[50%] dark:bg-dark-flat translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-3xl">
        <header className="text-center font-bold text-xl line-clamp-1 h-[28px]">
          {hotel.name}
        </header>
        {!user && (
          <div className="h-[100px] text-center mt-4">
            <div>
              Please login and booking this hotels to give review about it.
            </div>
            <Button
              onClick={() => {
                setShowRatingModal(false);
              }}
              className="bg-white mt-4 border-[1px] border-gray-800 text-gray-700 hover:bg-gray-100 font-bold"
            >
              Cancel
            </Button>
          </div>
        )}
        {user && (
          <div>
            <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-4"></div>
            <div className="overflow-y-scroll max-h-[400px] px-3">
              <div className="flex gap-2 items-center">
                <div
                  className="w-[50px] h-[50px] bg-no-repeat bg-center bg-contain rounded-full"
                  style={{
                    backgroundImage: `url(https://shopcartimg2.blob.core.windows.net/shopcartctn/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg)`,
                  }}
                ></div>
                <div>
                  <div className="text-[18px] font-semibold">{`${
                    user.firstName + " " + user.lastName
                  }`}</div>
                  <div className="text-[12px] text-gray-600 dark:text-gray-500">
                    Public post
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 mt-4">
                {[1, 2, 3, 4, 5].map((el, idx) => {
                  return (
                    <div key={idx}>
                      <FontAwesomeIcon
                        onClick={() => {
                          setRating(el);
                        }}
                        icon={el <= rating ? faStar2 : faStar}
                        className={`${
                          el <= rating
                            ? "text-[#FFBF00]"
                            : "text-gray-700 dark:text-gray-500"
                        }  w-10 h-10 cursor-pointer`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 ">
                <Textarea
                  onChange={(e) => {
                    setContentRating(e.target.value);
                  }}
                  value={contentRating}
                  className="dark:text-dark-text h-[200px]"
                  placeholder="Write your review here..."
                ></Textarea>
              </div>
              <input
                type="file"
                className="hidden"
                ref={inputRef}
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const fileListAsArray = Array.from(e.target.files);
                    setFiles((prev) => [...prev, ...fileListAsArray]);
                  }
                }}
              ></input>
              <div
                className="w-[200px] my-3 dark:text-primary-dark-color mx-auto gap-3 flex items-center justify-center text-primary-color border-[1px] py-3 font-semibold cursor-pointer border-primary-color bg-white text-center rounded-full"
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.click();
                  }
                }}
              >
                <FontAwesomeIcon icon={faCamera} className="w-6 h-6" />
                <p>Upload image</p>
              </div>
              <div className="flex gap-2">
                {preview.map((pic, idx) => {
                  return (
                    <div
                      key={idx}
                      className="relative rounded-xl w-[100px] h-[100px] border-[1px] bg-no-repeat bg-center bg-contain"
                      style={{ backgroundImage: `url(${pic})` }}
                    >
                      {files.length > 0 && (
                        <div
                          onClick={() => handleClickDeleteImage(idx)}
                          className="absolute bg-white top-[5%] flex items-center cursor-pointer justify-center  border-[1px] w-[25px] h-[25px] right-[5%] rounded-full"
                        >
                          <FontAwesomeIcon
                            icon={faX}
                            className="w-2 h-2 "
                          ></FontAwesomeIcon>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-3"></div>
            <div className="flex justify-end gap-4 ">
              <Button
                onClick={() => {
                  setShowRatingModal(false);
                }}
                className="bg-white border-[1px] border-gray-800 text-gray-700 hover:bg-gray-100 font-bold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {}}
                className="bg-primary-color font-bold hover:bg-blue-600 dark:bg-primary-dark-color"
              >
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
