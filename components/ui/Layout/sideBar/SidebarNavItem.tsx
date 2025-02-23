import { NavLink } from "react-router-dom";
import { CustomTooltip } from "./CustomTooltip";
import { classNames } from "@utils/classNames";
import { NavigationItem } from "./types";

interface SidebarNavItemProps {
  item: NavigationItem;
  isActive: boolean;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isActive }) => {
  return (
    <CustomTooltip content={item.name}>
      <NavLink
        to={item.href}
        className={classNames(
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white",
          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold relative"
        )}
      >
        <item.icon
          aria-hidden="true"
          className="size-6 shrink-0"
        />
      </NavLink>
    </CustomTooltip>
  );
};