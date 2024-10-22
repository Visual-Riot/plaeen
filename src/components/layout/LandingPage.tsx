"use client";

import GreenButton from "@/components/buttons/GreenButton";
import HomeNavbar from "@/components/layout/HomeNavbar";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="x-main-paddings flex absolute left-1/2 -translate-x-1/2 w-full inset-0 top-[40vh] md:top-[70vh] bg-main-gradient z-[-20] opacity-50"></div>
      <div className="x-main-paddings min-h-[80vh] w-full bg-[url('/img/hero-bg-noshadow.webp')] bg-cover bg-bottom pb-8 md:pb-20 mb-[14rem] flex flex-col">
        <HomeNavbar />
        <div className="flex-grow flex items-center">
          <div className="relative space-y-4 md:space-y-6 lg:space-y-8 px-6 md:px-16 w-full sm:w-[80%] lg:w-[70%]">
            <h1 className="text-neonGreen font-semibold font-sofia text-center sm:text-left text-4xl md:text-5xl lg:text-6xl">
              {"Unleash the power of plaeen together."}
            </h1>
            <p className="landing-paragraph text-center sm:text-left text-lightGrey font-sofia font-light md:font-extralight text-lg md:text-xl leading-[1.6] lg:leading-[2]">
              {
                "Life gets busy, but gaming with friends shouldn't be. Plaeen makes scheduling sessions effortless, so you can spend more time playing and less time planning."
              }
            </p>
            <div className="flex justify-center sm:justify-end">
              <Link href="/login" passHref>
                <div className="cursor-pointer">
                  <GreenButton
                    onClick={() => console.log("clicked")}
                    className="xs:w-[115px] sm:w-[170px] h-[64px] text-nowrap"
                  >
                    Get Started
                  </GreenButton>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
