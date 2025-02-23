import "@components/ui/DatePicker.css";
import { fr } from "date-fns/locale/fr";
import dayjs from "dayjs";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

interface EditableDateProps {
  date: Date;
  onUpdate: (date: Date | null) => void;
  className?: string;
  classNameDate?: string;
}
const EditableDate = ({
  date,
  onUpdate,
  className,
  classNameDate,
}: EditableDateProps) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(date);
  const [isEditing, setIsEditing] = useState(false);

  // Active le mode édition
  const handleDateClick = () => setIsEditing(true);

  return (
    <div className={className}>
      {isEditing ? (
        <DatePicker
          open
          locale="fr"
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
          maxDate={new Date()}
        />
      ) : (
        <span
          onClick={handleDateClick}
          className={`p-0 cursor-pointer ${classNameDate}`}
        >
          {dayjs(dateSelected).format("DD/MM/YYYY")}
        </span>
      )}
    </div>
  );
};

export default EditableDate;
