"use client"

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <LoginForm/>
  )


  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: '/calendar'
    })
  }
  return (
      <>
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
      </>


  );
}
