import { cn } from "@/lib/utils";
import * as React from "react";

type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
export function Form({children, className, ...props}: FormProps) {
  return (
    <form {...props} className={cn("space-y-4 pt-4", className)}>
      {children}
    </form>
  )
}
