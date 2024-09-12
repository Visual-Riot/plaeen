"use client";

import React from "react";
import GreenButton from "../buttons/GreenButton";
import Link from "next/link";

const HomePageSignUp = () => {
  return (
    <div className="x-main-paddings flex flex-col w-full mt-16 justify-center items-center">
      <div className="md:w-full flex justify-center flex-col items-center gap-2">
        <p className="text-lg md:text-xl md:mb-5 text-lightGrey font-sofia font-extralight landing-paragraph">
          <span className="font-medium">
            Ready to lose all excuses not to play?
          </span>{" "}
          Enter your email to create an account.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center xs:items-start gap-6 mt-4 w-full">
          <input
            type="email"
            placeholder="john.smith@gmail.com"
            className="border-neonGreen border-2 h-12 xs:h-[64px] xs:w-full md:w-[408px] p-5 rounded-lg bg-transparent"
          />
          <Link href="/login" passHref>
            <div className="cursor-pointer">
              <GreenButton
                onClick={() => console.log("clicked")}
                className="h-[64px] px-16 text-nowrap"
              >
                Get Started
              </GreenButton>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageSignUp;
