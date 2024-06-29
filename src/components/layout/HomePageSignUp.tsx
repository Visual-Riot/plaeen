'use client';

import React from 'react'
import GreenButton from '../buttons/GreenButton';

const HomePageSignUp = () => {
  return (
    <div>
        <h2 className="mt-28 mb-10 font-sofia text-neonGreen text-left text-[38px] xs:top-[100px] sm:top-[80px] w-[72%] mx-auto">
            Ready to lose all excuses not to play?
        </h2>
        <div className="xs:w-[74%] md:w-[72%] mx-auto">
            <p className="mb-5 text-lightGrey font-sofia font-extralight landing-paragraph w-full sm:w-[1/2] xl:w-[63%]">
            Enter your email to create an account.
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
  )
}

export default HomePageSignUp
