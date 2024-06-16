'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import GreenButton from '../buttons/GreenButton';

const HomeNavbar: React.FC = () => {
  return (
    <nav className="bg-transparent relative w-[80%] left-[139px] top-[44px]">
      <div className="">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <Link href="/" passHref>
              <div className="flex items-center py-5 px-2 cursor-pointer">
                <Image src="/logo/logo-icon.svg" alt="Logo" width={70} height={52} />
              </div>
            </Link>
          </div>

          {/* Sign Up Button */}
          <div className="hidden md:flex items-center">
            <Link href="/signup" passHref>
              <div className="py-2 px-3 cursor-pointer">
                <GreenButton onClick={() => console.log('Button clicked!')} className='w-[170px]'>Sign in</GreenButton>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button className="mobile-menu-button">
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;