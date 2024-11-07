import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        dangeroutline:
          "text-white border-[#D2042D] border text-[#D2042D] hover:bg-[#D2042D] active:scale-90 transition hover:text-white",
        sizebutton:
          "text-black border-[#E6E6E6] border hover:bg-[#E9F5FF] active:scale-90 transition rounded-full",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-90 transition",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        danger:
          "text-white bg-[#D2042D] hover:bg-red-600 active:scale-90 transition hover:text-white ",
        primary:
          "focus:outline-none rounded capitalize bg-[#85C525] hover:bg-[#7CB821] text-white font-medium  active:scale-90 transition text-sm",
        primary_button:
          "focus:outline-none rounded capitalize bg-[#1C4990] hover:bg-[#0068C4] text-white font-medium  active:scale-90 transition text-sm",
        disable:
          "focus:outline-none capitalize bg-[#1C4990] opacity-50 hover:bg-[#0068C4] text-white font-medium  active:scale-90 transition text-sm",
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

const Button = React.forwardRef(
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
