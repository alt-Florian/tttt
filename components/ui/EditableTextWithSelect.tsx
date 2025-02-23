import { ChangeEvent, useRef, useState } from "react";

interface EditableTextProps {
  selected: string | number | undefined;
  options: { value: string | number; text: string }[];
  onUpdate: (value: string | number) => void;
  className?: string;
  classNameText?: string;
  classNameSelect?: string;
  classNameOptions?: string;
}
const EditableTextWithSelect = ({
  selected,
  options,
  onUpdate,
  className,
  classNameText,
  classNameSelect,
  classNameOptions,
}: EditableTextProps) => {
  const [value, setValue] = useState(
    options.find((option) => option.text === selected)?.value ||
      options[0].value
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Active le mode édition
  const handleTextClick = () => {
    setIsSelectOpen(true);
    setTimeout(() => {
      selectRef.current?.focus();
      selectRef.current?.click();
    }, 0);
  };

  // Sauvegarde lorsque l'utilisateur appuie sur Entrée
  const handleChange = (
    event: ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setValue(event.target.value);
    onUpdate(event.target.value);
    setIsSelectOpen(false);
  };

  return (
    <div className={className}>
      {isSelectOpen === true ? (
        <select
          ref={selectRef}
          value={value}
          onChange={handleChange}
          onBlur={handleChange}
          className={`p-0 cursor-pointer ${classNameSelect}`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={`p-0 ${classNameOptions}`}
            >
              {option.text}
            </option>
          ))}
        </select>
      ) : (
        <span
          onClick={handleTextClick}
          className={`p-0 cursor-pointer ${classNameText}`}
        >
          {options.find((option) => option.value === Number(value))?.text || ""}
        </span>
      )}
    </div>
  );
};

export default EditableTextWithSelect;
