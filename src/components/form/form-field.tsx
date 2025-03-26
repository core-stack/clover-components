import { cn } from "@/lib/utils";
import { CircleHelpIcon } from "lucide-react";
import * as React from "react";

import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

import { FormError } from "./form-error";

type FormFieldProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
  error?: string | string[];
  showAllErrors?: boolean;
  name?: string;
  helpText?: string;
  disableShowError?: boolean;
  successMessage?: string;
}

export function FormField({ children, className, error, showAllErrors, label, name, helpText, disableShowError, successMessage }: FormFieldProps) {
  return (
    <div className={cn("items-center", className, !disableShowError && "mb-4")}>
      {
        label && (
          <div className="flex gap-1 items-center mb-1">
            <Label htmlFor={name}>{label}</Label>
            {
              helpText &&
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleHelpIcon size={14} className="text-destructive" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
          </div>
        )
      }
      {children}
      {successMessage && <p className="text-sm text-green-600 py-1">{successMessage}</p>}
      {error && <FormError error={error} showAllErrors={showAllErrors} />}
    </div>
  )
}
