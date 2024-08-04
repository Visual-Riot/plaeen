import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { GoBell } from "react-icons/go";

const Navbar: FC = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image src="logo\logo-icon.svg" alt="Logo" width={50} height={50} />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-14 font-light">
          <Link href="/teams">
            <span className="text-white hover:text-gray-300 cursor-pointer">Teams</span>
          </Link>
          <Link href="/friends">
            <span className="text-white hover:text-gray-300 cursor-pointer">Friends</span>
          </Link>
          <Link href="/wishlist">
            <span className="text-white hover:text-gray-300 cursor-pointer">Wishlist</span>
          </Link>

          {/* Icons */}
          <button className="text-white hover:text-gray-300">
            <GoBell className='scale-[2]'/>
          </button>
          <button className="text-white hover:text-gray-300">
            <Image
              src=""
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full border border-neonGreen"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
