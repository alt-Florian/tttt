import { useEffect, useState } from "react";

interface EditableTextProps {
  content: string;
  onUpdate: (text: string) => void;
  isTextArea?: boolean;
  className?: string;
  classNameText?: string;
  classNameInput?: string;
}
const EditableText = ({
  content,
  onUpdate,
  isTextArea,
  className,
  classNameText,
  classNameInput,
}: EditableTextProps) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setText(content);
  }, [content]);

  // Active le mode édition
  const handleTextClick = () => setIsEditing(true);

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
        <p
          onClick={handleTextClick}
          className={`p-0 whitespace-pre-wrap cursor-pointer ${classNameText}`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default EditableText;
