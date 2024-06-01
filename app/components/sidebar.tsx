import { NavLink } from "@remix-run/react";
import { Icon } from "./icon";
import { Separator } from "./separator";
import { useState } from "react";
import { cn } from "~/utils/misc";
import { Button } from "./button";

export const SideBar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <aside
      id="sidebar"
      className={cn(
        "w-[4.3rem] lg:w-64 h-screen transition-transform",
        isMinimized && "w-[4.3rem] lg:w-[4.3rem]"
      )}
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-white border-r border-slate-200 dark:border-zinc-600 dark:bg-zinc-900">
        <a
          href="#"
          className="flex items-center px-3 py-2 mb-10 rounded-lg text-slate-900 dark:text-white"
        >
          <svg
            className="w-10 h-10"
            width="750"
            height="750"
            viewBox="0 0 750 750"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="750" height="750" rx="110" fill="white" />
            <path
              d="M655 283H588.525C578.441 291.776 584.603 302.98 593.379 302.98H607.197L533.626 376.551L440.075 283L346.524 376.551L252.973 283L114.98 420.993V401.199C106.204 391.116 95 397.278 95 406.054V467.862H161.476C171.559 459.085 165.397 447.882 156.621 447.882H142.616L216.187 374.31L309.738 467.862L330.092 447.508L403.289 374.31L496.841 467.862L635.02 329.682V349.662C643.796 359.746 655 353.584 655 344.807V283Z"
              fill="#FF6EB7"
            />
          </svg>
        </a>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <NavLink
              to="/articles"
              className={({ isActive, isPending }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700",
                  isActive && "bg-slate-100 dark:bg-zinc-700"
                )
              }
            >
              <Icon name="file-text" size="md" />
              <span
                className={cn(
                  "hidden lg:flex flex-1 ml-3 whitespace-nowrap",
                  isMinimized && "hidden lg:hidden"
                )}
              >
                Articles
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/magazines"
              className={({ isActive, isPending }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700",
                  isActive && "bg-slate-100 dark:bg-zinc-700"
                )
              }
            >
              <Icon name="desktop" size="md" />
              <span
                className={cn(
                  "hidden lg:flex flex-1 ml-3 whitespace-nowrap",
                  isMinimized && "hidden lg:hidden"
                )}
              >
                Magazines
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/translation-requests"
              className={({ isActive, isPending }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700",
                  isActive && "bg-slate-100 dark:bg-zinc-700"
                )
              }
            >
              <Icon name="globe" size="md" />
              <span
                className={cn(
                  "hidden lg:flex flex-1 ml-3 whitespace-nowrap",
                  isMinimized && "hidden lg:hidden"
                )}
              >
                Translation Requests
              </span>
            </NavLink>
          </li>
          <Separator className="my-4" />
          <li>
            <NavLink
              to="/notifications"
              className="relative flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700"
            >
              <Icon name="bell" size="md" />
              <span
                className={cn(
                  "hidden lg:flex flex-1 ml-3 whitespace-nowrap",
                  isMinimized && "hidden lg:hidden"
                )}
              >
                Notifications
              </span>
              <span
                className={cn(
                  "flex items-center justify-center w-4 h-4 lg:w-6 lg:h-6 text-xs lg:text-sm text-indigo-600 rounded-full dark:bg-violet-50 absolute top-0 right-0 lg:static",
                  isMinimized && "lg:absolute lg:w-4 lg:h-4 lg:text-xs "
                )}
              >
                6
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/statistics"
              className={({ isActive, isPending }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-zinc-700",
                  isActive && "bg-slate-100 dark:bg-zinc-700"
                )
              }
            >
              <Icon name="bar-chart" size="md" />
              <span
                className={cn(
                  "hidden lg:flex flex-1 ml-3 whitespace-nowrap",
                  isMinimized && "hidden lg:hidden"
                )}
              >
                Statistics
              </span>
            </NavLink>
          </li>
        </ul>
        <div className="flex flex-col items-start mt-auto space-y-2">
          <Button onClick={toggleSidebar} variant={"default"}>
            <Icon
              name={isMinimized ? "chevron-right" : "chevron-left"}
              size="lg"
              className="text-white"
            />
          </Button>
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
              strokeWidth="2"
              className="w-5 h-5 text-black dark:text-white"
              strokeLinecap="round"
              strokeLinejoin="round"
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
