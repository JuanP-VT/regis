/**
 * `Input` component.
 *
 * The `Input` component is a reusable component in React that renders an HTML input element.
 * It is designed to be flexible and customizable, allowing for a wide range of input types and styles.
 *
 * @component
 * @example
 * // Basic usage
 * <Input type="text" placeholder="Enter text here" />
 *
 * @example
 * // With a ref
 * const ref = React.createRef<HTMLInputElement>();
 * <Input ref={ref} type="text" placeholder="Enter text here" />
 *
 * @param props - The properties that define the `Input` component.
 * @param {string} props.className - The CSS classes to apply to the component (Tailwind util-classes).
 * @param {string} props.type - The type of input (e.g., 'text', 'password', etc.).
 * @param {React.Ref<HTMLInputElement>} ref - A ref to be attached to the input element.
 *
 * @returns {React.ElementType} The `Input` component.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
