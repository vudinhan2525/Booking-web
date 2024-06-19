import React, { Suspense } from "react";
import MainUserPage from "./_component/main";

export default function page() {
  return (
    <div>
      <Suspense>
        <MainUserPage />
      </Suspense>
    </div>
  );
}
