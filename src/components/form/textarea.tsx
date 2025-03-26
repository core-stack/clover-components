import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, useController } from "react-hook-form";

import { Textarea as UITextarea } from "../ui";

import { FormField } from "./form-field";

type TextareaProps = React.ComponentProps<"textarea"> & Omit<Parameters<typeof FormField>[0], "children"> & {
  control: Control<any>;
  name: string;
  helpText?: string;
  containerClassName?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className, showAllErrors, label, name, helpText, containerClassName,
    disableShowError, successMessage, control, ...props }, ref) => {
    const { field, fieldState } = useController({ name, control });
    const onChange = props.onChange ?? field.onChange;
    const onBlur = props.onBlur ?? field.onBlur;
    const value = props.value ?? field.value;
    const disabled = props.disabled ?? field.disabled;
    const error = props.error ?? fieldState.error?.message;
    return (
      <FormField
        disableShowError={disableShowError}
        name={name}
        label={label}
        helpText={helpText}
        error={error}
        showAllErrors={showAllErrors}
        className={containerClassName}
        successMessage={successMessage}
      >
        <div className="relative w-full flex gap-2">
          <UITextarea
            {...props}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
            name={name}
            ref={ref}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
          />
        </div>
      </FormField>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea };

