import { ReactNode } from "react";

export const SideBarLayout = ({
  sidebar,
  content,
}: {
  sidebar: ReactNode;
  content: ReactNode;
}) => {
  return (
    <div className="flex w-screen h-screen bg-white dark:bg-zinc-900">
      {sidebar}
      {content}
    </div>
  );
};
SideBarLayout.displayName = "SideBarLayout";
