"use client";

import MainWrapper from "@/components/shared/MainWrapper";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "React Query", href: "/reactQuery" },
];

function Page() {
  return (
    <MainWrapper>
      <Navbar breadcrumbItems={breadcrumbItems} />
      <Button>Add User</Button>
    </MainWrapper>
  );
}

export default Page;

/*

 
 
 

*/
