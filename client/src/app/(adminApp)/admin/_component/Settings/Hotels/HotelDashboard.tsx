"use client";
import hotelApiRequest from "@/apiRequest/hotel";
import { ComboBox } from "@/components/component/Search/ComboBox";
import { Button } from "@/components/ui/button";
import { IHotel } from "@/interfaces/IHotel";
import {
  faChevronDown,
  faChevronUp,
  faCircleNotch,
  faMagnifyingGlass,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../AdminProvider";
import EditForm from "./EditForm";
import { destinationsMap } from "@/lib/dataHotel";
import { delay } from "@/utils/delay";
const accomodationType = [
  { name: "Homes" },
  { name: "Others" },
  { name: "Hotels" },
  { name: "Apartments" },
  { name: "Guest Houses" },
  { name: "B&B" },
  { name: "Resorts" },
  { name: "Homestays" },
  { name: "Hostels" },
  { name: "Villas" },
];
export default function HotelDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [accomodations, setAccomodations] = useState({ name: "Hotels" });
  const [defaultAcc, setDefaultAcc] = useState({ name: "" });
  const [defaultSearch, setDefaultSearch] = useState("a");
  const [search, setSearch] = useState("");
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [defaultHotels, setDefaultHotels] = useState<IHotel[]>([]);
  const [nameSort, setNameSort] = useState(0);
  const [accSort, setAccSort] = useState(0);
  const [locSort, setLocSort] = useState(0);
  const [ratingSort, setRatingSort] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hotelSlt, setHotelSlt] = useState<IHotel>();
  const { admin } = useAdminContext();
  useEffect(() => {
    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sortByName = () => {
    setAccSort(0);
    setLocSort(0);
    setRatingSort(0);
    if (nameSort === 0) {
      const sortedHotels = [...hotels].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else if (nameSort === 1) {
      const sortedHotels = [...hotels].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else {
      setHotels(defaultHotels);
    }
    setNameSort((prev) => {
      if (prev + 1 > 2) {
        return 0;
      }
      return prev + 1;
    });
  };
  const sortByAcc = () => {
    setNameSort(0);
    setLocSort(0);
    setRatingSort(0);
    if (accSort === 0) {
      const sortedHotels = [...hotels].sort((a, b) =>
        a.accomodation.localeCompare(b.accomodation)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else if (accSort === 1) {
      const sortedHotels = [...hotels].sort((a, b) =>
        b.accomodation.localeCompare(a.accomodation)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else {
      setHotels(defaultHotels);
    }
    setAccSort((prev) => {
      if (prev + 1 > 2) {
        return 0;
      }
      return prev + 1;
    });
  };
  const sortByLoc = () => {
    setAccSort(0);
    setNameSort(0);
    setRatingSort(0);
    if (locSort === 0) {
      const sortedHotels = [...hotels].sort((a, b) =>
        a.location.localeCompare(b.location)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else if (locSort === 1) {
      const sortedHotels = [...hotels].sort((a, b) =>
        b.location.localeCompare(a.location)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else {
      setHotels(defaultHotels);
    }
    setLocSort((prev) => {
      if (prev + 1 > 2) {
        return 0;
      }
      return prev + 1;
    });
  };
  const sortByRating = () => {
    setAccSort(0);
    setLocSort(0);
    setNameSort(0);
    if (ratingSort === 0) {
      const sortedHotels = [...hotels].sort((a, b) =>
        a.rating.localeCompare(b.rating)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else if (ratingSort === 1) {
      const sortedHotels = [...hotels].sort((a, b) =>
        b.rating.localeCompare(a.rating)
      );
      if (JSON.stringify(sortedHotels) !== JSON.stringify(hotels)) {
        setHotels(sortedHotels);
      }
    } else {
      setHotels(defaultHotels);
    }
    setRatingSort((prev) => {
      if (prev + 1 > 2) {
        return 0;
      }
      return prev + 1;
    });
  };
  const getHotels = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await delay(500);
    if (
      !admin ||
      (accomodations.name === defaultAcc.name && defaultSearch === search)
    )
      return;
    setDefaultAcc(accomodations);
    setDefaultSearch(search);
    try {
      const response = await hotelApiRequest.getHotelFromAdmin({
        adminId: admin.id,
        accomodation: accomodations.name,
        searchText: search,
      });
      if (response.status === "success") {
        setHotels(response.data);
        setDefaultHotels(response.data);
      }
    } catch (error) {}
    setIsLoading(false);
  };
  return (
    <div>
      <div>
        {!showEditForm && !showAddForm && (
          <div>
            <div className="flex items-center justify-between">
              <header className="text-3xl font-bold">Hotels</header>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-primary-color hover:bg-blue-600 transition-all font-bold"
              >
                Add hotel
              </Button>
            </div>
            <div className="px-6 py-6 bg-white gap-6 rounded-md shadow-md mt-4 flex">
              <div className="basis-[50%]">
                <p className="font-bold text-gray-700 text-sm">
                  Search by hotel name
                </p>
                <div className="relative mt-2 ">
                  <div className="absolute top-[50%] left-[3%] text-gray-600 flex items-center justify-center translate-y-[-50%]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for name,..."
                    className="outline-none pr-4 pl-10 rounded-lg py-3 text-sm font-bold text-gray-700 w-full bg-gray-50"
                  ></input>
                </div>
              </div>
              <div className="">
                <p className="font-bold text-gray-700 text-sm mb-2">
                  Accomodations
                </p>
                <ComboBox
                  value={accomodations}
                  frameworks={accomodationType}
                  isSeatList={true}
                  setValue={setAccomodations}
                  child={
                    <div
                      className={`border-[1px] min-w-[150px] cursor-pointer inline-flex items-center gap-2 px-4 rounded-xl py-3 bg-white`}
                    >
                      <p className="font-bold text-gray-600 text-[15px]">
                        {accomodations.name}
                      </p>
                    </div>
                  }
                />
              </div>
              <div className="">
                <p className="font-bold text-gray-700 text-sm">Search</p>
                <div
                  onClick={() => getHotels()}
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
              <div className="mt-4 bg-white py-4 shadow-md rounded-lg">
                <div className="flex px-4 pb-3">
                  <header className="font-bold text-lg">Hotel summary</header>
                </div>
                <div className=" bg-gray-50 flex px-4 border-b-[1px] border-t-[1px]">
                  <div
                    onClick={() => {
                      sortByName();
                    }}
                    className="justify-between flex items-center basis-[30%] hover:bg-gray-100 transition-all border-r-[1px] border-l-[1px] px-4 py-2 cursor-pointer"
                  >
                    <p className="text-sm font-bold text-gray-600 ">Name</p>
                    {nameSort !== 0 && (
                      <FontAwesomeIcon
                        icon={nameSort === 1 ? faChevronDown : faChevronUp}
                        className="text-sm text-gray-600 transition-all"
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      sortByAcc();
                    }}
                    className="flex justify-between items-center basis-[16%] hover:bg-gray-100 transition-all border-r-[1px] px-4 py-2 cursor-pointer"
                  >
                    <p className="text-sm font-bold text-gray-600 ">
                      Accomodations
                    </p>
                    {accSort !== 0 && (
                      <FontAwesomeIcon
                        icon={accSort === 1 ? faChevronDown : faChevronUp}
                        className="text-sm text-gray-600 transition-all"
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div className="flex items-center basis-[25%] border-r-[1px] px-4 py-2 ">
                    <p className="text-sm font-bold text-gray-600 ">Summary</p>
                  </div>
                  <div
                    onClick={() => {
                      sortByLoc();
                    }}
                    className="flex justify-between hover:bg-gray-100 transition-all cursor-pointer items-center basis-[13%] border-r-[1px] px-4 py-2 "
                  >
                    <p className="text-sm font-bold text-gray-600 ">Location</p>
                    {locSort !== 0 && (
                      <FontAwesomeIcon
                        icon={locSort === 1 ? faChevronDown : faChevronUp}
                        className="text-sm text-gray-600 transition-all"
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      sortByRating();
                    }}
                    className="flex justify-between items-center basis-[10%] hover:bg-gray-100 transition-all border-r-[1px] px-4 py-2 cursor-pointer"
                  >
                    <p className="text-sm font-bold text-gray-600 ">Rating</p>
                    {ratingSort !== 0 && (
                      <FontAwesomeIcon
                        icon={ratingSort === 1 ? faChevronDown : faChevronUp}
                        className="text-sm text-gray-600 transition-all"
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div className="flex items-center basis-[7%] border-r-[1px] px-4 py-2">
                    <p className="text-sm font-bold text-gray-600 ">Edit</p>
                  </div>
                </div>
                {hotels.length > 0 &&
                  hotels.map((hotel, idx) => {
                    return (
                      <div
                        key={idx}
                        className=" bg-white flex px-4 border-b-[1px]"
                      >
                        <div className="flex items-center basis-[30%]  transition-all border-r-[1px] border-l-[1px] px-4 py-2 ">
                          <p className="text-sm line-clamp-2 font-medium text-gray-600 ">
                            {hotel.name}
                          </p>
                        </div>
                        <div className="flex items-center basis-[16%]  transition-all border-r-[1px] px-4 py-2 ">
                          <p className="text-sm font-medium text-gray-600 ">
                            {hotel.accomodation}
                          </p>
                        </div>
                        <div className="flex items-center basis-[25%] border-r-[1px] px-4 py-2 ">
                          <p className="text-sm line-clamp-2 font-medium text-gray-600 ">
                            {hotel.summary}
                          </p>
                        </div>
                        <div className="flex items-center basis-[13%] border-r-[1px] px-4 py-2 ">
                          <p className="text-sm line-clamp-2 font-medium text-gray-600 ">
                            {destinationsMap.get(hotel.location).title}
                          </p>
                        </div>
                        <div className="flex items-center basis-[10%]  transition-all border-r-[1px] px-4 py-2 ">
                          <p className="text-sm font-medium text-gray-600 ">
                            {hotel.rating}
                          </p>
                        </div>
                        <div className="flex justify-center items-center basis-[7%] border-r-[1px] px-4 py-2">
                          <div
                            onClick={() => {
                              setShowEditForm(true);
                              setHotelSlt(hotel);
                            }}
                            className=""
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="hover:text-gray-700 text-gray-600 cursor-pointer transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
      {showEditForm && hotelSlt && (
        <EditForm
          isEditForm={true}
          setTurnOffForm={setShowEditForm}
          hotelEdit={hotelSlt}
          setHotels={setHotels}
        />
      )}
      {showAddForm && (
        <EditForm isEditForm={false} setTurnOffForm={setShowAddForm} />
      )}
    </div>
  );
}
