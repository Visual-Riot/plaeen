import { FC, ReactNode } from 'react';

export const NavigationMenu: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="relative">{children}</div>
);

export const NavigationMenuList: FC<{ children: ReactNode }> = ({ children }) => (
  <ul className="flex space-x-12 font-light items-center">{children}</ul>
);

export const NavigationMenuItem: FC<{ children: ReactNode }> = ({ children }) => (
  <li className="relative">{children}</li>
);

export const NavigationMenuTrigger: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`text-white ${className}`}>{children}</div>
);

export const NavigationMenuContent: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`absolute mt-2 ${className}`}>{children}</div>
);
