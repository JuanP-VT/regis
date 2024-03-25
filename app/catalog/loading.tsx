import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const HTMLList = [];
  for (let i = 0; i < 6; i++) {
    const HTMLskeleton = (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[225px] w-[300px] rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
    HTMLList.push(HTMLskeleton);
  }
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-center border-b-2 border-b-slate-100 pb-7 text-3xl capitalize"></div>
      <div className="flex justify-center">
        <div className="flex w-full max-w-[1100px] grid-cols-1 flex-col items-center justify-center gap-2 p-5 md:grid md:grid-cols-2 lg:grid-cols-3 ">
          {HTMLList}
        </div>
      </div>
    </div>
  );
}
