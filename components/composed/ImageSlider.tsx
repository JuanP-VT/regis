"use client";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  images: string[];
};
/**
 * This is an Image Slider component utilized within individual product pages in the store.
 * It provides a dynamic and interactive way to view product images.
 */
export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="flex   w-full border-b p-1">
      <div className=" relative mr-2  flex flex-col border-r">
        <div className="min-w-18 sticky top-16 flex flex-col pt-5 ">
          {images.map((src, index) => (
            <FrameButton
              image={src}
              setCurrentIndex={setCurrentIndex}
              currentIndex={currentIndex}
              index={index}
              key={`frame${index}`}
            />
          ))}
        </div>
      </div>
      <div className=" relative flex h-auto w-full sm:h-full sm:min-h-[500px] sm:max-w-full">
        {images.length > 1 && (
          <>
            <KeyboardArrowRight
              data-testid="right-arrow"
              className="absolute bottom-1/2  right-0 z-20 mr-2 cursor-pointer rounded-full border bg-sky-300 object-cover p-1 text-orange-800"
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
              className=" absolute bottom-1/2 left-0 z-20  ml-2 cursor-pointer rounded-full border bg-sky-300 p-1 text-orange-800"
              onClick={() => {
                if (currentIndex === 0) {
                  setCurrentIndex(images.length - 1);
                } else {
                  setCurrentIndex(currentIndex - 1);
                }
              }}
            />
          </>
        )}
        {images.map((src, index) => (
          <Image
            key={`image${index}`}
            width={900}
            height={900}
            src={src}
            alt="product image"
            className={`absolute left-0 h-auto  w-auto self-center rounded-lg object-contain transition-all duration-500 md:object-fill ${currentIndex === index ? "opacity-100" : "opacity-0"} `}
          />
        ))}
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
      className={`mb-2  h-16 w-16 cursor-pointer rounded-md border object-cover  transition-all duration-500  hover:border-sky-300 hover:shadow-sm
      ${currentIndex === index && " border-sky-500"}      `}
      src={image}
      onClick={() => setCurrentIndex(index)}
      alt={`frame${index}`}
    />
  );
}
