import { faPlaneUp, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function WhyChooseUs() {
  return (
    <div>
      <div className="h-[520px] mb-12 relative w-full overflow-hidden">
        <Image
          src={
            "https://shopcartimg2.blob.core.windows.net/shopcartctn/bg-white-gray.jpg"
          }
          alt="bg"
          quality={100}
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
          className="select-none"
        />
        <div className="absolute left-[8%] top-[12%] w-[450px] h-[550px]">
          <Image
            src={
              "https://shopcartimg2.blob.core.windows.net/shopcartctn/peopletravel.png"
            }
            alt="bg"
            quality={100}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            className="select-none"
          />
        </div>
        <div className="absolute right-[10%] min-w-[40%]">
          <div className="flex gap-2 mt-16">
            <p className="text-4xl font-bold text-gray-700">Why</p>
            <p className="text-4xl font-bold text-primary-color">Choose</p>
            <p className="text-4xl font-bold text-gray-700">Us</p>
          </div>
          <p className="text-gray-700 mt-4 mb-8">
            We offering ubeatable prices and personalized experiences.
          </p>
          <div className="px-6 py-5 w-[90%] bg-white gap-4 rounded-md shadow-md flex items-center">
            <div>
              <FontAwesomeIcon
                icon={faPlaneUp}
                className="text-2xl text-primary-color"
              />
            </div>
            <div>
              <p className="font-bold">Wide Range Options.</p>
              <p className="text-sm text-gray-600 font-medium">
                Offers a diverse selection of accomodations.
              </p>
            </div>
          </div>
          <div className="mt-4 px-6 py-5 w-[90%] bg-white gap-4 rounded-md shadow-md flex items-center">
            <div>
              <FontAwesomeIcon
                icon={faWallet}
                className="text-2xl text-primary-color"
              />
            </div>
            <div>
              <p className="font-bold">Best Prices and Special Offers</p>
              <p className="text-sm text-gray-600 font-medium">
                Guarantee the best prices for every booking.
              </p>
            </div>
          </div>
          <div className="mt-4 px-6 py-5 w-[90%] bg-white gap-4 rounded-md shadow-md flex items-center">
            <div>
              <FontAwesomeIcon
                icon={faPlaneUp}
                className="text-2xl text-primary-color"
              />
            </div>
            <div>
              <p className="font-bold">Flexible Cancellation</p>
              <p className="text-sm text-gray-600 font-medium">
                User flexible to cancel if they want change their plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
