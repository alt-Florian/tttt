import { Badge } from "@components/ui/Badge";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import debounce from "lodash/debounce";

interface List<T extends number> {
  id: string | T;
  name?: string;
}

interface MultiSelectProps {
  list: List<number>[];
  label: string;
  values: Array<string | number>;
  onChange: (newValues: Array<string | number>) => void;
  className?: string;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
}

export default function MultiSelectV2({
  list,
  label,
  values,
  onChange,
  className = "",
  onSearch,
  searchPlaceholder = "Rechercher..."
}: MultiSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleChange = (newValues: Array<string | number>) => {
    onChange(newValues);
  };

  const handleRemove = (id: string | number) => {
    onChange(values.filter((value) => value !== id));
  };

  const debouncedSearch = debounce((term: string) => {
    if (onSearch) {
      onSearch(term);
    }
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <Listbox value={values} onChange={handleChange} multiple>
      <Label className="block text-sm/6 font-medium text-black">{label}</Label>
      <div className={`relative mt-2 ${className}`}>
        <ListboxButton className="grid w-full min-h-[36px] cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 pr-6 flex flex-wrap gap-1">
            {values.length > 0
              ? values.map((id) => {
                  const selectedValue = list.find((item) => item.id === id);
                  return (
                    <Badge
                      key={id}
                      text={selectedValue?.name ?? ""}
                      bgColor="bg-indigo-50"
                      textColor="text-indigo-700"
                      ringColor="ring-indigo-700/10"
                      icon={
                        <XMarkIcon
                          aria-hidden="true"
                          className="shrink-0 size-5"
                        />
                      }
                      onIconClick={(e) => {
                        e.stopPropagation();
                        handleRemove(id);
                      }}
                    />
                  );
                })
              : "---------"}
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
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
                placeholder={searchPlaceholder}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          {list.map((listItem, index) => (
            <ListboxOption
              key={index}
              value={listItem.id}
              className="group relative cursor-default select-none text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
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