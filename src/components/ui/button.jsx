import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-normal"; // whitespace-normal permite quebra de texto

    const variants = {
      default:
        "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-300 dark:text-gray-200 dark:hover:bg-gray-700",
      disabled:
        "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500",
    };

    const sizes = {
      default: "h-auto min-h-[40px] px-4 py-2", // h-auto permite altura dinâmica
      sm: "h-auto min-h-[36px] rounded-md px-3 py-2", 
      lg: "h-auto min-h-[44px] rounded-md px-8 py-2",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };