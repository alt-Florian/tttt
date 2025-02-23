"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { ReactElement } from "react";

interface List<T extends number> {
  id: string | T | boolean | null;
  name?: string;
  icon?: ReactElement;
}
interface SelectProps {
  isOptional?: boolean;
  list: List<number>[];
  label?: string;
  value: string | number | boolean | null | undefined;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  classNameLabel?: string;
  className?: string;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
}

export default function Select({
  isOptional,
  list,
  label,
  value,
  onChange,
  classNameLabel,
  className = "",
  onSearch,
  searchPlaceholder,
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
      <Label
        className={`block text-sm/6 font-medium text-black mb-2 ${classNameLabel}`}
      >
        {label}
      </Label>
      <div className={`relative rounded-md shadow-sm ${className}`}>
        <ListboxButton className="grid w-full min-h-[40px] cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 pr-6 flex items-center gap-2">
            <span>{selectedName}</span>
            <span>{selectedItem?.icon}</span>
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
          {onSearch && (
            <div className="px-3 py-2">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-2 py-1"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          {list.map((listItem, index) =>
            !isOptional &&
            (listItem.id === null || listItem.id === "") ? null : (
              <ListboxOption
                key={index}
                value={listItem.id}
                className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="flex item-center gap-2 font-normal group-data-[selected]:font-semibold ">
                  <span>{listItem.name ?? listItem.id}</span>
                  <span className="mt-0.5">{listItem.icon}</span>
                </span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            )
          )}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
