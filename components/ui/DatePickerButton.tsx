import "@components/ui/DatePicker.css";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { fr } from "date-fns/locale/fr"; // the locale you want
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

export interface DatePickerButtonProps {
  onUpdate: (date: Date | null) => void;
  className?: string;
  classNameButton?: string;
  classNameIcon?: string;
}
const DatePickerButton = ({
  onUpdate,
  className,
  classNameButton,
  classNameIcon,
}: DatePickerButtonProps) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());
  const [isEditing, setIsEditing] = useState(false);

  // Active le mode édition
  const handleDateClick = () => setIsEditing(true);

  return (
    <div className={className}>
      {isEditing ? (
        <DatePicker
          open
          selected={dateSelected}
          onChange={(date) => {
            setDateSelected(date);
            onUpdate(date);
            setIsEditing(false);
          }}
          onClickOutside={() => setIsEditing(false)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          showMonthDropdown
          scrollableMonthYearDropdown
          yearDropdownItemNumber={200}
          maxDate={new Date()}
          locale="fr"
        />
      ) : (
        <button onClick={handleDateClick} className={`p-0 ${classNameButton}`}>
          <PlusCircleIcon className={`size-4 text-gray-500 ${classNameIcon}`} />
        </button>
      )}
    </div>
  );
};

export default DatePickerButton;
