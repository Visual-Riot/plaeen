"use client";

import React from "react";
import GreenButton from "../buttons/GreenButton";
import Link from "next/link";

const HomePageSignUp = () => {
  return (
    <div className="x-main-paddings flex flex-col w-full mt-16 justify-center items-center">
      <div className="md:w-full flex justify-center flex-col items-center gap-2">
        <p className="text-lg md:text-xl text-center text-lightGrey font-sofia font-extralight landing-paragraph">
        <span className="font-medium">Ready to lose all excuses not to play? {''} </span>
          Create an account and start gaming!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center xs:items-start gap-6 mt-4 w-full">
          <Link href="/login" passHref>
            <div className="cursor-pointer">
              <GreenButton
                onClick={() => console.log("clicked")}
                className="h-[64px] xs:w-[115px] sm:w-[170px]  text-nowrap"
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
