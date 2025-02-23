import { CheckCircleIcon, PencilIcon } from "@heroicons/react/20/solid";
import { ReactElement } from "react";

type Size = "sm" | "md" | "lg";
type ButtonType = "button" | "submit" | "reset";
interface ButtonProps {
  type?: ButtonType;
  content: string;
  className?: string;
  onClick?: () => void;
  icon?: ReactElement;
  color?: string;
  size?: Size;
}
interface SizeConfig {
  ref: Size;
  px: string;
  py: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { type, content, className, onClick, icon, color, size } = props;

  const sizeConfig: SizeConfig[] = [
    {
      ref: "sm",
      px: "2.5",
      py: "1.5",
    },
    {
      ref: "md",
      px: "3",
      py: "2",
    },
    {
      ref: "lg",
      px: "3.5",
      py: "2.5",
    },
  ];

  function setSize(config: "px" | "py", size: Size): string | undefined {
    const result = sizeConfig.find((el) => el.ref == size) || {
      ref: "md",
      px: "3",
      py: "2",
    };
    return result?.[config];
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center gap-x-1.5 rounded-md bg-${color}-600 px-${
        size && setSize("px", size)
      } py-${
        size && setSize("py", size)
      } text-sm font-semibold text-white shadow-sm hover:bg-${color}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-600 ${className}`}
      onClick={onClick}
    >
      {icon}
      {content}
    </button>
  );
};

export const ButtonShowV2: React.FC = () => {
  const buttons: ButtonProps[] = [
    {
      type: "button",
      content: "Annuler",
      onClick: () => console.log("Annuler"),
      color: "indigo",
      size: "md",
    },
    {
      type: "submit",
      content: "Enregistrer",
      color: "red",
      onClick: () => console.log("Enregistrer"),
      size: "md",
    },
    {
      type: "button",
      content: "Ajouter",
      color: "green",
      onClick: () => console.log("Ajouter"),
      size: "md",
      icon: <CheckCircleIcon aria-hidden="true" className="-ml-0.5 size-5" />,
    },
    {
      type: "button",
      content: "Modifier",
      onClick: () => console.log("Fermer"),
      color: "indigo",
      size: "md",
      icon: <PencilIcon aria-hidden="true" className="-ml-0.5 size-5" />,
    },
  ];

  return (
    <section id="buttons" className="flex mt-4 gap-4">
      {buttons.map((button, index) => (
        <Button
          key={index}
          type={button.type}
          content={button.content}
          onClick={button.onClick}
          color={button.color}
          size={button.size}
          icon={button.icon}
        />
      ))}
    </section>
  );
};
