import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import * as React from "react";
import { Control, useController } from "react-hook-form";

import { Button, Input as UIInput } from "../ui";

import { FormField } from "./form-field";

type InputProps = React.ComponentProps<"input"> & Omit<Parameters<typeof FormField>[0], "children">  & {
  control: Control<any>;
  name: string;
  containerClassName?: string;
  action?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    type?: "button" | "submit" | "reset";
  }
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className, showAllErrors, label, name, helpText, containerClassName,
    type, disableShowError, action, successMessage, control, ...props }, ref) => {
    const [typeInput, setTypeInput] = React.useState(type);
    const { field, fieldState } = useController({ name, control});
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
          <UIInput
            {...props}
            type={typeInput}
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
          {type === 'password' && (
            <Button
              className='absolute top-0 right-0'
              onClick={() => setTypeInput(typeInput === 'password' ? 'text' : 'password')}
              type='button'
              variant="link"
            >{typeInput === 'password' ? <EyeClosedIcon /> : <EyeIcon />}</Button>
          )}
          {
            action && (
              <Button
                type={action.type ?? "button"}
                onClick={action.onClick}
                disabled={action.disabled}
                isLoading={action.isLoading}
              >{action.text}</Button>
            )
          }
        </div>
      </FormField>
    )
  }
)
Input.displayName = "Input"

export { Input };

