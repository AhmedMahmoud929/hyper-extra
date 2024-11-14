"use client";
import Navbar from "@/components/shared/Navbar";

import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animationVariants";
import ProductCard from "./_components/ProductCard";
import MainWrapper from "@/components/shared/MainWrapper";
import { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import MainHeader from "@/components/shared/MainHeader";
import { useAllProducts } from "@/api/endpoints/products";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
];

const headerInfo = {
  title: "All Product",
  btn: {
    label: "Add New Product",
    icon: <PlusCircle />,
    href: "/products/add",
  },
};

export default function Page() {
  const { data, isLoading } = useAllProducts();

  return (
    <MainWrapper>
      <Navbar breadcrumbItems={breadcrumbItems} />
      <motion.section className="flex w-full flex-col flex-grow overflow-y-scroll overflow-x-hidden p-[5px] sm:p-[25px]">
        {/* HEADER */}
        <MainHeader data={headerInfo} />

        {/* LOADER */}
        {isLoading && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 mt-[20px] mb-[30px]">
            {"123456789".split("").map((_, ix) => (
              <motion.div
                key={ix}
                initial="initial"
                animate="animate"
                variants={fadeIn}
              >
                <Skeleton className="rounded-xl bg-gray-200 h-[270px] w-full" />
              </motion.div>
            ))}
          </div>
        )}

        {/* PRODUCTS & PAGINATION */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 mt-[20px] mb-[30px]">
              {data.productList.map((product: Product, ix: number) => (
                <ProductCard key={product._id} ix={ix} product={product} />
              ))}
            </div>

            {/* <PaginationCont
              totalItems={data.pagination.totalItems}
              totalPages={data.pagination.totalPages}
              currentPage={data.pagination.currentPage}
              pageSize={data.pagination.pageSize}
              baseUrl="/products"
            /> */}
          </>
        )}
      </motion.section>
    </MainWrapper>
  );
}
