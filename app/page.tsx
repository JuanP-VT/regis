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
          <section className="flex w-full flex-col justify-center bg-[#e6d5c4] p-5 lg:flex-row lg:justify-around">
            <div className="flex flex-col items-center  justify-center md:flex-row">
              <Image
                className="h-40 w-64 object-contain"
                src="/hola-01.webp"
                width={600}
                height={600}
                alt="Welcome to the store"
              />
              <div className="flex flex-col text-sm">
                <Image
                  className=""
                  src="/boton tienda digital-01.svg"
                  width={230}
                  height={100}
                  alt="Welcome to the store"
                />
                <p
                  style={{ fontFamily: "Wild Mango" }}
                  className="m-2 text-center "
                >
                  Dedicada a la venta de archivos <br />
                  de corte en capas y vectores <br />
                  para tus bellos proyectos.
                </p>
                <p
                  style={{ fontFamily: "Insta Story Signature" }}
                  className="m-2 text-center"
                >
                  Conócenos
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="logo studio-01.svg"
                width={500}
                height={300}
                alt="Welcome to the store"
              />
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
