'use client';

import { ReactNode, useState } from 'react';
import { Routes } from '@/constants/enum';
import { NavLinkProps, ROUTES, ROUTES_UTILS } from '@/constants/routes';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { NavLink, NavLinkAction, NavLinkCollapse } from './nav-link';
import { Separator } from '../ui/separator';
import { ModeToggle } from '../utils';
import { AvatarPopover } from './AvatarPopover';

const RenderRoutes = ({ routes }: { routes: NavLinkProps[] }) => {
  return routes.map((route) => {
    const { href, childrenNav, action, dialogComponent, ...rest } = route;

    if (href) {
      return <NavLink key={route.title} href={href} {...rest} />;
    }

    if (childrenNav) {
      return <NavLinkCollapse key={route.title} childrenNav={childrenNav} {...rest} />;
    }

    if (action || dialogComponent) {
      return (
        <NavLinkAction
          key={route.title}
          action={action}
          dialogComponent={dialogComponent}
          {...rest}
        />
      );
    }

    return null;
  });
};

export const Sidebar = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setOpenToggle(!openToggle)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href={Routes.Dashboard} className="flex ms-2 md:me-24">
                <Image
                  width={110}
                  height={50}
                  src={theme === 'dark' ? '/images/logo-white.png' : '/images/logo-red.png'}
                  alt="techcell-logo"
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <AvatarPopover />
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          !openToggle && '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full pt-2 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <RenderRoutes routes={ROUTES} />
          </ul>
          <Separator className="my-5" />
          <ul className="space-y-2 font-medium">
            <RenderRoutes routes={ROUTES_UTILS} />
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 pt-20 min-h-screen">{children}</div>
    </>
  );
};
