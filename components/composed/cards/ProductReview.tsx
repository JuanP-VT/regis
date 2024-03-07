import StarIcon from "@/components/ui/custom svg/StarIcon";
import Image from "next/image";
import { ThumbUp } from "@mui/icons-material";
type Props = {};

export default function ProductReview({}: Props) {
  return (
    <div className="mt-5 flex flex-col rounded-lg border-b border-pink-100 p-3">
      <div className="mt-2 flex items-center text-xs">
        <Image
          src="https://picsum.photos/50/50"
          alt="profile"
          width={50}
          height={50}
          className="h-10 w-10 rounded-full"
        />
        <p className="ml-3 border-b">John Doe Express</p>
        <p className="ml-3">August 10, 2024</p>
      </div>
      <div className="ml-12 flex">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <StarIcon className="h-5 w-5 text-rose-400" key={index} />
          ))}
      </div>
      <p className="py-1 text-sm">
        Grant program works wonderfully looks great,Grant program works
        wonderfully looks great,Grant program works wonderfully looks great
        Grant program works wonderfully looks greatGrant program works
        wonderfully looks great
      </p>

      <div className="flex w-min cursor-pointer  items-center gap-2 rounded-lg p-2 text-xs font-bold hover:bg-slate-300 ">
        <ThumbUp className="h-4 w-4 text-rose-400" />
        Like
      </div>
    </div>
  );
}
