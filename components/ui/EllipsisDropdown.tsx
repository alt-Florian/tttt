import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface menuItem {
  title: string;
  icon?: ReactElement;
  path?: string;
  action?: () => void;
}
interface EllipsisDropdownProps {
  menuItems: menuItem[];
}

export default function EllipsisDropdown({ menuItems }: EllipsisDropdownProps) {
  const navigate = useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Ouvrir le menu</span>
          <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
        </MenuButton>
      </div>
      <MenuItems
        anchor="bottom start"
        transition
        className="absolute right-0 z-50 mt-2 w-56 text-xs origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <button
              onClick={() => {
                if (item.action) {
                  item.action();
                }
                if (item.path) {
                  navigate(item.path);
                }
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-none"
            >
              {item.icon ?? null}
              <span className="pb-0.5">{item.title}</span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
