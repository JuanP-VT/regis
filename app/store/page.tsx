import { CutFileProductMocks } from "@/__test__/mocks/fileProductMocks";
import { Button } from "@/components/ui/button";
import StoreCutFileProductCard from "@/components/ui/composed/cards/StoreCutFileProductCard";
import { Input } from "@/components/ui/input";
export default function Store() {
  return (
    <div className="flex flex-col p-5 bg-gradient-to-r from-fuchsia-100 to-sky-100">
      <div className="flex justify-around">
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
    </div>
  );
}
