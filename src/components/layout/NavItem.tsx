import Link from 'next/link';
import { FC } from 'react';

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
}

const NavItem: FC<NavItemProps> = ({ href, label, className }) => {
  return (
    <Link href={href}>
      <span className={`text-white hover:text-gray-300 block px-4 py-2 md:px-0 md:py-0 ${className}`}>
        {label}
      </span>
    </Link>
  );
};

export default NavItem;
