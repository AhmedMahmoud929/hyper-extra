"use client";

import Navbar from "@/components/shared/Navbar";
import { PaginationCont } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { products } from "@/constants";
import { PlusCircle, Undo } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/animationVariants";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Add", href: "/products/add" },
];

export default function Home() {
  return (
    <article className="w-full flex flex-col h-screen flex-grow ">
      <Navbar breadcrumbItems={breadcrumbItems} />

      <motion.section
        
        className="flex flex-col flex-grow overflow-y-scroll overflow-x-hidden p-[5px] sm:p-[25px]"
      >
        <motion.header 
        initial="initial"
        animate="animate"
        className="w-full h-fit flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center">
          <motion.h1
            variants={slideInFromLeft}
            className="text-2xl font-semibold"
          >
            Back
          </motion.h1>
          <motion.div variants={slideInFromRight}>
            <Link href="/products">
              <Button>
                <Undo />
                Back To Products
              </Button>
            </Link>
          </motion.div>
        </motion.header>
      </motion.section>
    </article>
  );
}
