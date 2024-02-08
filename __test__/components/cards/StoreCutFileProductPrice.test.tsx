// Importing required modules and components
import { render, screen } from "@testing-library/react";
import { Price } from "../../../components/ui/composed/cards/StoreCutFileProductCard";
// Test suite for the Price component
describe("Price component", () => {
  // Test case: Check if the component correctly displays the discounted price
  test("displays discounted price correctly", () => {
    render(<Price price={100} discountPercentage={20} />);
    expect(screen.getByText(/80.00/i)).toBeInTheDocument();
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/20%off/i)).toBeInTheDocument();
  });

  // Test case: Check if the component correctly displays the regular price when there is no discount
  test("displays regular price correctly when there is no discount", () => {
    render(<Price price={100} discountPercentage={0} />);
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();
  });

  // Test case: Check if the component correctly displays the price when it is a decimal number
  test("displays price correctly when price is a decimal number", () => {
    render(<Price price={99.99} discountPercentage={0} />);
    expect(screen.getByText(/99.99/i)).toBeInTheDocument();
  });

  // Test case: Check if the component correctly displays the discounted price when the discount percentage is a decimal number
  test("displays discounted price correctly when discountPercentage is a decimal number", () => {
    render(<Price price={100} discountPercentage={19.99} />);
    expect(screen.getByText(/80.01/i)).toBeInTheDocument();
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/19.99%off/i)).toBeInTheDocument();
  });

  // Test case: Check if the component correctly displays the price when it is a very large number
  test("displays price correctly when price is a very large number", () => {
    render(<Price price={9999999999999} discountPercentage={0} />);
    expect(screen.getByText(/9999999999999.00/i)).toBeInTheDocument();
  });
});
