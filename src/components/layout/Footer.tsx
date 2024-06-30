import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sm:mt-0 xxs:mt-[-200px] bg-[#1B0131] py-1 text-center text-white min-h-[262px] w-screen bg-[url('/img/footer-bg.webp')] bg-cover bg-center">
      <div className="container mx-auto">
        <div className="flex justify-center xxs:mt-[400px] sm:mt-72 mb-12">
          <Image src="/logo/logo-text.svg" alt="Plaeen Logo" width={100} height={100} />
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
