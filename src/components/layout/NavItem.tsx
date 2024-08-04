import Link from 'next/link';
import { FC } from 'react';

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  return (
    <Link href={href}>
      <span className="text-white hover:text-gray-300 cursor-pointer block px-4 py-2 md:inline-block md:px-0 md:py-0">
        {label}
      </span>
    </Link>
  );
};

export default NavItem;
