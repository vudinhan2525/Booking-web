"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
export default function TypingText({ msg }: { msg: string }) {
  return (
    <div>
      <TypeAnimation sequence={[msg]} wrapper="span" speed={50} />
    </div>
  );
}
