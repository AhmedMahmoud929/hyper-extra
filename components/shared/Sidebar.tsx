"use client";

import React from "react";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "@/constants";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../ui/button";

function Sidebar() {
  const { isSidebarOpen, isMobile, setIsSidebarOpen } = useSidebarContext();
  return (
    <aside
      className={cn(
        "absolute w-[260px] h-screen z-10 overflow-hidden bg-white duration-500 ease-in-out",
        isSidebarOpen ? "w-[260px]" : "w-[58px]",
        isMobile && "-left-full top-0 shadow-xl",
        isSidebarOpen && isMobile && "left-0"
      )}
    >
      <div className="hidden bg-gray-200 items-center gap-2 p-4">
        <div className="">
          <Image
            src="/images/sidebarLogoRounded.png"
            alt="Hyber Extra Logo"
            width={35}
            height={35}
          />
        </div>
        <h1 className=" font-semibold">Hyper Extra</h1>
      </div>

      {isMobile && (
        <div
          role="button"
          className="rounded-full w-9 h-9 flex items-center justify-center mr-2 ml-auto mt-4 hover:bg-gray-200"
        >
          <X onClick={() => setIsSidebarOpen(false)} />
        </div>
      )}

      <ul className="mt-2">
        {sidebarItems.map((item, ix) => (
          <SidebarItem key={ix} item={item} />
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
