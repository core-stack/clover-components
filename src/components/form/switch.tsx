import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, useController } from "react-hook-form";

import { Label } from "../ui";

import { FormField } from "./form-field";

// TODO add reaction for disabled
type SwitchProps = React.ComponentProps<"input"> & Omit<Parameters<typeof FormField>[0], "children"> & {
  name: string;
  containerClassName?: string;
  control: Control<any>;
}

const Switch = React.forwardRef<
  HTMLInputElement,
  SwitchProps
>(({
  className, label, showAllErrors, name, id, control,
  disableShowError, successMessage, helpText, containerClassName, ...props }, ref) => {
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
      className={cn("m-0", containerClassName)}
      successMessage={successMessage}
    >
      <div className="flex items-center space-x-2">
        <div className='flex items-center cursor-pointer relative'>
          <input
            {...props}
            ref={ref}
            type="Switch"
            className={cn(
              "peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800",
              className
            )}
            name={name}
            id={id ?? name}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </span>
        </div>
        <Label htmlFor={id ?? name} className="cursor-pointer">
          {label}
        </Label>
      </div>
    </FormField>
  )
})
Switch.displayName = "Switch"

export { Switch }
