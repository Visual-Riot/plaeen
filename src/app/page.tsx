'use client';

import GreenButton from "@/components/buttons/GreenButton";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="h-screen w-screen bg-[url('/img/hero-bg.webp')] bg-cover bg-center">
        <div className="relative top-[203px] space-y-5 left-[139px]">
          <h1 className="text-neonGreen font-semibold font-sofia text-[64px]">Unleash the power of<br />plaeen together.</h1>
          <p className="text-lightGrey font-sofia text-[16px]">Life gets busy, but gaming with friends shouldn't be. Plaeen makes scheduling sessions<br />
          effortless, so you can spend more time playing and less time planning.</p>
          <div>
            <input type="email" placeholder="john.smith@gmail.com" className="border-neonGreen border-2 h-[64px] w-[408px] p-5 rounded-md bg-transparent"/>
            <GreenButton onClick={() => console.log('Button clicked!')}>Get started</GreenButton>
          </div>
        </div>
      </div>
    </main>
  );
}