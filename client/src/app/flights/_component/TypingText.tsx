"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
export default function TypingText() {
  return (
    <div>
      <TypeAnimation
        sequence={["Get your ticket and started flying."]}
        wrapper="span"
        speed={50}
      />
    </div>
  );
}
