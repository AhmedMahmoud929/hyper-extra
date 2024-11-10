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

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
];

export default function Home() {
  const itemsCount = 3; // Total number of pages
  const currentPage = 2; // Current active page
  const visibleItems = 3; // Number of items to display in pagination
  const baseUrl = "/pages"; // Base URL for the pagination links

  return (
    <article className="w-full flex flex-col h-screen flex-grow ">
      <Navbar breadcrumbItems={breadcrumbItems} />

      <motion.section className="flex flex-col flex-grow overflow-y-scroll overflow-x-hidden p-[5px] sm:p-[25px]">
        <motion.header
          initial="initial"
          animate="animate"
          className="w-full h-fit flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center"
        >
          <motion.h1
            variants={slideInFromLeft}
            className="text-2xl font-semibold"
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-[20px] mb-[30px]">
          {products.map((product, ix) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <PaginationCont
          itemsCount={itemsCount}
          currentPage={currentPage}
          visibleItems={visibleItems}
          baseUrl={baseUrl}
        />
      </motion.section>
    </article>
  );
}
