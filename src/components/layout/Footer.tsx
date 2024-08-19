import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

interface FooterProps {
  useBackgroundImage?: boolean; // Optional prop to control background image
  className?: string; // Optional prop for additional class names
}

const Footer: React.FC<FooterProps> = ({ useBackgroundImage = true, className }) => {
  const currentYear = new Date().getFullYear();

  // Styles for the footer container (including the ellipse)
  const footerContainerStyles = {
    position: 'relative' as 'relative',
    zIndex: 10,
  };

  // Styles for the ellipse element above the footer
  const ellipseStyles = {
    position: 'absolute' as 'absolute',
    left: 0,
    right: 0,
    top: '-1rem', // Adjust this value as needed to position the ellipse correctly above the footer
    height: '3rem', // Increased height to make the ellipse more like a semi-circle
    backgroundColor: 'black',
    clipPath: 'ellipse(130% 100% at 50% 100%)', // Create a more semi-circular shape
    borderTop: '3px solid #6606E3', // Purple border on the curved side at the bottom
    overflow: 'hidden', // Ensure that the content inside does not overflow
  };

  const footerClass = classNames(
    "flex items-center justify-center xs:h-[55vh] sm:h-[40vh] mt-[150px] text-center text-white w-screen",
    {
      "bg-[url('/img/footer-bg-noshadow.webp')] bg-cover bg-top": useBackgroundImage,
      "bg-gray-800": !useBackgroundImage, // Fallback background color if no image is used
    },
    className // Merge with any additional classes passed as props
  );

  return (
    <div style={footerContainerStyles}>
      {/* Conditionally render the ellipse only if the background image is not used */}
      {!useBackgroundImage && (
        <div style={ellipseStyles}></div>
      )}
      <footer className={footerClass}>
        <div className="text-center">
          <div className="flex justify-center mb-12">
            <Link href="/" passHref>
              <Image
                src="/logo/logo-text.svg"
                alt="Plaeen Logo"
                width={100}
                height={100}
                className="mt-[60px] 2xl:mt-[80px]"
              />
            </Link>
          </div>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-16 mb-10 text-sm font-sofia font-light justify-center items-center">
            <Link href="#" legacyBehavior>
              <a className="hover:text-neonGreen transition duration-300">
                Cookie Policy
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="hover:text-neonGreen transition duration-300">
                Terms of Use
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="hover:text-neonGreen transition duration-300">
                Plaeen & Privacy
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="hover:text-neonGreen transition duration-300">
                Contact Us
              </a>
            </Link>
          </div>
          <div className="text-xs opacity-70 text-white font-sofia font-extralight mb-5">
            © {currentYear} Plaeen. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
