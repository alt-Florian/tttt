import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function CheckBox({
  initalChecked,
  onChange,
  disabled,
}: {
  initalChecked: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
}) {
  const [enabled, setEnabled] = useState(initalChecked);

  return (
    <Checkbox
      checked={enabled}
      onChange={(value) => {
        setEnabled(!enabled);
        onChange(value);
      }}
      disabled={disabled}
      className="group size-6 rounded-md bg-white p-1 ring-1 ring-gray-300 ring-inset data-[checked]:bg-indigo-600 data-[disabled]:bg-indigo-400"
    >
      <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block" />
    </Checkbox>
  );
}
