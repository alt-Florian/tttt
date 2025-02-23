import React, { ReactElement } from "react";

export interface Badge {
  text?: string;
  bgColor?: string;
  textColor?: string;
  ringColor?: string;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  icon?: ReactElement;
}

interface BadgeProps extends Badge {}

export const Badge: React.FC<BadgeProps> = ({
  text='',
  bgColor = "bg-gray-50",
  textColor = "text-gray-600",
  ringColor = "ring-gray-500/10",
  icon,
  onIconClick,
}) => {
  return (
    <>
      <div
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${bgColor} ${textColor} ${ringColor}`}
      >
        {text}
        {icon ? (
          <div onClick={onIconClick} className="ml-2 cursor-pointer">
            {icon}
          </div>
        ) : null}
      </div>
    </>
  );
};


export const BadgeIconLeft: React.FC<BadgeProps> = ({
  text='',
  bgColor = "bg-gray-50",
  textColor = "text-gray-600",
  ringColor = "ring-gray-500/10",
  icon,
  onIconClick,
}) => {
  return (
    <>
      <div
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${bgColor} ${textColor} ${ringColor}`}
      >
        {icon ? (
          <div onClick={onIconClick} className="cursor-pointer">
            {icon}
          </div>
        ) : null}
        {text}
        
      </div>
    </>
  );
};

export const BadgeShow: React.FC = () => {
  const badges: Badge[] = [
    {
      text: "Default Badge",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      ringColor: "ring-gray-500/10",
    },
    {
      text: "Red Badge",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      ringColor: "ring-red-600/10",
    },
    {
      text: "Yellow Badge",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      ringColor: "ring-yellow-600/20",
    },
    {
      text: "Green Badge",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      ringColor: "ring-green-600/20",
    },
    {
      text: "Blue Badge",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      ringColor: "ring-blue-700/10",
    },
    {
      text: "Indigo Badge",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      ringColor: "ring-indigo-700/10",
    },
    {
      text: "Purple Badge",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      ringColor: "ring-purple-700/10",
    },
    {
      text: "Pink Badge",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      ringColor: "ring-pink-700/10",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {badges.map((badge: Badge, index: number) => (
        <Badge
          key={index}
          text={badge.text}
          bgColor={badge.bgColor}
          textColor={badge.textColor}
          ringColor={badge.ringColor}
        />
      ))}
    </div>
  );
};
