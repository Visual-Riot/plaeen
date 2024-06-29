"use client";

import GreenButton from "@/components/buttons/GreenButton";
import Link from "next/link";
import HomeNavbar from "@/components/layout/HomeNavbar";
import USPs from "@/components/cards/USPs";
import { url } from "inspector";

export default function Home() {
  return (
    <main>
      {/* Landing page */}
      <div className="h-screen w-screen bg-[url('/img/hero-bg.webp')] bg-cover bg-center">
        <HomeNavbar />
        <div className="relative top-[160px] space-y-5 px-20 md:px-32">
          <h1 className="text-neonGreen font-semibold font-sofia text-5xl lg:text-[64px] leading-snug lg:leading-normal w-full xl:w-[50%]">
            Unleash the power of plaeen together.
          </h1>
          <p className="text-lightGrey font-sofia text-base font-extralight text-[14px] lg:text-[16px] leading-relaxed lg:leading-loose w-full xl:w-[50%]">
            Life gets busy, but gaming with friends shouldn't be. Plaeen makes scheduling sessions effortless, so you can spend more time playing and less time planning.
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

      {/* USP/Benefits */}
      <div>
        <h2 className="relative font-sofia text-neonGreen text-left text-[38px] top-[100px] left-0 w-[70%] mx-auto">
          Why Plaeen?
        </h2>
        <div className="flex flex-wrap relative top-[150px] w-[80%] mx-auto justify-evenly">
          <USPs
            className="bg-usp1"
            icon={"/icons/easy-scheduling_icon.svg"}
            headline={"Effortless Scheduling"}
            text={
              "Stop juggling calendars. Plaeen finds the perfect time for your next gaming session with friends."
            }
          />
          <USPs
            className="bg-usp2"
            icon={"/icons/friends-only_icon.svg"}
            headline={"Friends Only"}
            text={
              "Plaeen is your safe space. Play with the people you know and trust, without worrying about random invites."
            }
          />
          <USPs
            className="bg-usp3"
            icon={"/icons/more-game_icon.svg"}
            headline={"More time, more games"}
            text={
              "Spend less time planning, more time playing. Plaeen makes scheduling gaming sessions a breeze."
            }
          />
        </div>
      </div>
    </main>
  );
}
