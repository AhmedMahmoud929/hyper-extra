"use client";

import MainHeader from "@/components/shared/MainHeader";
import MainWrapper from "@/components/shared/MainWrapper";
import Navbar from "@/components/shared/Navbar";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

import CategoriesTable from "./dataTable";
import { useAllCategories } from "@/api/endpoints/categories";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMsg } from "@/lib/utils";
import { slideInFromBottom } from "@/lib/animationVariants";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Categories", href: "/categories" },
];

const headerInfo = {
  title: "All Categories",
  btn: {
    label: "Add New Category",
    icon: <PlusCircle />,
    href: "/categories/add",
  },
};

export default function Page() {
  const { data: allCategories, isLoading, isError, error } = useAllCategories();

  return (
    <MainWrapper>
      <Navbar breadcrumbItems={breadcrumbItems} />

      <motion.section
        initial="initial"
        animate="animate"
        className="flex flex-col flex-grow overflow-hidden p-[5px] sm:p-[25px]"
      >
        <MainHeader data={headerInfo} />

        <div className="mt-4 h-full">
          <AnimateWrapper condition={isLoading} delay={0.3}>
            <CategoriesLoader />
          </AnimateWrapper>

          <AnimateWrapper condition={isError} delay={0.3}>
            <CategoriesError message={getErrorMsg(error)} />
          </AnimateWrapper>

          <AnimateWrapper condition={!!allCategories}>
            <CategoriesTable categories={allCategories} />
          </AnimateWrapper>
        </div>
      </motion.section>
    </MainWrapper>
  );
}

const CategoriesLoader = ({ rowsCount = 6 }) => (
  <div className="w-full h-full space-y-4">
    <Skeleton className="w-full h-10 rounded-md bg-gray-300" />

    {[...Array(rowsCount)].map((_, ix) => (
      <Skeleton key={ix} className="w-full h-16 rounded-md bg-gray-200" />
    ))}
  </div>
);

const CategoriesError = ({ message }: { message: string }) => (
  <div className="w-full h-full mx-auto space-y-4">
    <h1 className="text-xl text-center text-red-800 px-8 py-4 rounded-md bg-red-200">
      {message}
    </h1>
  </div>
);

const AnimateWrapper = ({
  children,
  condition,
  delay,
}: {
  children: React.ReactNode;
  condition: boolean;
  delay?: number;
}) => {
  return (
    <>
      {condition && (
        <AnimatePresence>
          <motion.div
            initial="initial"
            animate="animate"
            variants={slideInFromBottom}
            custom={delay}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
