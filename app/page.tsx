import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import TopNav from "@/components/composed/TopNav";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-6 bg-gradient-to-l from-pink-50 to-sky-200">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter lg:text-6xl xl:text-[7.5rem]">
            Regis Design
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-2xl/relaxed xl:text-3xl/relaxed dark:text-gray-400">
            Your destination for beautiful cut files for your crafting projects
          </p>
          <Button variant="outline">Visit Store(❁´◡`❁) </Button>
        </div>
        <div className="grid gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold">Featured Cut Files</h2>
            <form className="ml-auto md:ml-auto lg:ml-auto">
              <Select>
                <SelectTrigger className="w-[150px]">
                  <span className="text-sm">Sort by: Newest</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="priceHighToLow">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="priceLowToHigh">
                    Price: Low to High
                  </SelectItem>
                </SelectContent>
              </Select>
            </form>
          </div>
          <div className="grid gap-4 md:gap-6 lg:gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-2 border p-4 rounded-lg md:flex-row md:items-start md:gap-4 md:p-6 lg:gap-2 xl:p-8 hover:shadow-lg">
              <Link
                className="aspect-square overflow-hidden rounded-lg"
                href="#"
              >
                <Image
                  alt="Thumbnail"
                  className="aspect-square object-cover"
                  height="180"
                  src="https://picsum.photos/600/1200"
                  width="180"
                />
              </Link>
              <div className="flex-1 grid gap-2 text-center md:text-left">
                <div className="space-y-1.5">
                  <h3 className="font-semibold">Floral Bundle</h3>
                  <p className="text-sm">Beautiful flowers and leaves</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">$4.99</span>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 border p-4 rounded-lg md:flex-row md:items-start md:gap-4 md:p-6 lg:gap-2 xl:p-8 hover:shadow-lg">
              <Link
                className="aspect-square overflow-hidden rounded-lg"
                href="#"
              >
                <Image
                  alt="Thumbnail"
                  className="aspect-square object-cover"
                  height="180"
                  src="https://picsum.photos/900/1200"
                  width="180"
                />
              </Link>
              <div className="flex-1 grid gap-2 text-center md:text-left">
                <div className="space-y-1.5">
                  <h3 className="font-semibold">Cute Animals</h3>
                  <p className="text-sm">Adorable animal silhouettes</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">$3.99</span>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 border p-4 rounded-lg md:flex-row md:items-start md:gap-4 md:p-6 lg:gap-2 xl:p-8 hover:shadow-lg">
              <Link
                className="aspect-square overflow-hidden rounded-lg"
                href="#"
              >
                <Image
                  alt="Thumbnail"
                  className="aspect-square object-cover"
                  height="180"
                  src="https://picsum.photos/700/1100"
                  width="180"
                />
              </Link>
              <div className="flex-1 grid gap-2 text-center md:text-left">
                <div className="space-y-1.5">
                  <h3 className="font-semibold">Elegant Frames</h3>
                  <p className="text-sm">Stylish border designs</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">$2.99</span>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
