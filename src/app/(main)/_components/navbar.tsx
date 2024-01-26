"use client";

import { useParams } from "next/navigation";

import { Menu } from "./menu";
import { Title } from "./title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  return (
    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
      <Title.Skeleton />
      <div className="flex items-center gap-x-2">
        <Menu.Skeleton />
      </div>
    </nav>
  );
};
