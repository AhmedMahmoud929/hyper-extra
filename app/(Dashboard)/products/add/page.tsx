"use client";

import Navbar from "@/components/shared/Navbar";
import { CheckCircle, Eraser, ImageUp, Trash, Undo, X } from "lucide-react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/animationVariants";
import MainWrapper from "@/components/shared/MainWrapper";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import MainHeader from "@/components/shared/MainHeader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllCategories } from "@/api/endpoints/categories";
import { Category } from "@/lib/types";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Add", href: "/products/add" },
];

const headerInfo = {
  title: "Add New Product",
  btn: {
    label: "Back To Products",
    icon: <Undo />,
    href: "/products",
  },
};

const FORM_STYLING = {
  inp: "border border-black/50 focus:ring-1 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-offset-0 mt-1",
  label: "font-medium",
};

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const { data: allCategories, isLoading } = useAllCategories();

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

  const handleMainImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files)[0];
      setMainImage(URL.createObjectURL(file));
    }
  };

  const handleMainImageActions = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: string
  ) => {
    e.preventDefault();
    if (action === "reset") setMainImage("");
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {};

  return (
    <MainWrapper>
      <Navbar breadcrumbItems={breadcrumbItems} />

      <motion.section
        initial="initial"
        animate="animate"
        className="flex flex-col flex-grow overflow-y-scroll overflow-x-hidden p-[5px] sm:p-[25px]"
      >
        {/* HEADER */}
        <MainHeader data={headerInfo} />

        {/* FORM */}
        <form className="bg-white p-6 rounded-xl mt-4">
          {/* Details */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left */}
            <div className="space-y-3 flex-grow">
              <motion.div variants={slideInFromLeft} custom={0.2}>
                <Label htmlFor="productName" className={FORM_STYLING.label}>
                  Product Name
                </Label>
                <Input
                  id="productName"
                  placeholder="Lorem Ipsum"
                  className={FORM_STYLING.inp}
                />
              </motion.div>

              <motion.div variants={slideInFromLeft} custom={0.4}>
                <Label htmlFor="description" className={FORM_STYLING.label}>
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="This is a dummy description"
                  className={cn("min-h-[186px]", FORM_STYLING.inp)}
                />
              </motion.div>

              <motion.div variants={slideInFromLeft} custom={0.6}>
                <Label htmlFor="category" className={FORM_STYLING.label}>
                  Category
                </Label>
                {/* <Input
                  id="category"
                  placeholder="Friuts"
                  className={FORM_STYLING.inp}
                /> */}
                <Select>
                  <SelectTrigger className={FORM_STYLING.inp}>
                    <SelectValue placeholder="Select a categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {isLoading ? "Please Wait" : "Categories"}
                      </SelectLabel>

                      {!!allCategories &&
                        allCategories.map((cat: Category, ix: number) => (
                          <SelectItem
                            key={ix}
                            value={cat.name}
                            className="capitalize cursor-pointer"
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={slideInFromLeft} custom={0.8}>
                  <Label htmlFor="brandName" className={FORM_STYLING.label}>
                    Brand Name
                  </Label>
                  <Input
                    id="brandName"
                    placeholder="Dummy-name"
                    className={FORM_STYLING.inp}
                  />
                </motion.div>
                <motion.div variants={slideInFromLeft} custom={1.1}>
                  <Label htmlFor="stockQuantity" className={FORM_STYLING.label}>
                    Stock Quantity
                  </Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    placeholder="1820"
                    className={FORM_STYLING.inp}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={slideInFromLeft} custom={1.3}>
                  <Label htmlFor="regularPrice" className={FORM_STYLING.label}>
                    Regular Price
                  </Label>
                  <Input
                    id="regularPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={FORM_STYLING.inp}
                  />
                </motion.div>
                <motion.div variants={slideInFromLeft} custom={1.4}>
                  <Label htmlFor="salePrice" className={FORM_STYLING.label}>
                    Sale Price
                  </Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={FORM_STYLING.inp}
                  />
                </motion.div>
              </div>
            </div>
            {/* Right */}
            <motion.div
              variants={slideInFromRight}
              custom={0.4}
              className="flex flex-col w-full lg:w-[400px]"
            >
              {/* Main */}
              <Label className={FORM_STYLING.label + " mt-[7px] mb-[6px]"}>
                Product Cover
              </Label>
              <div
                className="
                relative bg-white rounded-lg border border-black/50
                w-full h-[355px] mb-6 group
                 overflow-hidden"
              >
                {mainImage ? (
                  <div className="flex gap-2 absolute top-2 right-2">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="relative"
                    >
                      <input
                        type="file"
                        name="mainImage"
                        id="mainImage"
                        accept="image/*"
                        className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0"
                        onChange={(e) => handleMainImgChange(e)}
                      />
                      <ImageUp />
                    </Button>
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      onClick={(e) => handleMainImageActions(e, "reset")}
                    >
                      <Trash />
                    </Button>
                  </div>
                ) : (
                  <input
                    type="file"
                    name="mainImage"
                    id="mainImage"
                    accept="image/*"
                    className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0"
                    onChange={(e) => handleMainImgChange(e)}
                  />
                )}
                <img
                  src={mainImage ? mainImage : "/images/image-placeholder.svg"}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gallery */}
              <div className="flex flex-col flex-grow">
                <Label className={FORM_STYLING.label}>Product Gallery</Label>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 h-[125px] border-black/35 hover:border-black/70 border-dashed rounded-lg text-center duration-300 flex-grow mt-2 p-4"
                >
                  <input
                    type="file"
                    id="gallery"
                    multiple
                    accept="image/*"
                    className="hidden w-full h-full"
                    onChange={handleFileSelect}
                  />
                  <Label
                    htmlFor="gallery"
                    className="flex flex-col flex-grow justify-center w-full h-full cursor-pointer"
                  >
                    Drop your images here, or browse
                    <p className="text-sm text-muted-foreground">
                      jpeg, png are allowed
                    </p>
                  </Label>
                </div>

                <div className="space-y-2">
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center mt-2 gap-2 bg-muted p-2 rounded-lg"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-10 h-10 object-cover rounded"
                      />

                      <div className="flex flex-col justify-center w-full h-[40px] overflow-hidden">
                        <div className="text-sm line-clamp-1 w-[90%]">
                          {file.name}
                        </div>
                        <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
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
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-8 justify-center">
                <Button className="flex-grow">
                  <Eraser />
                  Reset
                </Button>
                <Button variant={"mainGreen"} className="flex-grow">
                  <CheckCircle />
                  Create
                </Button>
              </div>
            </motion.div>
          </div>
        </form>
      </motion.section>
    </MainWrapper>
  );
}
