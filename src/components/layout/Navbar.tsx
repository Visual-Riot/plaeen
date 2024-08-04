// components/layout/Navbar.tsx
import Image from 'next/image';
import { FC, useState, useEffect, useRef } from 'react';
import { GoBell } from 'react-icons/go';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import NavItem from './NavItem';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image src="/logo/logo-icon.svg" alt="Logo" width={50} height={50} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Navigation Links and Icons */}
        <div className={`md:flex items-center justify-end space-x-6 w-full ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <NavItem href="/teams" label="Teams" />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavItem href="/friends" label="Friends" />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavItem href="/wishlist" label="Wishlist" />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button className="text-white hover:text-gray-300">
                  <GoBell className="scale-[2]" />
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem ref={dropdownRef}>
                <button onClick={toggleDropdown} className="focus:outline-none flex items-center">
                  <NavigationMenuTrigger>
                    <Image
                      src="/path-to-user-avatar.jpg"
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full border border-neonGreen cursor-pointer"
                    />
                  </NavigationMenuTrigger>
                </button>
                {isDropdownOpen && (
                  <NavigationMenuContent className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-10">
                    <NavigationMenuList className="flex flex-col">
                      <NavigationMenuItem>
                        <NavItem href="/manage-teams" label="Manage Teams" />
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavItem href="/friends" label="Friends" />
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavItem href="/edit-calendar" label="Edit Calendar" />
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavItem href="/account" label="Account" />
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavItem href="/sign-out" label="Sign Out of Plaeen" />
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
