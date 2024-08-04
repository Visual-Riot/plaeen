import { FC, ReactNode } from 'react';
import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';

interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ children }) => {
  return (
    <NavigationMenu>
      <NavigationMenuTrigger className="focus:outline-none">
        <img
          src="/path-to-user-avatar.jpg"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border border-neonGreen cursor-pointer"
        />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-10">
        <NavigationMenuList>
          {children}
        </NavigationMenuList>
      </NavigationMenuContent>
    </NavigationMenu>
  );
};

export default DropdownMenu;
