import {
  CheckCircleIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { ReactElement } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  content: string;
  className?: string;
  onClick?: () => void;
  icon?: ReactElement;
}



export const Button: React.FC<ButtonProps> = (props) => {
  const { type, content, className, onClick, icon } = props;

  return (
    <button type={type} className={className} onClick={onClick}>
     
        {icon}
    
      {content}
    </button>
  );
};

export const ButtonShow: React.FC = () => {
  const buttons: any = [
    {
      type: "button",
      content: "Annuler",
      onClick: () => console.log("Annuler"),
      className:
        "rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
    },
    {
      type: "submit",
      content: "Enregistrer",
      onClick: () => console.log("Enregistrer"),
      className:
        "rounded-full bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    },
    {
      type: "button",
      content: "Ajouter",
      onClick: () => console.log("Ajouter"),
      icon: <CheckCircleIcon  aria-hidden="true" className="shrink-0 size-5" />,
      className:
        "inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    },
    {
      type: "button",
      content: "",
      onClick: () => console.log("Fermer"),
      icon: <PlusIcon aria-hidden="true" className="shrink-0 size-5"  />,
      className:
        "rounded-full bg-green-600 p-1.5 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    }
  ];

  return (
    <section id="buttons" className="flex  gap-4">
      {buttons.map((button: any, index: number) => (
        <Button
          key={index}
          type={button.type}
          content={button.content}
          onClick={button.onClick}
          icon={button.icon}
          className={button.className}
        />
      ))}
    </section>
  );
};
