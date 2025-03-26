import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import { Control, useController } from "react-hook-form";

import { Checkbox as UICheckbox, Label } from "../ui";

import { FormField } from "./form-field";

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
  Omit<Parameters<typeof FormField>[0], "children"> & {
  control: Control<any>;
  name: string;
  containerClassName?: string;
}
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({
    showAllErrors, label, name, helpText, containerClassName,
    type, disableShowError, successMessage, control, ...props }, ref) => {
    const { field, fieldState } = useController({ name, control });
    const onChange: typeof field.onChange = props.onChange ?? field.onChange;
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
        <div className="flex items-center space-x-2">
          <UICheckbox
            {...props}
            checked={value}
            ref={ref}
            onCheckedChange={onChange}
            disabled={disabled}
          />
          <Label htmlFor={name} className="cursor-pointer">
            {label}
          </Label>
        </div>
      </FormField>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox };

