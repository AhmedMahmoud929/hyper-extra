import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/animationVariants";
import { Button } from "../ui/button";
import Link from "next/link";

interface MainHeaderProps {
  data: {
    title: string;
    btn: {
      label: string;
      href: string;
      icon: React.ReactNode;
    };
  };
}

export default function MainHeader({ data: { title, btn } }: MainHeaderProps) {
  return (
    <motion.header
      initial="initial"
      animate="animate"
      className="w-full h-fit flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center"
    >
      <motion.h1
        variants={slideInFromLeft}
        className="text-2xl font-semibold mt-4 sm:mt-0"
      >
        {title}
      </motion.h1>
      <motion.div variants={slideInFromRight}>
        <Link href={btn.href}>
          <Button>
            {btn.icon}
            {btn.label}
          </Button>
        </Link>
      </motion.div>
    </motion.header>
  );
}
