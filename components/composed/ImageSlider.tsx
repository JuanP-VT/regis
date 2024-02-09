"use client";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  images: string[];
};
export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="flex w-96 p-5">
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
      <div className=" relative flex h-full w-full object-contain">
        <KeyboardArrowRight
          data-testid="right-arrow"
          className="bg-slate-100 rounded-full border p-1 absolute top-1/2 right-0 z-20"
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
          className=" bg-slate-100 rounded-full border p-1  absolute top-1/2 left-0 z-20"
          onClick={() => {
            if (currentIndex === 0) {
              setCurrentIndex(images.length - 1);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        />
        <Image
          width={800}
          height={800}
          src={images[currentIndex]}
          alt="product image"
          className="sticky top-20  w-full h-full object-cover rounded-lg"
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
      className={`mb-2  h-16 w-16 cursor-pointer object-cover rounded-md border  hover:shadow-sm hover:border-sky-300
      ${currentIndex === index && " border-sky-500"}      `}
      src={image}
      onClick={() => setCurrentIndex(index)}
      alt={`frame${index}`}
    />
  );
}
