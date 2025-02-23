import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuthStore } from "@stores/Auth.store";
import { authService } from "@services/Auth.service";
import { UserIcon } from "@heroicons/react/24/solid";

export default function UserMenu() {
  const { user } = useAuthStore();
  const handleSignOut = authService.signOut();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="-m-1.5 flex items-center p-1.5">
    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
      <UserIcon className="h-4 w-4 text-gray-500" />
    </div>

        <span className="hidden lg:flex lg:items-center">
          <span className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            {user?.firstname} {user?.lastname}
          </span>
          <ChevronDownIcon className="ml-2 size-5 text-gray-400" aria-hidden="true" />
        </span>
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-dark-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
        <MenuItem>
          <button
            className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-700"
          >
            Profil
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={handleSignOut}
            className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-700"
          >
            Déconnexion
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}