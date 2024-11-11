"use client";

import { useState } from "react";
import { Bell, Search, Sidebar, Slash, Menu, X } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

interface NavbarProps {
  breadcrumbItems: {
    label: string;
    href: string;
  }[];
}

export default function Navbar({ breadcrumbItems }: NavbarProps) {
  const { isMobile, isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-16 py-5 px-4 md:px-6 border-b w-full flex items-center justify-between bg-white">
      {!isMobile && (
        <div className="absolute -left-4 -top-2/6 h-[120%] w-3 bg-gray-200 blur-md"></div>
      )}
      {/* LEFT */}
      <div className="flex items-center gap-4 md:gap-6">
        <Sidebar
          role="button"
          className="text-gray-400 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            {breadcrumbItems.map((ele, ix) => (
              <div key={ix} className="flex gap-2 items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink href={ele.href}>{ele.label}</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems.length > ix + 1 && (
                  <BreadcrumbSeparator>
                    <Slash className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div
          role="button"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-[26px] w-[26px] text-gray-400" />
          ) : (
            <Menu className="h-[26px] w-[26px] text-gray-400" />
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <div className="flex items-center gap-4 border-r-2 border-custom-iconGray pr-4">
          <Search
            role="button"
            className="text-custom-iconGray cursor-pointer"
          />
          <div className="relative">
            <div className="absolute -top-[2px] right-[1px] bg-custom-main w-[10px] h-[10px] rounded-full"></div>
            <Bell
              role="button"
              className="text-custom-iconGray cursor-pointer"
            />
          </div>
        </div>
        {/* Avatar */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80%] w-[75%] left-[15%] right-0 bg-white border-b shadow-lg border md:hidden">
          <div className="p-4">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((ele, ix) => (
                  <div key={ix} className="flex gap-2 items-center">
                    <BreadcrumbItem>
                      <BreadcrumbLink href={ele.href}>
                        {ele.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {breadcrumbItems.length > ix + 1 && (
                      <BreadcrumbSeparator>
                        <Slash className="h-4 w-4" />
                      </BreadcrumbSeparator>
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}
    </div>
  );
}
