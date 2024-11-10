import Navbar from "@/components/shared/Navbar";
import { PaginationCont } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

export default function Home() {
  return (
    <article className="w-full flex flex-col flex-grow ">
      <Navbar breadcrumbItems={breadcrumbItems} />
      <section className="flex flex-grow justify-center items-center">
        TEST
      </section>
    </article>
  );
}
