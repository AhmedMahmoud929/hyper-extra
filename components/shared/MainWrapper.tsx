"use client";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import React from "react";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile, isSidebarOpen } = useSidebarContext();
  return (
    <main
      className={cn(
        "relative flex flex-col h-screen flex-grow duration-500 ease-in-out",
        isSidebarOpen && !isMobile
          ? "left-[260px] max-w-[calc(100%-260px)]"
          : "left-[55px] max-w-[calc(100%-55px)]",
        isMobile && "left-0 max-w-full"
      )}
    >
      {children}
    </main>
  );
}
