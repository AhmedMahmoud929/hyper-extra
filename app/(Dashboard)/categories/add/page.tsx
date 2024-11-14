"use client";

import Navbar from "@/components/shared/Navbar";
import {
  CheckCircle,
  Eraser,
  ImageUp,
  Loader,
  Trash,
  Undo,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/animationVariants";
import MainWrapper from "@/components/shared/MainWrapper";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn, getErrorMsg } from "@/lib/utils";
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
import {
  useAllCategories,
  useCreateCategory,
} from "@/api/endpoints/categories";
import { Category } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Add", href: "/categories/add" },
];

const headerInfo = {
  title: "Add New Category",
  btn: {
    label: "Back To Categories",
    icon: <Undo />,
    href: "/categories",
  },
};

const FORM_STYLING = {
  inp: "border border-black/50 focus:ring-1 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-offset-0 mt-1",
  label: "font-medium",
};

export default function Page() {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const { mutate, isLoading, isError, error } = useCreateCategory();
  const router = useRouter();

  const handleMainImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files)[0];
      setImageFile(file);
      setImgUrl(URL.createObjectURL(file));
    }
  };

  const handleMainImageActions = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: string
  ) => {
    e.preventDefault();
    if (action === "reset") {
      setImgUrl("");
      setImageFile(undefined);
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCategoryName("");
    setImageFile(undefined);
    setImgUrl("");
  };

  const handleCategoryCreation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast("Category creating...", {
      description: "Please wait a second",
    });

    mutate(
      {
        name: categoryName,
        image: imageFile as File,
      },
      {
        onError: (error) => {
          console.log("ERROR IS");
          console.log(error);
          toast("Category creation failed", {
            description: "Please try again",
          });
        },
        onSuccess: (data) => {
          if (data.success) {
            setCategoryName("");
            setImgUrl("");
            setImageFile(undefined);
            toast("Category created successfully", {
              description: "We'll redirect you to categories",
            });
            router.push("/categories");
          }
        },
      }
    );
  };

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
        <motion.form
          initial="initial"
          animate="animate"
          variants={slideInFromBottom}
          custom={0.2}
          className="bg-white p-6 rounded-xl mt-4"
          onSubmit={(e) => handleCategoryCreation(e)}
        >
          {isError && (
            <p className="bg-red-200 rounded-md p-2 text-sm text-center mb-4">
              {getErrorMsg(error)}
            </p>
          )}
          {/* Details */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left */}
            <div className="flex-grow flex flex-col justify-between">
              <motion.div variants={slideInFromLeft} custom={0.2}>
                <Label htmlFor="productName" className={FORM_STYLING.label}>
                  Category Name
                </Label>
                <Input
                  id="productName"
                  placeholder="Vegetables"
                  value={categoryName}
                  disabled={isLoading}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className={FORM_STYLING.inp}
                />
              </motion.div>
              {/* Buttons */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={slideInFromLeft}
                custom={0.4}
                className="flex flex-col sm:flex-row mt-2 lg:mt-0 gap-2 justify-center"
              >
                <Button
                  className={cn(
                    "flex-grow",
                    isLoading && "opacity-80 pointer-events-none"
                  )}
                  type="button"
                  onClick={(e) => handleReset(e)}
                >
                  <Eraser />
                  Reset
                </Button>
                <Button
                  variant={"mainGreen"}
                  className={cn(
                    "flex-grow",
                    isLoading && "opacity-80 pointer-events-none"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader />
                      Loading...
                    </>
                  ) : (
                    <>
                      <CheckCircle />
                      Create
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
            {/* Icon */}
            <motion.div
              variants={slideInFromRight}
              custom={0.4}
              className="flex flex-col w-full lg:w-[400px]"
            >
              {/* Main */}
              <Label className={FORM_STYLING.label + " mt-[7px] mb-[6px]"}>
                Category Icon
              </Label>
              <div
                className={cn(
                  "relative bg-white rounded-lg border border-black/50 w-full h-[100px] group overflow-hidden",
                  isLoading && "opacity-80 pointer-events-none"
                )}
              >
                {imgUrl ? (
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
                  src={imgUrl ? imgUrl : "/images/image-placeholder.svg"}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.form>
      </motion.section>
    </MainWrapper>
  );
}
