import { Field, Label, Switch } from "@headlessui/react";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  details?: string;
  className?: string;
}
export default function Toggle({
  checked,
  onChange,
  label,
  details,
  className,
}: ToggleProps) {
  return (
    <Field className={`flex items-center ${className}`}>
      <Switch
        checked={checked}
        onChange={onChange}
        className="group relative inline-flex h-5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      {label ? (
        <Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">{label}</span>{" "}
          {details ? <span className="text-gray-500">{details}</span> : null}
        </Label>
      ) : null}
    </Field>
  );
}
