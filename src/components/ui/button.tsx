import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-white transition-colors ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: " bg-green font-semiBold text-black hover:bg-green/80",
        outline:
          " border-lightGrey hover:border-lightPurple hover:text-lightPurple border-2 text-lightGrey",
        social:
          "text-white/80 font-light border-4 border-green border-opacity-50 hover:border-opacity-100 hover:text-white",
        link: "text-lightGrey underline-offset-4 hover:underline",

        // ** SHADCN UI DEFAULT STYLINGS
        // destructive:
        //   "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        // secondary:
        //   "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        // ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm sm:text-base",
        sm: "h-5 sm:h-6 md:h-7 sm:h-8 md:h-9 rounded-md px-3 text-xs sm:text-sm",
        lg: "h-9 sm:h-10 md:h-11 rounded-md px-8 text-base sm:text-lg",
        icon: "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10",
        full: "h-12 sm:h-14 md:h-16 w-full p-3 md:p-5 text-sm sm:text-base",
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
