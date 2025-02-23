import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface SelectWithSearchProps {
  list: ({ id: number | string; name: string | undefined } | null)[];
  value: string | number | undefined;
  onChange: (value: string | number | null) => void;
}

export default function SelectWithSearch({
  list,
  onChange,
}: SelectWithSearchProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | number | undefined | null>(
    undefined
  );

  const filteredList =
    query === ""
      ? list
      : list.filter((item) => {
          return item?.name?.toLowerCase().includes(query.toLowerCase()) || "";
        });

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        onChange(value);
      }}
      onClose={() => setQuery("")}
    >
      <div className="relative w-full">
        <ComboboxInput
          className="min-w-full rounded-md bg-white h-9 py-1.5 pl-3 pr-8 text-left text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
          displayValue={(item: string) => {
            return list.find((el) => el?.id === item)?.name || "";
          }}
          onChange={(event) => setQuery(event.target.value)}
          style={{
            overflow: "hidden",
          }}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </ComboboxButton>
      </div>
      <ComboboxOptions
        anchor="bottom"
        transition
        className="z-50 w-[calc(100%-72rem)] min-w-96
         mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
      >
        {filteredList.map((item, index) => (
          <ComboboxOption
            key={item?.id || index}
            value={item?.id}
            className="flex gap-4 items-center group relative cursor-default select-none  text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
          >
            <div className="block h-full w-full py-2 pl-8 pr-4 font-normal group-data-[selected]:font-semibold">
              {item?.name || ""}
            </div>
            <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
              <CheckIcon aria-hidden="true" className="size-5" />
            </span>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
