"use client";

import Navbar from "@/components/shared/Navbar";
import { Check, CheckCircle, Trash, Undo, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/animationVariants";
import MainWrapper from "@/components/shared/MainWrapper";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Add", href: "/products/add" },
];

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<string>(
    "/placeholder.svg?height=400&width=400"
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <MainWrapper>
      <Navbar breadcrumbItems={breadcrumbItems} />

      <motion.section className="flex flex-col flex-grow overflow-y-scroll overflow-x-hidden p-[5px] sm:p-[25px]">
        {/* Header */}
        <motion.header
          initial="initial"
          animate="animate"
          className="w-full h-fit flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center"
        >
          <motion.h1
            variants={slideInFromLeft}
            className="text-2xl font-semibold mt-4 sm:mt-0"
          >
            Add New Product
          </motion.h1>
          <motion.div variants={slideInFromRight} className="flex gap-2">
            <Link href="/products">
              <Button>
                <Undo />
                Back To Products
              </Button>
            </Link>
            <Button variant="destructive" className="ml-4 px-6">
              <Trash />
              Delete
            </Button>
            <Button className="bg-custom-main hover:bg-custom-main/90 px-6">
              <CheckCircle />
              Create
            </Button>
          </motion.div>
        </motion.header>
        {/*  */}
        <form className="hidden lg:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" placeholder="Enter product name" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Enter category" />
            </div>

            <div>
              <Label htmlFor="brandName">Brand Name</Label>
              <Input id="brandName" placeholder="Enter brand name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id">ID</Label>
                <Input id="id" placeholder="Enter ID" />
              </div>
              <div>
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="regularPrice">Regular Price</Label>
                <Input
                  id="regularPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="aspect-square overflow-hidden">
              <img
                src={mainImage}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
            </Card>

            <div>
              <Label>Product Gallery</Label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-lg p-4 text-center"
              >
                <input
                  type="file"
                  id="gallery"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Label htmlFor="gallery" className="cursor-pointer">
                  Drop your images here, or browse
                  <p className="text-sm text-muted-foreground">
                    jpeg, png are allowed
                  </p>
                </Label>
              </div>

              <div className="space-y-2 mt-4">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted p-2 rounded-lg"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm">{file.name}</div>
                      <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-full" />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="default">UPDATE</Button>
              <Button variant="destructive">DELETE</Button>
              <Button variant="outline">CANCEL</Button>
            </div>
          </div>
        </form>
        {/*  */}
        <div className="hidden grid-cols-5 gap-4 mt-[10px] mb-[30px]">
          <div className="bg-white rounded-md col-span-3 p-4"></div>
          <div className="bg-white rounded-md col-span-2 p-4"></div>
        </div>
      </motion.section>
    </MainWrapper>
  );
}
