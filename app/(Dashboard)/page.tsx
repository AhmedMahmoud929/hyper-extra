import Navbar from "@/components/shared/Navbar";

const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

export default function Page() {
  return (
    <article className="w-full flex flex-col flex-grow ">
      <Navbar breadcrumbItems={breadcrumbItems} />
      <section className="flex flex-grow justify-center items-center">
        TEST
      </section>
    </article>
  );
}
