import { CutFileProductMocks } from "@/__test__/mocks/fileProductMocks";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/composed/TopNav";
import StoreCutFileProductCard from "@/components/composed/cards/StoreCutFileProductCard";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
export default function Store() {
  return (
    <div className="flex flex-col bg-gradient-to-l from-rose-100 to-sky-100">
      <TopNav />
      <div className="flex justify-around p-2">
        <div className="flex gap-10">
          <Button variant="outline" className="rounded-xl">
            Filtros
          </Button>
          <Button variant="outline" className="rounded-xl">
            Ordenar
          </Button>
        </div>
        <Input
          className=" w-52 rounded-xl self-end "
          placeholder="Barra de búsqueda"
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2  self-center gap-2">
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
