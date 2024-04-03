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
    const categoryList = (await categoryModel.find({}).lean()) as Category_ID[];
    return (
      <div className="">
        <CategoryNav categoryList={categoryList} />

        <div className="relative mt-3 flex w-full flex-col items-center justify-center">
          <SparklesCore
            particleDensity={200}
            particleColor="#9dbac3"
            background="#f8fafc"
            className="absolute -z-10 h-full w-full "
          />

          <Image
            src="/banner.jpg"
            alt="logo"
            width={3200}
            height={800}
            className="z-10  self-center  rounded-lg object-cover object-left pt-5 sm:h-64 sm:object-contain    sm:object-center"
          />

          <Link href={"/catalog/category=&subCategory=&page=1"} className="p-2">
            <Button
              size={"sm"}
              className="  bottom-0  z-10 transform  bg-rose-500 hover:bg-sky-400 md:px-16"
            >
              Visitar Tienda
            </Button>
          </Link>
        </div>
        <div className="relative "></div>
        <div className="mt-2 rounded-lg bg-zinc-200">
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
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Error Interno</div>;
  }
}
