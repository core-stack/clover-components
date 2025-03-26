import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDown, XCircle, XIcon } from "lucide-react";
import * as React from "react";

import {
  Badge, Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
  CommandSeparator, Popover, PopoverContent, PopoverTrigger, Separator
} from "../ui";

import { FormField } from "./form-field";

const multiSelectVariants = cva(
  "m-1",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type MultiSelectProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
 VariantProps<typeof multiSelectVariants> & Omit<Parameters<typeof FormField>[0], "children"> & {
  options?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  enableCreate?: boolean;
  containerClassName?: string;
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options: initialOpts = [],
      onValueChange = () => {},
      variant,
      defaultValue = [],
      placeholder = "Selecione as opções",
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      enableCreate = true,
      containerClassName, name, label, helpText, successMessage, disableShowError, error, showAllErrors,
      ...props
    },
    ref
  ) => {
    const [options, setOptions] = React.useState(initialOpts);
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [typedValue, setTypedValue] = React.useState("");
    const hiddenInputRef = React.useRef<HTMLInputElement>(null);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);

      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = newSelectedValues.join(",");
      }
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };
    const handleCreate = () => {
      if (typedValue.length > 0) {
        const newOption = {
          label: typedValue,
          value: typedValue.toLowerCase().replace(" ", "-"),
        };
        const newSelectedValues = [...selectedValues, newOption.value];
        setSelectedValues(newSelectedValues);
        setOptions([...options, newOption]);
        onValueChange(newSelectedValues);
        setTypedValue("");
      }
    }
    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

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
        <input
          type="hidden"
          data-type="multi-select"
          name={name}
          ref={hiddenInputRef}
          value={selectedValues.join(",")}
        />
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              {...props}
              asChild={asChild}
              onClick={handleTogglePopover}
              size="sm"
              className={cn(
                "flex w-full p-1 rounded-md border min-h-9 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
                className
              )}
            >
              {selectedValues.length > 0 ? (
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-wrap items-center">
                    {selectedValues.slice(0, maxCount).map((value) => {
                      const option = options.find((o) => o.value === value);
                      const IconComponent = option?.icon;
                      return (
                        <Badge
                          key={value}
                          className={multiSelectVariants({ variant })}
                        >
                          {IconComponent && (
                            <IconComponent className="h-4 w-4 mr-2" />
                          )}
                          {option?.label}
                          {!initialOpts.find((o) => o.value === value) && (
                            <p className='ml-1 font-extralight'>(New)</p>
                          )}
                          <XCircle
                            className="ml-2 h-4 w-4 cursor-pointer"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleOption(value);
                            }}
                          />
                        </Badge>
                      );
                    })}
                    {selectedValues.length > maxCount && (
                      <Badge
                        className={cn(
                          "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                          multiSelectVariants({ variant })
                        )}
                      >
                        {`+ ${selectedValues.length - maxCount} more`}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            clearExtraOptions();
                          }}
                        />
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <XIcon
                      className="h-4 mx-2 cursor-pointer text-muted-foreground"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                    <Separator orientation="vertical" className="flex min-h-6 h-full" />
                    <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full mx-auto">
                  <span className="text-sm text-muted-foreground mx-3">
                    {placeholder}
                  </span>
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <Command>
              <CommandInput
                placeholder="Buscar..."
                onKeyDown={handleInputKeyDown}
                value={typedValue}
                onInput={(event) => setTypedValue(event.currentTarget.value.trim())}
              />
              <CommandList>
                <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
                <CommandGroup>
                  {
                    options.length > 0 &&
                    <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selectedValues.length === options.length
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      <span>(Selecionar tudo)</span>
                    </CommandItem>
                  }
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between">
                    {selectedValues.length > 0 && (
                      <>
                        <CommandItem onSelect={handleClear} className="flex-1 justify-center cursor-pointer">
                          Limpar
                        </CommandItem>
                        <Separator orientation="vertical" className="flex min-h-6 h-full"
                        />
                      </>
                    )}
                    {enableCreate && typedValue.length > 0 && (
                      <>
                        <CommandItem onSelect={handleCreate} className="flex-1 justify-center cursor-pointer">
                          Criar novo: {typedValue}
                        </CommandItem>
                        <Separator orientation="vertical" className="flex min-h-6 h-full"
                        />
                      </>
                    )}
                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      className="flex-1 justify-center cursor-pointer max-w-full"
                    >
                      Fechar
                    </CommandItem>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </FormField>
    );
  }
);

MultiSelect.displayName = "MultiSelect";