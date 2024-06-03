import { Suspense } from "react";
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
