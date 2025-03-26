import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Control, useController } from "react-hook-form";

import { FormField } from "../form/form";

import { Button } from "./button";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type ComboboxItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
type Action = {
  id: string;
  label: string;
  onClick: () => void;
};

type ComboboxProps = {
  control: Control<any>;
  name: string;
  data: ComboboxItem[];
  actions?: Action[];
  label?: string;
  selectText?: string;
  emptyText?: string;
}
const Combobox = ({ control, name, data, actions, label, selectText, emptyText }: ComboboxProps) => {
  const { field } = useController({
    control,
    name: name,
    defaultValue: ""
  })
  const [open, setOpen] = React.useState(false);
  const selectedItem = data?.find((item) => item.value === field.value);


  const onSelect = (value: string) => {
    field.onChange(value);
    setOpen(false);
  };

  return (
    <FormField label={label} name={name}>
      <input
        type='hidden'
        {...field}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {
              !!selectedItem &&
              <div className='flex items-center gap-2'>
                {selectedItem?.icon}
                {selectedItem?.label}
              </div>
            }
            {
              !selectedItem &&
              selectText
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search provider..." />
            <CommandList>
              <CommandEmpty>
                {emptyText}
              </CommandEmpty>
              <CommandSeparator />
              <CommandGroup>
                {data?.map((d) => (
                  <CommandItem
                    key={d.value}
                    value={d.value}
                    onSelect={onSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedItem?.value === d.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {d?.icon}
                    {d.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              {
                actions && actions?.length > 0 &&
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    {actions?.map((action) => (
                      <Button
                        key={action.id}
                        variant="secondary"
                        className="w-full"
                        onClick={action.onClick}
                      >{action.label}</Button>
                    ))}
                  </CommandGroup>
                </>
              }
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

export { Combobox };

