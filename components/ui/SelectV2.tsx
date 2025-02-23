"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
interface List<T extends number> {
  id: string | T;
  name?: string;
}
export interface SelectProps {
  list: List<number>[];
  label?: string;
  value: string | number | null | undefined;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  className?: string;
}
export default function SelectV2({
  list,
  label,
  value,
  onChange,
  className=''
}: SelectProps) {
  //Function to fix types issue with onChange on Select elements
  const handleChange = (newValue: string | number) => {
    const fakeEvent = {
      target: {
        value: newValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(fakeEvent);
  };
  // Find the name corresponding to the selected value
  const selectedItem = list.find((item) => item.id === value);
  const selectedName = selectedItem ? selectedItem.name : value;

  return (
    <Listbox value={value} onChange={handleChange}>
      {label ? (
        <Label className="block text-sm/6 font-medium text-black">
          {label}
        </Label>
      ) : null}
      <div className={`relative w-full ${className}`}>
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white h-9 py-1.5 pl-3 pr-2 text-left text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 pr-6 overflow-hidden">
            {selectedName}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {list.map((listItem, index) => (
            <ListboxOption
              key={index}
              value={listItem.id}
              className="group relative cursor-default select-none  text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
            >
              <span className="block h-full w-full py-2 pl-8 pr-4 font-normal group-data-[selected]:hidden group-data-[selected]:h-0 group-data-[selected]:p-0 group-data-[selected]:m-0">
                {listItem.name ?? listItem.id}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
