import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="flex w-full  flex-col items-center  justify-center self-center sm:mt-10 md:flex-row">
      <div className="flex w-full max-w-[500px] flex-col items-center gap-y-5 px-5 py-10 md:order-1">
        <Skeleton className="h-6 w-full bg-slate-400 sm:w-96  " />
        <Skeleton className="h-6 w-full bg-slate-400 sm:w-96 " />
        <Skeleton className="h-6 w-full bg-slate-400 sm:w-96 " />
      </div>
      <Skeleton className=" h-96 w-96 bg-slate-400 sm:w-[500px]" />
    </div>
  );
}
