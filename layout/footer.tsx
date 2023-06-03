import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const today = new Date();
  return (
    <div className="relative flex items-center justify-center text-white max-w-4xl mx-auto py-5">
      <div className="flex flex-col text-center">
        <h5 className="font-poppins tracking-tight z-10 relative text-gray-400 text-sm pt-5">
          Made by <span className="text-purple-800">Team 4</span>
        </h5>
        <p className="font-barlow text-xs mt-1 text-primary/80">
          {today.getFullYear()}
        </p>
      </div>
    </div>
  );
}
