import { Suspense } from "react";
import Main from "./main";

export default function SearchHotelsPage() {
  return (
    <Suspense>
      <Main />
    </Suspense>
  );
}
