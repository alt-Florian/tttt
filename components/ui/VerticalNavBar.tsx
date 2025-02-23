import { NavLink } from "react-router-dom";

type VerticalNavBarProps = {
  navItems: { name: string; path: string }[];
  classNameRow?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function VerticalNavBar({
  navItems,
  classNameRow,
}: VerticalNavBarProps) {
  return (
    <nav aria-label="NavBar" className="flex flex-1 flex-col">
      <ul role="list">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? "bg-gray-50 text-indigo-600 border-l-indigo-600 font-semibold"
                  : "text-gray-500 hover:text-gray-600 hover:border-l-gray-400",
                `group flex gap-x-3 p-4 text-sm/6 font-medium border border-gray-100 border-l-2 border-l-gray-300 bg-white ${classNameRow}`
              )
            }
          >
            {item.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
