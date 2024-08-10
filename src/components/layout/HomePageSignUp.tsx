'use client';

import React from 'react'
import GreenButton from '../buttons/GreenButton';
import Link from 'next/link';

const HomePageSignUp = () => {
  return (
    <div>
        <h2 className="mt-28 mb-10 font-sofia text-neonGreen text-left text-[38px] xs:top-[100px] sm:top-[80px] w-[72%] mx-auto">
            Ready to lose all excuses not to play?
        </h2>
        <div className="xs:w-[74%] md:w-[72%] mx-auto">
            <p className="mb-5 text-lightGrey font-sofia font-extralight landing-paragraph w-full sm:w-[1/2] xl:w-[63%] xxs:ms-11 xs:ms-0 xxs:w-4/5">
            Enter your email to create an account.
            </p>
            <div className="flex flex-col sm:flex-row items-center xs:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                <input
                    type="email"
                    placeholder="john.smith@gmail.com"
                    className="border-neonGreen border-2 mt-4 lg:mt-0 h-12 xs:h-[64px] xs:w-full sm:w-[250px] md:w-[408px] p-5 rounded-lg bg-transparent"
                />
                <Link href="/login" passHref>
                    <div className="cursor-pointer">
                    <GreenButton onClick={() => console.log('clicked')} className='xs:w-[115px] sm:w-[170px] h-[64px]'>Get Started</GreenButton>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HomePageSignUp