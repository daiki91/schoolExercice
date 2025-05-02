
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    // Pour éviter l'erreur #137, assurons-nous qu'on n'a pas à la fois value et defaultValue
    const textareaProps = { ...props };
    if ('value' in textareaProps && 'defaultValue' in textareaProps) {
      delete textareaProps.defaultValue;
    }
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...textareaProps}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
