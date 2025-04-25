import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-purple-600 text-white hover:bg-purple-700 dark:bg-dark-primary dark:text-white dark:hover:bg-dark-primary/90",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-dark-card",
      disabled:
        "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-dark-surface dark:text-dark-text-muted",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
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