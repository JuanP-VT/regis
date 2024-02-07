/**
 * `Button` component.
 *
 * The `Button` component is a reusable component in React that renders an HTML button element.
 * It is designed to be flexible and customizable, allowing for a wide range of button styles and sizes.
 *
 * @component
 * @example
 * // Basic usage
 * <Button variant="default" size="default">Click me</Button>
 *
 * @example
 * // With a ref
 * const ref = React.createRef<HTMLButtonElement>();
 * <Button ref={ref} variant="default" size="default">Click me</Button>
 *
 * @param props - The properties that define the `Button` component.
 * @param {string} props.className - The CSS classes to apply to the component(Tailwind util-clases).
 * @param {string} props.variant - The variant of the button (e.g., 'default', 'destructive', etc.).
 * @param {string} props.size - The size of the button (e.g., 'default', 'sm', 'lg', etc.).
 * @param {boolean} props.asChild - If true, the button will be rendered as a child component.
 * @param {React.Ref<HTMLButtonElement>} ref - A ref to be attached to the button element.
 *
 * @returns {React.ElementType} The `Button` component.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
