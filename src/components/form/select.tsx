import React from "react";
import { Control, useController } from "react-hook-form";

import { Select as BaseSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";

import { FormField } from "./form-field";

type Props = Omit<Parameters<typeof FormField>[0], "children"> & {
  data: { label: string; value: string; icon?: React.ReactNode; }[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  control: Control<any>;
  name: string;
  containerClassName?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Select = ({
  error, label, placeholder, data, isLoading, control, name, showAllErrors,
  disableShowError, successMessage, containerClassName, helpText, ...props }: Props) => {
  const { field } = useController({ name, control });
  const value = props.value ?? field.value;
  const onValueChange = props.onValueChange ?? field.onChange;
  const disabled = props.disabled ?? field.disabled;

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
      <BaseSelect {...props} disabled={disabled || isLoading} value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map(({ label, value, icon }) => (
            <SelectItem value={value} key={value} className='flex'>
              {icon}
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </BaseSelect>
    </FormField>
  )
}