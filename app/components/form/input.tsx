import * as React from "react";

import { cn } from "../../utils/misc";
import { Icon } from "../icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex gap-4">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border dark:border-zinc-700 bg-background dark:bg-zinc-900 p-1.5 dark:text-white text-sm ring-offset-indigo-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "url" && (
          <a
            href={(props.value as string) ?? props.defaultValue}
            className="flex items-center justify-center h-10 w-10 rounded-md border dark:border-zinc-700 bg-background dark:bg-zinc-900 p-1.5 dark:text-white text-sm ring-offset-indigo-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-800 transition-colors"
            target="_blank"
          >
            {/* <Icon name="external-link" size="md" className="text-indigo-600" /> */}
            <Icon name="external-link" size="md" className="dark:text-white" />
          </a>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
