import { useLocation, useNavigate } from "react-router-dom";
import { NavigationItem } from "./types";
import { SidebarNavItem } from "./SidebarNavItem";
import { CustomTooltip } from "./CustomTooltip";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Logo } from "../Logo";


interface SidebarProps {
  navigation: NavigationItem[];
  settingsNavigation: NavigationItem[];
  isExtendedSidebar: boolean;
  setIsExtendedSidebar: (value: boolean) => void;
  VERSION: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  navigation, 
  settingsNavigation, 
  isExtendedSidebar, 
  setIsExtendedSidebar, 
  VERSION 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

   return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-24 lg:flex-col lg:h-screen">
      <div className="flex grow flex-col gap-y-5 bg-gray-900 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Logo collapsed={!isExtendedSidebar} />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name} className="relative">
                      <SidebarNavItem item={item} isActive={isActive} />
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="mt-auto">
              <ul role="list" className="mt-2 space-y-1">
                {settingsNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name} className="relative">
                      <SidebarNavItem item={item} isActive={isActive} />
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>

          <CustomTooltip content="Version">
            <button
              onClick={() => navigate('/version')}
              className="group flex gap-x-3 rounded-md p-2 -ml-1 text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <span className="ml-auto inline-flex min-w-[32px] items-center justify-center rounded-lg border border-[#FBD469] bg-[#FBD469]/10 px-2 text-[0.625rem] font-medium text-[#FBD469] group-hover:bg-[#FBD469]/20">
                {VERSION}
              </span>
            </button>
          </CustomTooltip>

          <CustomTooltip content="Expand sidebar">
            <button
              onClick={() => setIsExtendedSidebar(true)}
              className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <ChevronRightIcon className="size-8" />
            </button>
          </CustomTooltip>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;