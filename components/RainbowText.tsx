"use client";
/**

 * This component displays text with a color transition effect. The color of the text changes every second, cycling through a predefined list of colors.
 */
import { useEffect, useState } from "react";

type Props = {
  content: string;
};
/**
 * A list of CSS classes representing different text colors.
 * The RainbowText component cycles through these colors.
 */
const bgClassList = [
  "text-fuchsia-500",
  "text-pink-500",
  "text-rose-500",
  "text-red-500",
  "text-orange-500",
  "text-amber-500",
  "text-yellow-500",
  "text-lime-500",
  "text-green-500",
  "text-emerald-500",
  "text-teal-500",
  "text-sky-500",
  "text-blue-500",
  "text-indigo-500",
  "text-violet-500",
  "text-purple-500",
];
export default function RainbowText({ content }: Props) {
  /**
  Set up an interval to change the background color every second
  The interval is cleared when the component is unmounted
  The currentIndex state variable is used to keep track of the current color
 */

  useEffect(() => {
    const intervalBackgroundColor = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bgClassList.length); // 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5...
    }, 1000);
    return () => {
      clearInterval(intervalBackgroundColor);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className={`${bgClassList[currentIndex]} transition-colors duration-1000 antialiased 
      p-2 rounded-lg text-3xl font-bold tracking-tighter lg:text-6xl xl:text-[7.5rem]`}
    >
      {content}
    </div>
  );
}
