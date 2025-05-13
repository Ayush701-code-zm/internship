"use client"; // Important for Next.js client components

import Image from "next/image";
import WonderlaNavbar from "../components/WonderlaNavbar"; // Correct import path

export default function Home() {
  return (
    <div className="bg-blue-600 min-h-screen">
      {/* Include the Wonderla Navbar at the top */}
      <WonderlaNavbar />

      {/* Rest of the content */}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-70px)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-white font-bold text-3xl">hii</h1>
      </div>
    </div>
  );
}
