'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import GreenButton from '../buttons/GreenButton';

const HomeNavbar: React.FC = () => {
  return (
    <nav className="bg-transparent relative space-y-5 px-6 sm:px-12 md:px-20 lg:px-32 mx-auto py-10 flex justify-between items-center">
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          <Image src="/logo/logo-icon.svg" alt="Logo" width={70} height={52} />
        </div>
      </Link>

      <Link href="/login" passHref>
        <div className="cursor-pointer">
          <GreenButton onClick={() => console.log('clicked')} className='xs:w-[115px] sm:w-[170px] h-[64px]'>Login</GreenButton>
        </div>
      </Link>
    </nav>
  );
};

export default HomeNavbar;