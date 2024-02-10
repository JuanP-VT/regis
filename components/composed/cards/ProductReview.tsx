import StarIcon from "@/components/ui/custom svg/StarIcon";
import Image from "next/image";
import { ThumbUp } from "@mui/icons-material";
type Props = {};

export default function ProductReview({}: Props) {
  return (
    <div className="flex flex-col mt-5 border-b border-pink-100 p-3 rounded-lg">
      <div className="flex text-xs items-center mt-2">
        <Image
          src="https://picsum.photos/50/50"
          alt="profile"
          width={50}
          height={50}
          className="rounded-full h-10 w-10"
        />
        <p className="ml-3 border-b">John Doe Express</p>
        <p className="ml-3">August 10, 2024</p>
      </div>
      <div className="flex ml-12">
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

      <div className="flex text-xs font-bold  gap-2 items-center rounded-lg cursor-pointer hover:bg-slate-300 w-min p-2 ">
        <ThumbUp className="h-4 w-4 text-rose-400" />
        Like
      </div>
    </div>
  );
}
