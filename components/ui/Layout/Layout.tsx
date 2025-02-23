import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowLeftIcon,
  BugAntIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  CalendarIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CodeBracketIcon,
  QueueListIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

import { BugReportDrawer } from "@components/BugReport";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchAutocomplete from "../globalSearch/SearchAutocomplete";
import UserMenu from "./UserMenu";
import { useAuthStore } from "@stores/Auth.store";
import CommandDrawer from "./CommanderDrawer";
import {   VERSION } from "@utils/Settings";
import Sidebar from "./sideBar";
import { usePageTitle } from "../usePageTitle";

//import ThemeToggle from '@components/ui/ThemeToggle';

// const teams = [
//   { id: 1, name: "Aides", href: "/#", initial: "H", current: false },
//   { id: 2, name: "Parametres", href: "#", initial: "T", current: false },
// ];


const ENVIRONNEMENT = import.meta.env.VITE_ENVIRONNEMENT || '';

const Logo = ({ collapsed = false }) => (
  <div className={`flex ${collapsed ? 'justify-center ml-2' : ''}`}>
    <svg 
      width="74" 
      height="88" 
      viewBox="0 0 74 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${collapsed ? 'w-8' : 'w-auto'} h-8`}
    >
      <path 
        id="O" 
        d="M68.9798 19.7016C68.5393 21.55 67.7324 22.9984 66.6262 24.0335C65.52 25.0753 64.1683 25.697 62.6418 25.9524C61.3944 26.0566 60.2411 25.986 59.1718 25.6769C58.5431 25.4819 57.8908 25.1728 57.2957 24.8065C55.638 23.7915 54.2696 22.2927 53.1196 20.2628C52.037 18.2767 51.2771 16.0284 50.887 13.4474C50.3827 10.1002 50.692 7.37466 51.8184 5.27088C52.7229 3.69809 53.9468 2.63948 55.601 2.03456C56.1726 1.84636 56.8148 1.70857 57.4638 1.62456C59.4106 1.36915 61.1455 1.70185 62.783 2.60587C64.4238 3.50989 65.7755 4.90121 66.9019 6.76638C68.0283 8.63155 68.7781 10.8294 69.1681 13.4071C69.5245 15.7663 69.4875 17.8969 68.9764 19.6982M55.3186 40.3193C57.0805 45.5956 57.716 51.5171 57.2116 58.2283C56.751 64.3649 55.4228 69.7285 53.0927 74.0235C50.9106 78.4696 48.0425 81.7261 44.6465 83.7996C41.2505 85.8732 37.4814 86.7738 33.4802 86.6596C30.2691 86.3067 27.3943 85.5472 24.8726 84.2365C23.3931 83.4232 21.9339 82.3243 20.636 81.0909C17.035 77.7 14.4392 73.2303 12.711 67.5239C11.124 61.9721 10.4986 55.9061 11.0029 49.1982C11.6586 40.4941 14.0156 33.7593 18.0739 29.0073C21.2715 25.4853 24.9701 23.4319 29.4958 22.7228C31.0526 22.538 32.7539 22.5044 34.4418 22.6153C39.5089 22.9446 43.6983 24.6519 47.3196 27.7571C50.9408 30.8624 53.5567 35.0464 55.3186 40.3227M73.835 12.4862L73.7476 11.9082C72.9575 7.94262 71.2931 4.91465 68.6805 2.72014C66.0041 0.535701 62.5174 -0.307827 58.0757 0.0988138L57.8269 0.132421C53.782 0.660046 50.6819 2.36391 48.5805 5.23392C46.4857 8.16106 45.7292 11.5587 46.3243 15.494L46.3411 15.6083C46.943 19.5974 48.7385 22.6657 51.6637 24.8199C51.9563 25.035 52.2555 25.2366 52.5581 25.4248C48.2207 23.0455 42.9654 21.55 36.7248 20.898L36.1095 20.8577C26.1335 20.2091 17.7646 22.8203 11.1542 28.6981C4.54385 34.7271 0.872172 42.5172 0.142543 52.2262L0.122369 52.5118C-0.617347 62.3586 2.00192 70.562 7.83558 77.1085C13.6659 83.6551 21.2581 87.3048 30.7735 87.9232L31.6948 87.9837C42.3164 88.2458 50.7088 85.3489 57.178 79.3165C63.637 73.4253 67.0969 66.3342 67.7223 58.0569L67.8299 56.6286C68.109 46.7516 65.7856 38.7095 60.7219 32.2167C58.7381 29.7399 56.3609 27.6798 53.5836 26.0062C56.0415 27.2732 58.7784 27.7269 61.8214 27.3303L62.1946 27.2833C66.4614 26.5473 69.5447 24.7325 71.5755 21.8121C73.6165 18.9522 74.3528 15.8503 73.8451 12.4963" 
        fill="#FBD469"
      />
    </svg>
  </div>
);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user } = useAuthStore()
  usePageTitle('');

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isExtendedSidebar, setIsExtendedSidebar] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigation = [
    { name: "Tableau de bord", href: "/", icon: HomeIcon },
    { name: "Clients", href: "/customers", icon: UsersIcon },
    { name: "Contacts", href: "/contacts", icon: FolderIcon },
     { name: "Lettres de mission", href: "/letterMissions", icon: QueueListIcon },
    { name: "Missions", href: "/missions", icon: CalendarIcon },

    {
      name: "Factures",
      href: "/factures",
      icon: DocumentDuplicateIcon,
    },
    
  ];

  const settingsNavigation = user?.role == 1 ? [
     { name: "Configurations", href: "/configs", icon: Cog6ToothIcon },
     { name: "Utilisateurs", href: "/users", icon: UsersIcon },
  ] : [];
  



  return (
    <>
      <div>
         <CommandDrawer />
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <Logo  collapsed={!isExtendedSidebar}/>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const isActive = location.pathname === item.href; // Vérifie si la route est active
                          return (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={classNames(
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="size-6 shrink-0"
                                />
                                {item.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li>
                      {/* <div className="text-xs/6 font-semibold text-gray-400">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <NavLink
                                to={team.href}
                                className={classNames(
                                  team.current
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                            >
                               <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                              </NavLink>
                           
                          </li>
                        ))}
                      </ul> */}
                    </li>
                    <li className="mt-auto">
                      <ul role="list" className="-mx-2 space-y-1">
                        {settingsNavigation.map((item) => {
                          const isActive = location.pathname === item.href; // Vérifie si la route est active
                          return (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={classNames(
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="size-6 shrink-0"
                                />
                                {item.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                    Reduire le volet
                  </button>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="lg:flex">
          {isExtendedSidebar ? (
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col lg:h-screen">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                 <Logo collapsed={!isExtendedSidebar} />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const isActive = location.pathname === item.href; // Vérifie si la route est active
                          return (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={classNames(
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="size-6 shrink-0"
                                />
                                {item.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    {/* <li>
                      <div className="text-xs/6 font-semibold text-gray-400">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <NavLink
                                to={team.href}
                                className={classNames(
                                  team.current
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                            >
                               <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                              </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li> */}
                    <li className="mt-auto">
                      <ul role="list" className="-mx-2 space-y-1">
                        {settingsNavigation.map((item) => {
                          const isActive = location.pathname === item.href; // Vérifie si la route est active
                          return (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={classNames(
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="size-6 shrink-0"
                                />
                                {item.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                    <button
                    onClick={() => navigate('/version')}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    <CodeBracketIcon className="size-6 shrink-0" aria-hidden="true" />
                    <span className="italic">Version</span>
                    <span className="ml-auto inline-flex min-w-[32px] items-center justify-center rounded-lg border border-[#FBD469] bg-[#FBD469]/10 px-2 text-[0.625rem] font-medium text-[#FBD469] group-hover:bg-[#FBD469]/20">
                     {VERSION}
                    </span>
                  </button>
                  <button
                    onClick={() => setIsExtendedSidebar(false)}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                    Reduire le volet
                  </button>
                </nav>
              </div>
            </div>
          ) : (
             <Sidebar VERSION={VERSION} isExtendedSidebar={isExtendedSidebar} navigation={navigation} setIsExtendedSidebar={setIsExtendedSidebar} settingsNavigation={settingsNavigation} />
          )}
          <div
            className={`${isExtendedSidebar ? "lg:pl-72" : "lg:pl-24"} flex-1`}
          >
            <div className="top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Separator */}
              <div
                aria-hidden="true"
                className="h-6 w-px bg-gray-900/10 lg:hidden"
              />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                {/* Add back button */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeftIcon className="size-5 mr-2" />
                  <span className="sr-only">Retour</span>
                </button>
                
              <SearchAutocomplete />
                <div className="flex items-center gap-x-4 lg:gap-x-6">
    <div className={classNames(
     "px-2 py-1 text-xs font-medium rounded-full",
     ENVIRONNEMENT.includes('Prod') ? 'bg-green-100 text-green-800' :
     ENVIRONNEMENT.includes('Preprod') ? 'bg-orange-100 text-orange-800' :
     'bg-red-100 text-red-800'
   )}>
     {ENVIRONNEMENT.includes('Prod') ? 'Prod' :
      ENVIRONNEMENT.includes('Preprod') ? 'Pre-prod' :
      'Developpement'}
   </div>
                   <button
                      type="button"
                      className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(true)}
                    >
                      <span className="sr-only">Signaler un problème</span>
                      <BugAntIcon className="size-5 text-red-500 opacity-50" />
                    </button>

                    <BugReportDrawer 
                      isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onReOpen = {() => setIsOpen(true)}
                    fromBoundary={false}
                    />
             
                {/* Separator */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  />
                  {/* <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Voir les notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button> */}

               

                  {/* Profile dropdown */}
                  <UserMenu />
                </div>
              </div>
            </div>

            <main className="py-6 min-h-screen bg-gray-50">
              <div className="px-4 sm:px-6 lg:px-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
