/**
 * @file This file contains tests for the ImageSlider component.
 */

// Import necessary libraries and components
import { render, screen, fireEvent } from "@testing-library/react";
import ImageSlider from "../../../components/composed/ImageSlider";

/**
 * Test suite for ImageSlider component
 */
describe("ImageSlider component", () => {
  // Array of image URLs to be used in the tests
  const images = [
    "https://placehold.co/600x400",
    "https://placehold.co/600x600",
    "https://placehold.co/600x700",
    "https://placehold.co/600x800",
    "https://placehold.co/600x900",
  ];

  /**
   * Test if all images are rendered as FrameButton components
   */
  test("renders all images as FrameButton components", () => {
    render(<ImageSlider images={images} />);
    images.forEach((image, index) => {
      // Check if each image is in the document
      expect(screen.getByAltText(`frame${index}`)).toBeInTheDocument();
    });
  });

  /**
   * Test if the first image is displayed initially
   */
  test("displays the first image initially", () => {
    render(<ImageSlider images={images} />);
    const displayedImage = screen.getByAltText(
      "product image"
    ) as HTMLImageElement;
    // Check if the first image is displayed
    expect(displayedImage.src).toContain("600x400");
  });

  /**
   * Test if the image changes when the right arrow is clicked
   */
  test("changes image when right arrow is clicked", () => {
    render(<ImageSlider images={images} />);
    const rightArrow = screen.getByTestId("right-arrow");
    fireEvent.click(rightArrow);
    const displayedImage = screen.getByAltText(
      "product image"
    ) as HTMLImageElement;
    // Check if the second image is displayed after clicking the right arrow
    expect(displayedImage.src).toContain("600x600");
  });

  /**
   * Test if the image loops back to the last image when the left arrow is clicked on the first image
   */
  test("loops back to the last image when left arrow is clicked on the first image", () => {
    render(<ImageSlider images={images} />);
    const leftArrow = screen.getByTestId("left-arrow");
    fireEvent.click(leftArrow);
    const displayedImage = screen.getByAltText(
      "product image"
    ) as HTMLImageElement;
    // Check if the last image is displayed after clicking the left arrow on the first image
    expect(displayedImage.src).toContain("600x900");
  });

  /**
   * Test if the image loops back to the first image when the right arrow is clicked on the last image
   */
  test("loops back to the first image when right arrow is clicked on the last image", () => {
    render(<ImageSlider images={images} />);
    const rightArrow = screen.getByTestId("right-arrow");
    for (let i = 0; i < images.length; i++) {
      fireEvent.click(rightArrow);
    }
    const displayedImage = screen.getByAltText(
      "product image"
    ) as HTMLImageElement;
    // Check if the first image is displayed after clicking the right arrow on the last image
    expect(displayedImage.src).toContain("600x400");
  });
});
