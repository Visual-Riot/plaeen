"use client"

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px]">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">

            {/* Log in / Sign in Card */}
            <div className="p-16 bg-lightPurple/15 min-w-[320px] md:min-w-[520px] rounded-lg backdrop-blur-[14px] backdrop-brightness-[1.4] mt-[60px]">

              {/* Create Character Section */}
              <div>
                <h2 className="text-white font-semibold text-3xl mt-0.5">
                  Create your character
                </h2>
                <p className="font-light text-white text-sm mt-8">Add your username</p>
                <input
                  type="text"
                  placeholder="username"
                  className="border-green bg-green opacity-75 border-2 mt-4 w-full p-5 rounded-lg"
                />
              </div>
              <div className="flex mt-8 items-center">
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected Avatar" className="w-[77px] h-[77px] rounded-full object-cover" />
                ) : (
                  <div onClick={handleFileInputClick} className="border border-taupe bg-taupe opacity-35 rounded-full w-[77px] h-[77px] flex items-center justify-center text-white text-2xl cursor-pointer">
                    <TiPlus />
                  </div>
                )}
                <button onClick={handleFileInputClick} className="text-green underline ml-5">
                  Upload avatar
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg, image/png"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <GreenButton onClick={() => console.log('clicked')} className="mt-8 p-[1.25rem!important] text-black w-full">
                  Continue
                </GreenButton>
              </div>
              <div>
                <Link href="/" className="text-white underline text-sm flex justify-center mt-8 hover:text-gray-300">
                  Skip for now
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
