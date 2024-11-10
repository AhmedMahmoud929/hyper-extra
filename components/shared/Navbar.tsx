"use client";

import { Sidebar, Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebarContext } from "@/contexts/SidebarContext";

interface NavbarProps {
  breadcrumbItems: {
    label: string;
    href: string;
  }[];
}

function Navbar({ breadcrumbItems }: NavbarProps) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  return (
    <div className="h-16 py-5 px-4 border-b w-full flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Sidebar
          role="button"
          className="text-gray-400 -mt-1"
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
    </div>
  );
}

export default Navbar;
