import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FC } from 'react';
import { FaBell } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { MdEditCalendar } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
import NavItem from './NavItem';
import Link from 'next/link';

interface NavbarProps {
  avatar: string | null;
}

const Navbar: FC<NavbarProps> = ({ avatar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(avatar);

  useEffect(() => {
    if (avatar) {
      setUserAvatar(avatar);
    }
  }, [avatar]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Styles for the main nav container (including the ellipse)
  const navContainerStyles = {
    position: 'relative' as 'relative',
    zIndex: 50,
  };

  // Styles for the navbar
  const navStyles = {
    backgroundColor: 'black',
    padding: '1rem',
  };

  // Styles for the ellipse element below the navbar
  const ellipseStyles = {
    position: 'absolute' as 'absolute',
    left: 0,
    right: 0,
    bottom: '-0.5rem', // Adjust this value as needed to position the ellipse correctly below the navbar
    height: '1.5rem',
    backgroundColor: 'black',
    clipPath: 'ellipse(90% 100% at 50% 0%)', // Flip the curve to the top
    borderBottom: '3px solid #6606E3', // Purple border on the curved side at the top
    overflow: 'hidden', // Ensure that the content inside does not overflow
  };
  

  return (
    <div style={navContainerStyles}>
      <nav style={navStyles}>
        <div className="container mx-auto flex justify-between items-center mt-1">
          {/* Logo */}
          <Link href="/" passHref>
            <div className="flex items-center cursor-pointer">
              <Image src="/logo/logo-icon.svg" alt="Logo" width={50} height={50} />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation Links and Icons */}
          <div className={`hidden md:flex items-center space-x-14 font-extraLight w-full justify-end`}>
            <NavItem href="/teams" label="Teams" />
            <NavItem href="/friends" label="Friends" />
            <NavItem href="/wishlist" label="Wishlist" />
            <button className="relative text-white hover:text-gray-300">
                <FaBell className="scale-[2] text-white" />
                <span className="absolute top-0 right-0 bg-[#6606E3] border-[3px] border-black rounded-full w-5 h-5 translate-x-1/2 -translate-y-1/2"></span>
            </button>
            <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <button className="focus:outline-none flex items-center">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt="User Avatar"
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-neonGreen cursor-pointer"
                  />
                ) : (
                  <Image
                    src="/icons/avatar-default.jpg"
                    alt="Default Avatar"
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-neonGreen cursor-pointer"
                  />
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-8 w-56 bg-black rounded-lg shadow-lg z-10 p-4 leading-8">
                  <ul className="flex flex-col space-y-1">
                    <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                      <BsFillPencilFill />
                      <span>Manage Teams</span>
                    </li>
                    <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                      <FaUserFriends />
                      <span>Friends</span>
                    </li>
                    <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                      <MdEditCalendar />
                      <span>Edit Calendar</span>
                    </li>
                    <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                      <IoMdSettings />
                      <span>Account</span>
                    </li>
                    <li className="flex items-center space-x-2 border-t border-gray-700 pt-2 text-white hover:text-gray-300 cursor-pointer">
                      <ImExit />
                      <span>Sign Out of Plaeen</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

            {/* Mobile Navigation Links */}
            {isMobileMenuOpen && (
                <div className="absolute top-0 left-0 w-full bg-black flex flex-col p-4 z-50">
                    <div className="flex justify-between items-center">
                    <Link href="/" passHref>
                        <div className="flex items-center cursor-pointer">
                        <Image src="/logo/logo-icon.svg" alt="Logo" width={50} height={50} />
                        </div>
                    </Link>
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <IoMdClose size={24} />
                    </button>
                    </div>
                    <div className="mt-8 flex flex-col space-y-2 font-extralight">
                    <NavItem href="/teams" label="Teams" />
                    <NavItem href="/friends" label="Friends" />
                    <NavItem href="/wishlist" label="Wishlist" />
                    <button className="text-white hover:text-gray-300 flex items-center relative left-4 mt-[1.25rem!important]">
                        <FaBell className="scale-[1.5] text-white" />
                        <span className="relative top-0 right-4 bg-[#6606E3] border-[2px] border-black rounded-full w-4 h-4 translate-x-1/2 -translate-y-1/2"></span>
                    </button>
                    <button onClick={toggleDropdown} className="text-white hover:text-gray-300 flex items-center relative left-3 mt-[1.5rem!important]">
                        {userAvatar ? (
                        <Image
                            src={userAvatar}
                            alt="User Avatar"
                            width={32}
                            height={32}
                            className="rounded-full border-2 border-neonGreen cursor-pointer"
                        />
                        ) : (
                        <Image
                            src="/icons/avatar-default.jpg"
                            alt="Default Avatar"
                            width={32}
                            height={32}
                            className="rounded-full border-2 border-neonGreen cursor-pointer"
                        />
                        )}
                    </button>
                    {isDropdownOpen && (
                        <div className="mt-[0px!important] relative w-full bg-black rounded-lg shadow-lg z-10 p-4 leading-8">
                        <ul className="flex flex-col space-y-1">
                            <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                            <BsFillPencilFill />
                            <span>Manage Teams</span>
                            </li>
                            <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                            <FaUserFriends />
                            <span>Friends</span>
                            </li>
                            <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                            <MdEditCalendar />
                            <span>Edit Calendar</span>
                            </li>
                            <li className="flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer">
                            <IoMdSettings />
                            <span>Account</span>
                            </li>
                            <li className="flex items-center space-x-2 border-t border-gray-700 pt-2 text-white hover:text-gray-300 cursor-pointer">
                            <ImExit />
                            <span>Sign Out of Plaeen</span>
                            </li>
                        </ul>
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
      </nav>
      {/* Ellipse Element */}
      <div style={ellipseStyles}></div>
    </div>
  );
};

export default Navbar;
