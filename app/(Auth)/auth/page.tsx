"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Component() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth >= 1200) {
        setIsLargeScreen(true);
      }
    };
    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  return (
    <div className="relative overflow-hidden flex flex-row h-screen">
      <div
        className={cn(
          "flex flex-col h-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 duration-500",
          isLargeScreen ? "absolute" : "w-full",
          isLargeScreen && isLoginPage ? "right-[5%]" : "right-[57%]"
        )}
      >
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <HyperTextLabel />
          <div className="mt-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                {isLoginPage ? "Login to your account" : "Create an account"}
              </h1>

              <p className="text-gray-500 dark:text-gray-400">
                {isLoginPage
                  ? "Enter your credentials below to enter to your account"
                  : "Enter your email below to create your account"}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {!isLoginPage && (
                <div>
                  <Input
                    id="name"
                    placeholder="Ahmed Mahmoud"
                    required
                    type="text"
                    className="w-full"
                  />
                </div>
              )}

              <div>
                <Input
                  id="email"
                  placeholder="Name@example.com"
                  required
                  type="email"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  id="password"
                  placeholder="************"
                  required
                  type="password"
                  className="w-full"
                />
              </div>
              <Button
                className="w-full bg-custom-main hover:bg-custom-main/90"
                type="submit"
              >
                <Link href="/products" className="w-full">
                  {isLoginPage ? "Sign in" : "Sign up with Email"}
                </Link>
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    or you can
                  </span>
                </div>
              </div>
              {isLoginPage ? (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setIsLoginPage(false)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setIsLoginPage(true)}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}
              <div className="mt-4 text-center text-xs text-gray-400">
                Make sure to read our{" "}
                <Link
                  className="underline underline-offset-4 hover:text-primary"
                  href="#"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="underline underline-offset-4 hover:text-primary"
                  href="#"
                >
                  Privacy Policy
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-0 w-1/2 h-full flex-1 duration-500",
          isLargeScreen ? "flex items-center justify-center" : "hidden",
          isLargeScreen && isLoginPage ? "left-[5%]" : "left-[43%]"
        )}
      >
        {isLoginPage ? (
          <img
            src={"/images/Admin-bro.svg?" + Date.now()}
            alt="Authentication"
            className="object-cover scale-90 aspect-[16/9] inset-0 h-full"
            width={1420}
            height={0}
          />
        ) : (
          <img
            src={"/images/Queue-rafiki.svg?" + Date.now()}
            alt="Authentication"
            className="object-cover scale-95 aspect-[16/9] inset-0 h-full"
            width={1420}
            height={0}
          />
        )}

        {/* <AnimatedQueue /> */}
      </div>
    </div>
  );
}

const HyperTextLabel = ({ custome }: { custome?: string }) => (
  <div className={cn("flex items-center gap-2", custome)}>
    <svg
      className=" h-6 w-6"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
    <span className="font-semibold">Hyper Extra</span>
  </div>
);
