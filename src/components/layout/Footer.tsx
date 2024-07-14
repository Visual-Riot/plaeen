import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center xs:h-[55vh] sm:h-[40vh] mt-[150px] text-center text-white w-screen bg-[url('/img/footer-bg-noshadow.webp')] bg-cover bg-top">
      <div className="text-center">
        <div className="flex justify-center mb-12">
          <Image src="/logo/logo-text.svg" alt="Plaeen Logo" width={100} height={100} className="mt-[60px] 2xl:mt-[80px]" />
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-16 mb-10 text-sm font-sofia font-light justify-center items-center">
          <Link href="#" legacyBehavior>
            <a className="hover:text-neonGreen transition duration-300">Cookie Policy</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a className="hover:text-neonGreen transition duration-300">Terms of Use</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a className="hover:text-neonGreen transition duration-300">Plaeen & Privacy</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a className="hover:text-neonGreen transition duration-300">Contact Us</a>
          </Link>
        </div>
        <div className="text-xs opacity-70 text-white font-sofia font-extralight mb-5">
          © {currentYear} Plaeen. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
