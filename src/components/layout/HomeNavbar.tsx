"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import GreenButton from "../buttons/GreenButton";

const HomeNavbar: React.FC = () => {
  return (
    <nav className="bg-transparent relative py-6 md:py-10 w-full">
      <div className="flex w-full justify-between">
        <Link href="/" passHref>
          <div className="cursor-pointer flex justify-start items-start">
            <Image
              src="/logo/logo-icon.svg"
              alt="Logo"
              width={70}
              height={52}
            />
          </div>
        </Link>

        <Link href="/login" passHref>
          <div className="cursor-pointer">
            <GreenButton
              onClick={() => console.log("clicked")}
              className="xs:w-[115px] sm:w-[170px] h-[64px]"
            >
              Login
            </GreenButton>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;
