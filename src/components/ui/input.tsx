import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

// TODO: Add input styling - Default, Outline and Filled

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "flex h-12 sm:h-14 md:h-16 w-full p-3 md:p-5 text-xs sm:text-sm md:text-base text-black rounded-md placeholder:text-black/50",
  {
    variants: {
      variant: {
        default: "linear-gradient(180deg, #6606E3 0%, #330372 100%)",
        greenFilled:
          "bg-green/70 hover:bg-green focus:bg-green autofill:shadow-[inset_0_0_0px_1000px_#5AE307] [&:not(:placeholder-shown)]:bg-green transition ease-in-out duration-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
