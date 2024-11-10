"use client";

import { useSidebarContext } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  item: { label: string; icon: React.ReactNode; href: string };
}

function SidebarItem({ item }: SidebarItemProps) {
  const { isSidebarOpen } = useSidebarContext();
  const pathnameArr = usePathname().split("/").slice(1);
  
  return (
    <li className="p-2">
      <Link
        href={item.href}
        className={cn(
          "flex items-center duration-500 ease-in-out py-2 px-4",
          isSidebarOpen ? "gap-3" : "gap-8 px-2",
          pathnameArr.includes(item.href.split("/")[1]) &&
            "bg-custom-main text-white rounded-md"
        )}
      >
        <span className="h-7 w-7 flex items-center justify-center">
          {item.icon}
        </span>
        <span className="line-clamp-1">{item.label}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
