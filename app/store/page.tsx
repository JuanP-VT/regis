import { ShoppingCart, GifBox, People } from "@mui/icons-material";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

export default function Store() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center h-14 px-4 border-b lg:h-20 md:px-6">
        <nav className="hidden gap-4 md:flex lg:gap-8">
          <Link
            className="font-semibold tracking-tighter uppercase underline-on-hover"
            href="#"
          >
            Home
          </Link>
          <Link
            className="font-semibold tracking-tighter uppercase underline-on-hover"
            href="#"
          >
            About
          </Link>
          <Link
            className="font-semibold tracking-tighter uppercase underline-on-hover"
            href="#"
          >
            Contact
          </Link>
        </nav>
        <Link className="ml-auto lg:hidden" href="#">
          <GifBox className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <div className="flex items-center gap-4 ml-auto lg:gap-8 lg:ml-auto">
          <form className="hidden md:flex gap-2 lg:ml-auto">
            <Input
              className="w-[300px] text-sm appearance-none shadow-none md:w-[200px] lg:w-[300px] dark:bg-gray-950"
              placeholder="Search cut files..."
              type="search"
            />
            <Button size="sm" type="submit">
              Search
            </Button>
          </form>
          <Button className="lg:hidden" size="sm" variant="outline">
            <ShoppingCart className="w-4 h-4" />
            <span className="sr-only">Toggle cart</span>
          </Button>
          <Button className="lg:hidden" size="sm" variant="outline">
            <People className="w-4 h-4" />
            <span className="sr-only">Toggle account</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter lg:text-6xl xl:text-[7.5rem]">
            The Crafty Shop
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-2xl/relaxed xl:text-3xl/relaxed dark:text-gray-400">
            Your destination for beautiful cut files for your crafting projects
          </p>
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
                <img
                  alt="Thumbnail"
                  className="aspect-square object-cover"
                  height="180"
                  src="/placeholder.svg"
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
                <img
                  alt="Thumbnail"
                  className="aspect-square object-cover"
                  height="180"
                  src="/placeholder.svg"
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
                <img
                  alt="Thumbnail"
                  className="aspect-square object-cover"
                  height="180"
                  src="/placeholder.svg"
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
      <footer className="flex items-center justify-center h-14 border-t sm:h-20">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 The Crafty Shop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
