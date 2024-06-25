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
        <div className="relative top-[160px] space-y-5 left-[139px]">
          <h1 className="text-neonGreen font-semibold font-sofia text-[64px]">
            Unleash the power of
            <br />
            plaeen together.
          </h1>
          <p className="text-lightGrey font-sofia text-[16px]">
            {`Life gets busy, but gaming with friends shouldn't be. Plaeen makes
            scheduling sessions`}
            <br />
            effortless, so you can spend more time playing and less time
            planning.
          </p>
          <div>
            <input
              type="email"
              placeholder="john.smith@gmail.com"
              className="border-neonGreen border-2 h-[64px] w-[408px] p-5 rounded-lg bg-transparent"
            />
            <GreenButton onClick={() => console.log("Button clicked!")}>
              Get started
            </GreenButton>
          </div>
        </div>
      </div>

      {/* USP/Benefits */}
      <div>
        <h2 className="relative font-sofia text-neonGreen text-left text-[38px] top-[100px] left-0 w-[50%] mx-auto">
          Why Plaeen?
        </h2>
        <div className="flex relative top-[150px] w-[50%] mx-auto justify-between">
          <USPs
            icon={"/icons/easy-scheduling_icon.svg"}
            headline={"Effortless Scheduling"}
            text={
              "Stop juggling calendars. Plaeen finds the perfect time for your next gaming session with friends."
            }
          ></USPs>
          <USPs
            icon={"/icons/friends-only_icon.svg"}
            headline={"Friends Only"}
            text={
              "Plaeen is your safe space. Play with the people you know and trust, without worrying about random invites."
            }
          ></USPs>
          <USPs
            icon={"/icons/more-game_icon.svg"}
            headline={"More time, more games"}
            text={
              "Spend less time planning, more time playing. Plaeen makes scheduling gaming sessions a breeze."
            }
          ></USPs>
        </div>
      </div>
    </main>
  );
}
