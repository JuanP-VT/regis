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
import { Rainbow } from "lucide-react";
import RainbowText from "@/components/RainbowText";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grid flex-1 gap-4 bg-gradient-to-l from-pink-50 to-sky-200 p-4 md:gap-8 md:p-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <RainbowText content="Regis Design" />
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-2xl/relaxed xl:text-3xl/relaxed">
            Your destination for beautiful cut files for your crafting projects
          </p>
          <Button variant="outline">Visit Store(❁´◡`❁) </Button>
        </div>
        <div className="grid gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold">Featured Cut Files</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:shadow-lg md:flex-row md:items-start md:gap-4 md:p-6 lg:gap-2 xl:p-8">
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
              <div className="grid flex-1 gap-2 text-center md:text-left">
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
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:shadow-lg md:flex-row md:items-start md:gap-4 md:p-6 lg:gap-2 xl:p-8">
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
              <div className="grid flex-1 gap-2 text-center md:text-left">
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
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:shadow-lg md:flex-row md:items-start md:gap-4 md:p-6 lg:gap-2 xl:p-8">
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
              <div className="grid flex-1 gap-2 text-center md:text-left">
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
