import MainWrapper from "@/components/shared/MainWrapper";
import Navbar from "@/components/shared/Navbar";

const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

export default function Page() {
  return (
    <MainWrapper>
      <Navbar breadcrumbItems={breadcrumbItems} />
      <section className="flex flex-grow justify-center items-center">
        TEST
      </section>
    </MainWrapper>
  );
}
