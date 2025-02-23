"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface List<T extends number> {
  id: string | T;
  name?: string;
}

interface MultiSelectProps {
  list: List<number>[];
  label: string;
  values: Array<string | number>;
  onChange: (newValues: Array<string | number>) => void;
}

export default function MultiSelectV1({
  list,
  label,
  values,
  onChange,
}: MultiSelectProps) {
  const handleChange = (newValues: Array<string | number>) => {
    onChange(newValues);
  };

  return (
    <Listbox value={values} onChange={handleChange} multiple>
      <Label className="block text-sm/6 font-medium text-black">{label}</Label>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full min-h-[36px] cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 pr-6 flex flex-col">
            {values.length > 0
              ? values
                  .map((id) => list.find((item) => item.id === id)?.name)
                  .filter(Boolean)
                  .join(" , ")
              : "---------"}
          </span>
          <ChevronUpDownIcon
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
              <span className="block h-full w-full py-2 pl-8 pr-4 font-normal  group-data-[selected]:font-semibold">
                {listItem.name ?? listItem.id}
              </span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
