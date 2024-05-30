import { Link } from "@remix-run/react";
import { Icon } from "./icon";
import { Separator } from "./separator";

export const SideBar = () => {
  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-white border-r border-slate-200 dark:border-zinc-700 dark:bg-zinc-900">
        <a
          href="#"
          className="flex items-center px-3 py-2 mb-10 rounded-lg text-slate-900 dark:text-white"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="ml-3 text-base font-semibold">EM GUIDE</span>
        </a>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <Link
              to="#"
              className="flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700"
            >
              <Icon name="file-text" size="md" />
              <span className="flex-1 ml-3 whitespace-nowrap">Articles</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700"
            >
              <Icon name="desktop" size="md" />
              <span className="flex-1 ml-3 whitespace-nowrap">Magazines</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700"
            >
              <Icon name="globe" size="md" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Translation Requests
              </span>
            </Link>
          </li>
          <Separator className="my-4" />
          <li>
            <Link
              to="#"
              className="flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700"
            >
              <Icon name="bell" size="md" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Notifications
              </span>
              <span className="flex items-center justify-center w-6 h-6 text-sm text-indigo-600 rounded-full dark:bg-violet-50">
                6
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700"
            >
              <Icon name="bar-chart" size="md" />
              <span className="flex-1 ml-3 whitespace-nowrap">Statistics</span>
            </Link>
          </li>
        </ul>
        <div className="flex mt-auto">
          <div className="flex justify-between w-full">
            <span className="text-sm font-medium text-black dark:text-white">
              email@example.com
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-roledescription="more menu"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              className="w-5 h-5 text-black dark:text-white"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};
SideBar.displayName = "SideBar";
