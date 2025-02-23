import { ChangeEvent } from "react";

interface Option {
  value: string;
  name: string;
}

interface RadioInputProps {
  options: Option[];
  title: string;
  name?: string;
  initialValue?: string;
  onChange: (value: number) => void;
  description?: string;
  className?: string;
}

export default function RadioInput({
  options,
  title,
  name,
  initialValue,
  onChange,
  description,
  className,
}: RadioInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <fieldset className={`${className}`}>
      <legend className="text-sm/6 font-semibold text-gray-900">{title}</legend>
      {description ? (
        <p className="mt-1 text-sm/6 text-gray-600">{description}</p>
      ) : null}
      <div className="mt-2 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              defaultChecked={
                initialValue
                  ? option.value === initialValue
                  : option.value === options[0].value
              }
              id={option.name}
              name={name || "options"}
              type="radio"
              value={option.value}
              onChange={handleChange}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label
              htmlFor={option.name}
              className="ml-3 block text-sm/6 font-medium text-gray-900"
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
