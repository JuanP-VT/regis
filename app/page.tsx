import Footer from "@/components/Footer";
import { SparklesCore } from "@/components/Sparkles";
import CategoryNav from "@/components/composed/CategoryNav";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import { categoryModel } from "@/lib/models/category";
import { Category_ID } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  try {
    await dbConnect();
    const categoryData = (await categoryModel.find({}).lean()) as Category_ID[];
    const categoryList = JSON.parse(JSON.stringify(categoryData));
    return (
      <div>
        <div className="relative">
          <SparklesCore
            particleDensity={50}
            particleColor="#912c1e"
            background="#fffcfa"
            className="absolute -z-10 h-full w-full "
          />
          <div className="">
            <CategoryNav categoryList={categoryList} />

            <div className="relative flex w-full flex-col items-center justify-center pt-5">
              <Image
                priority={true}
                src="/banner.webp"
                alt="logo"
                width={2000}
                height={1200}
                className="  mb-5 h-60    self-center object-cover  object-left  lg:h-96    lg:object-contain lg:object-center"
              />
            </div>
          </div>
        </div>
        <div className=" rounded-lg bg-zinc-200">
          <section className="group w-full">
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
                <div className="space-y-2">
                  <div className="mt-2 inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm transition-all duration-1000 group-hover:bg-sky-200 dark:bg-gray-800">
                    Archivos Digitales
                  </div>
                  <h1 className="pt-2 text-3xl font-bold tracking-tighter sm:text-5xl">
                    Los Mejores Diseños
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    En Regis&GaelStudio creamos los mejores diseños para ti, con
                    la mejor calidad y al mejor precio. <br /> ¡Visita nuestra
                    tienda!
                  </p>
                  <Link href={"/catalog/category=&subCategory=&page=1"}>
                    <Button
                      size={"sm"}
                      className="  mt-3  bg-rose-400 text-xs hover:bg-sky-400 md:px-16"
                    >
                      Visitar Tienda
                    </Button>
                  </Link>
                </div>
                <Image
                  alt="Banner"
                  className="aspect-video overflow-hidden rounded-full object-contain object-center p-3 "
                  height="450"
                  src="/logo.jfif"
                  width="600"
                />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Error Interno</div>;
  }
}
