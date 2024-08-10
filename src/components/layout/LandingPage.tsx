'use client';

import GreenButton from '@/components/buttons/GreenButton';
import HomeNavbar from '@/components/layout/HomeNavbar';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="h-[85vh] w-screen bg-[url('/img/hero-bg-noshadow.webp')] bg-cover bg-bottom mb-[16rem]">
      <HomeNavbar />
      <div className="relative top-[0%] 2xl:top-[10%] space-y-5 px-6 sm:px-12 md:px-20 lg:px-32">
        <h1 className="text-neonGreen font-semibold font-sofia landing-heading w-full md:w-[90%] xl:w-[55%] text-[70px] leading-normal max-[1580px]:text-[65px] max-[1280px]:text-[60px] max-[780px]:text-[50px] max-[500px]:text-[45px]">
          {"Unleash the power of plaeen together."}
        </h1>
        <p className="landing-paragraph text-lightGrey font-sofia font-extralight py-3 w-full md:w-[80%] xl:w-[55%] text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.6]">
          {"Life gets busy, but gaming with friends shouldn't be. Plaeen makes scheduling sessions effortless, so you can spend more time playing and less time planning."}
        </p>
        <div className="flex flex-col sm:flex-row items-center xs:items-start space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="email"
            placeholder="john.smith@gmail.com"
            className="border-neonGreen border-2 mt-4 lg:mt-0 h-12 xs:h-[64px] xs:w-full sm:w-[250px] md:w-[408px] p-5 rounded-lg bg-transparent"
          />
          <Link href="/login" passHref>
            <div className="cursor-pointer">
              <GreenButton onClick={() => console.log('clicked')} className='w-[134px] sm:w-[170px] h-[64px]'>Get Started</GreenButton>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;