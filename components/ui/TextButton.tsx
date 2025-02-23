import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface TextButtonProps {
  onUpdate: (text: string) => void;
  className?: string;
  isTextArea?: boolean;
  classNameInput?: string;
  classNameButton?: string;
  classNameIcon?: string;
}
const TextButton = ({
  onUpdate,
  className,
  isTextArea,
  classNameInput,
  classNameButton,
  classNameIcon,
}: TextButtonProps) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Active le mode édition
  const handleButtonClick = () => setIsEditing(true);

  // Gère la saisie dans l'input
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setText(event.target.value);

  // Sauvegarde la modification et désactive le mode édition
  const handleSave = () => {
    setIsEditing(false);
    onUpdate(text);
  };

  // Sauvegarde lorsque l'utilisateur appuie sur Entrée
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSave();
    }
  };

  return (
    <div className={className}>
      {isEditing ? (
        isTextArea ? (
          <textarea
            value={text}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`p-0 w-full min-h-40 ${classNameInput}`}
          />
        ) : (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`p-0 ${classNameInput}`}
          />
        )
      ) : (
        <button
          onClick={handleButtonClick}
          className={`p-0 ${classNameButton}`}
        >
          <PlusCircleIcon className={`size-4 text-gray-500 ${classNameIcon}`} />
        </button>
      )}
    </div>
  );
};

export default TextButton;
