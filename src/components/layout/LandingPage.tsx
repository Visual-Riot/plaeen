"use client";

import GreenButton from "@/components/buttons/GreenButton";
import HomeNavbar from "@/components/layout/HomeNavbar";
import '../../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="h-[85vh] w-screen bg-[url('/img/hero-bg-noshadow.webp')] bg-cover bg-bottom mb-[16rem]">
      <HomeNavbar />
      <div className="relative top-[0%] 2xl:top-[10%] space-y-5 px-6 sm:px-12 md:px-20 lg:px-32">
        <h1 className="text-neonGreen font-semibold font-sofia landing-heading w-full md:w-[90%] xl:w-[55%]">
          Unleash the power of plaeen together.
        </h1>
        <p className="text-lightGrey font-sofia font-extralight landing-paragraph py-3 w-full md:w-[80%] xl:w-[50%]">
          Life gets busy, but gaming with friends shouldn't be. Plaeen makes scheduling sessions
          effortless, so you can spend more time playing and less time planning.
        </p>
        <div className="flex flex-col sm:flex-row items-center xs:items-start space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="email"
            placeholder="john.smith@gmail.com"
            className="border-neonGreen border-2 mt-4 lg:mt-0 h-12 xs:h-[64px] xs:w-full sm:w-[250px] md:w-[408px] p-5 rounded-lg bg-transparent"
          />
          <GreenButton onClick={() => console.log("Button clicked!")}>
            Get started
          </GreenButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
