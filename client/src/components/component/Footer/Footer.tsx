import Image from "next/image";
export default function Footer() {
  return (
    <div className="dark:bg-dark-ground pt-8  ">
      <div className=" mx-10 h-[1px] bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex gap-5 px-10 mt-12 pb-11 dark:text-dark-text">
        <div className="basis-[35%] flex flex-col pr-8 ">
          <div className="w-28 h-16 relative flex items-center">
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
          <div className="mt-6 text-sm text-gray-800 dark:text-gray-500">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </div>
          <header className="text-lg mt-8 mb-4 font-bold">
            Accepted Payments
          </header>
          <div className="flex flex-col gap-3">
            {/* <div className=" flex gap-2">
              <div className="border-[1px] py-5 border-gray-400 dark:bg-dark-text rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img1} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 dark:bg-dark-text rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img2} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 dark:bg-dark-text rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img3} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 dark:bg-dark-text rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img4} alt="" />
              </div>
            </div>
            <div className=" flex gap-2">
              <div className="border-[1px] py-5 border-gray-400 dark:bg-dark-text rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img5} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 dark:bg-dark-text rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img6} alt="" />
              </div>
            </div> */}
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">Products</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Hotels
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Flights
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Bus & Shuttle
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Airport Transport
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Car Rental
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Xperience
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Cruises
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Villas
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Apartments
            </div>
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">About Sun Travel</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              How to Book
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Contact Us
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Help Center
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Careers
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              About Us
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Ideas & Guides
            </div>
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">Services</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Gift Card
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Shipping & Delivery
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Mobile App
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Account Signup
            </div>
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">Help</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              SunTravel Help
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Returns
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Contact Us
            </div>
            <div className="hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Feedback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
