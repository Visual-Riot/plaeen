"use client"

import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"

export default function Page() {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: '/calendar'
    })
  }
  return (
    <div className="bg-black w-full h-[100vh] bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
    <div className="bg-[black]/85 w-full h-[100vh] flex flex-col items-center">
    <div className="bg-[#6606E3]/5 w-full h-[100vh] flex flex-col items-center">

      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src="logo\logo-icon.svg"
          alt="Plaeen logo"
          width={70}
          height={52}
          className="py-11"
        />
      </div>

      {/* Log in / Sign in Card */}
        <div className="p-16 bg-lightPurple/15 min-w-[520px] rounded-lg backdrop-blur-[14px] backdrop-brightness-[1.4]">

        {/* Google OAuth Section */}
        <div>
          <h2 className="text-white font-semibold text-3xl mt-0.5">
            Log in or Sign up
          </h2>
          <p className="text-lightGrey font-light text-lg mt-2.5">Get started for free</p>
          <button onClick={()=>onClick("google")}className="text-lightGrey text-lg mt-8 border-4 border-green rounded-[10px] w-full p-5 border-opacity-50 flex items-center justify-center gap-7">
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </div>

        <div className="my-8 flex basis-full text-lightGrey font-thin before:bg-[#707070] before:h-px before:grow before:mr-4 before:mt-2 after:bg-[#707070] after:h-px after:grow items-center after:ml-4 after:mt-2">
          or
        </div>

        </div>

        </div>
        </div>
    </div>
  );
}
