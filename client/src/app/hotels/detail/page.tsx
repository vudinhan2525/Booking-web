import { Suspense } from "react";
import HeaderDetailHotel from "./_component/Header";
import MainHotelDetail from "./_component/main";

export default function Page() {
  return (
    <div className="bg-[#F7F9FA]">
      <Suspense>
        <MainHotelDetail />
      </Suspense>
    </div>
  );
}
