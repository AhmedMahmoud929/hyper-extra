"use client";

import { Bell, Search, Sidebar, Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface NavbarProps {
  breadcrumbItems: {
    label: string;
    href: string;
  }[];
}

function Navbar({ breadcrumbItems }: NavbarProps) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  return (
    <div className="h-16 py-5 px-6 pr-10 border-b w-full flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Sidebar
          role="button"
          className="text-gray-400"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((ele, ix) => (
              <div key={ix} className="flex gap-2 items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink href={ele.href}>{ele.label}</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems.length > ix + 1 && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <div className="flex items-center gap-4 border-r-2 border-custom-iconGray pr-4">
          <Search role="button" className="text-custom-iconGray" />
          <div className="relative">
            <div className="absolute -top-[2px] right-[1px] bg-custom-main w-[10px] h-[10px] rounded-full"></div>
            <Bell role="button" className="text-custom-iconGray" />
          </div>
        </div>
        {/* Avatar */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8" role="button">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Profile */}
              <DropdownMenuItem className="w-full cursor-pointer hover:bg-gray-100">
                <User />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              {/* Settings */}
              <DropdownMenuItem className="w-full cursor-pointer hover:bg-gray-100">
                <Settings />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              {/* Logout */}
              <Link href="/logout">
                <DropdownMenuItem className="w-full cursor-pointer text-red-700 hover:bg-red-100/30">
                  <LogOut />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
