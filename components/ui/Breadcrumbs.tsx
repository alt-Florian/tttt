import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import React from "react";
import { NavLink } from "react-router-dom";

export interface BreadcrumbPage {
  name: string;
  href: string;
  current: boolean;
}

interface BreadcrumbProps {
  pages: BreadcrumbPage[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ pages }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <NavLink to="/" className="text-gray-800 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
              <span className="sr-only">Home</span>
            </NavLink>
          </div>
        </li>

        {pages.map((page: BreadcrumbPage, index: number) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-gray-700"
              />
              <NavLink
                to={page.href}
                aria-current={page.current ? "page" : undefined}
                className="ml-4 text-sm font-medium text-gray-800 hover:text-gray-500"
              >
                {page.name}
              </NavLink>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const BreadcrumbShow: React.FC = () => {
  const pages: BreadcrumbPage[] = [
    { name: "test", href: "/test", current: false },
    { name: "contact", href: "/contact", current: true },
  ];

  return (
    <div className="p-4">
      <Breadcrumb pages={pages} />
    </div>
  );
};
