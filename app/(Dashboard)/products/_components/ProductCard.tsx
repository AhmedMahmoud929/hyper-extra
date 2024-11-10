"use client";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/lib/animationVariants";
import { Product } from "@/lib/types";
import { MoreVertical, TrendingUp } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideInFromBottom}
      custom={+product.id * 0.2}
      className="bg-white rounded-xl overflow-hidden w-full"
    >
      <div className="p-4">
        <div className="flex gap-4">
          <img
            src={product.image + product.id + ".png"}
            alt={product.title}
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
                <p className="mt-1 font-medium">₹{product.price.toFixed(2)}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium w-full">Summary</h4>
          <p className="text-sm text-muted-foreground">{product.summary}</p>

          <div className="mt-4 space-y-2 border-2 py-2 px-4 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Sales</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-custom-orange" />
                <span>{product.sales}</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Remaining Products
              </span>
              <div className="flex items-center gap-2">
                <div className="h-[5px] w-20 rounded-full overflow-hidden bg-gray-200">
                  <div className="h-full w-1/2 bg-custom-orange"></div>
                </div>
                <span>{product.remainingProducts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
