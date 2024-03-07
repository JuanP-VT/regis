"use client";
import {
  FavoriteBorderOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  images: string[];
};
export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="flex w-full border-b p-1">
      <div className=" relative mr-2  flex flex-col border-r">
        <div className="sticky top-14 ">
          {images.map((str, index) => (
            <FrameButton
              image={str}
              setCurrentIndex={setCurrentIndex}
              currentIndex={currentIndex}
              index={index}
              key={`frame${index}`}
            />
          ))}
        </div>
      </div>
      <div className=" relative flex h-full w-full ">
        <FavoriteBorderOutlined className="absolute right-0 top-0 z-20 m-3 cursor-pointer rounded-full border bg-slate-100 p-1" />
        <KeyboardArrowRight
          data-testid="right-arrow"
          className="absolute right-0 top-1/2 z-20 mr-2 cursor-pointer rounded-full border bg-slate-100 p-1"
          onClick={() => {
            if (currentIndex === images.length - 1) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex + 1);
            }
          }}
        />
        <KeyboardArrowLeft
          data-testid="left-arrow"
          className=" absolute left-0 top-1/2 z-20  ml-2 cursor-pointer rounded-full border bg-slate-100 p-1"
          onClick={() => {
            if (currentIndex === 0) {
              setCurrentIndex(images.length - 1);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        />
        <Image
          width={700}
          height={700}
          src={images[currentIndex]}
          alt="product image"
          className="sticky top-20 w-full rounded-lg object-cover lg:w-[700px]"
        />
      </div>
    </div>
  );
}

type ImageFrameProps = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  image: string;
  index: number;
};

function FrameButton({
  currentIndex,
  image,
  setCurrentIndex,
  index,
}: ImageFrameProps) {
  return (
    <Image
      width={200}
      height={200}
      className={`mb-2  h-16 w-16 cursor-pointer rounded-md border object-cover  hover:border-sky-300 hover:shadow-sm
      ${currentIndex === index && " border-sky-500"}      `}
      src={image}
      onClick={() => setCurrentIndex(index)}
      alt={`frame${index}`}
    />
  );
}
