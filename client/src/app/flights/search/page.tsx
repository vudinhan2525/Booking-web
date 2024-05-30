import { Suspense, useEffect, useState } from "react";
import MainSearchFlightPage from "./main";

export default function SearchFlightPage() {
  return (
    <Suspense>
      <MainSearchFlightPage />
    </Suspense>
  );
}
