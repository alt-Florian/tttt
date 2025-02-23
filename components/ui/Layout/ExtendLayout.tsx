import { XMarkIcon } from "@heroicons/react/20/solid";
import { ReactElement } from "react";

interface extendLayoutProps {
  title: string;
  children: ReactElement;
  handleClose: () => void;
}
export default function ExtendLayout({
  title,
  children,
  handleClose,
}: extendLayoutProps) {
  return (
    <div className="flex-flex-col gap-4">
      <header className="flex justify-between text-gray-900 p-4 mb-4 border-b border-gray-100">
        <div>{title}</div>
        <button onClick={handleClose}>
          <XMarkIcon className="size-5" />
        </button>
      </header>
      {children}
    </div>
  );
}
