"use client";
import Navbar from "@/components/shared/Navbar";
import { PaginationCont } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { products } from "@/constants";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/animationVariants";
import ProductCard from "./_components/ProductCard";
import Link from "next/link";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import MainWrapper from "@/components/shared/MainWrapper";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
];

export default function Page() {
  const itemsCount = 3;
  const currentPage = 2;
  const visibleItems = 3;
  const baseUrl = "/pages";

  return (
    <MainWrapper>
      <Navbar breadcrumbItems={breadcrumbItems} />
      <motion.section className="flex w-full flex-col flex-grow overflow-y-scroll overflow-x-hidden p-[5px] sm:p-[25px]">
        <motion.header
          initial="initial"
          animate="animate"
          className="w-full h-fit flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center"
        >
          <motion.h1
            variants={slideInFromLeft}
            className="text-2xl font-semibold mt-4 sm:mt-0"
          >
            All Products
          </motion.h1>
          <motion.div variants={slideInFromRight}>
            <Link href="/products/add">
              <Button>
                <PlusCircle />
                Add New Product
              </Button>
            </Link>
          </motion.div>
        </motion.header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 mt-[20px] mb-[30px]">
          {products.map((product, ix) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* <ProductCard key={product.id} product={product} /> */}
        </div>
        <PaginationCont
          itemsCount={itemsCount}
          currentPage={currentPage}
          visibleItems={visibleItems}
          baseUrl={baseUrl}
        />
      </motion.section>
    </MainWrapper>
  );
}
