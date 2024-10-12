"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const savedImage = localStorage.getItem("userAvatar");
    const savedUsername = localStorage.getItem("username");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px]">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">
            <div>
              <h1 className="text-white text-[32px] font-sofia xxs:mb-4 md:mb-0">Wishlist</h1>

              {/* Wishlist games container */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
