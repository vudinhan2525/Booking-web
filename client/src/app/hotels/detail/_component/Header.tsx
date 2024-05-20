"use client";
import { useState } from "react";

export default function HeaderDetailHotel() {
  const [showSlt, setShowSlt] = useState(0);
  return (
    <div className="sticky py-2 gap-2 flex top-0 px-24 z-10 bg-flight-ct">
      {["Overview", "Room", "Location", "Facilities", "Policy", "Reviews"].map(
        (el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setShowSlt(idx)}
              className={`${
                showSlt === idx
                  ? "bg-white text-primary-color"
                  : "text-white hover:bg-gray-300/25"
              } px-3 py-2 text-sm  font-semibold rounded-lg cursor-pointer transition-all `}
            >
              {el}
            </div>
          );
        }
      )}
    </div>
  );
}
