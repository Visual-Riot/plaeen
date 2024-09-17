import * as React from "react";

import { cn } from "@/lib/utils";

// TODO: Add input styling - Default, Outline and Filled

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-16 w-full rounded-md bg-green/70 p-5 text-md text-black placeholder:text-black/70 placeholder:text-md hover:bg-green focus:bg-green autofill:shadow-[inset_0_0_0px_1000px_#5AE307] [&:not(:placeholder-shown)]:bg-green transition ease-in-out duration-300",
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
