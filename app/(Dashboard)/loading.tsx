import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <div className="flex gap-4 h-screen p-4">
      <Skeleton className="w-[260px] h-full" />
      <div className="flex flex-col gap-4 flex-grow">
        <Skeleton className="w-full h-[8%]" />
        <div className="flex gap-4 h-[25%]">
          <Skeleton className="w-1/4 h-full" />
          <Skeleton className="w-3/4 h-full" />
        </div>
        <div className="flex gap-4 h-[24%]">
          <Skeleton className="w-1/2 h-full" />
          <Skeleton className="w-1/2 h-full" />
        </div>
        <div className="flex gap-4 h-[25%]">
          <Skeleton className="w-5/6 h-full" />
          <Skeleton className="w-1/6 h-full" />
        </div>
        <Skeleton className="w-full h-[8%]" />
      </div>
    </div>
  );
}

export default Loading;
