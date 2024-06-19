import React, { Suspense } from "react";
import MainPage from "./_component/main";

export default function page() {
  return (
    <div className="pt-[120px] bg-[#F7F9FA] px-12">
      <Suspense>
        <MainPage />
      </Suspense>
    </div>
  );
}
