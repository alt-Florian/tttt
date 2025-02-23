import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export interface Tab {
  name: string;
  path: string;
}

interface TabsProps {
  tabs: Tab[];
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileTabChange = (selectedPath: string) => {
    navigate(selectedPath);
  };

  return (
    <div>
      {/* Menu déroulant pour mobile */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          value={location.pathname || ""}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-gray-900 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => handleMobileTabChange(e.target.value)}
        >
          {tabs.map((tab: Tab) => (
            <option key={tab.name} value={tab.path}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation sous forme d'onglets pour écran large */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab: Tab) => (
              <NavLink
                key={tab.name}
                to={tab.path}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                  )
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export const TabsShow: React.FC = () => {
  const tabsData: Tab[] = [
    { name: "My Account", path: "#" },
    { name: "Company", path: "#" },
    { name: "Team Members", path: "#" },
    { name: "Billing", path: "#" },
  ];

  return <Tabs tabs={tabsData} />;
};
