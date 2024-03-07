import { CutFileProductMocks } from "@/__test__/mocks/fileProductMocks";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/composed/TopNav";
import StoreCutFileProductCard from "@/components/composed/cards/StoreCutFileProductCard";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
export default function Store() {
  return (
    <div className="flex flex-col bg-gradient-to-l from-rose-100 to-sky-100">
      <div className="flex justify-around p-2">
        <div className="flex gap-10">
          <Button variant="outline" className="rounded-xl">
            Filtros
          </Button>
          <form className="ml-auto md:ml-auto lg:ml-auto">
            <Select>
              <SelectTrigger className="w-[100px]">
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
        <Input
          className=" max-w-52 self-end rounded-xl "
          placeholder="Barra de búsqueda"
        />
      </div>
      <div className="grid gap-2 self-center p-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
        {CutFileProductMocks.map((cutFileProduct, index) => (
          <StoreCutFileProductCard
            cutFileProduct={cutFileProduct}
            key={`cutFile${index}`}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
