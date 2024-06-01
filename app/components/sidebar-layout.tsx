import { ReactNode } from "react";

export const SideBarLayout = ({
  sidebar,
  content,
}: {
  sidebar: ReactNode;
  content: ReactNode;
}) => {
  return (
    <div className="flex w-screen h-screen bg-white dark:bg-zinc-950">
      {sidebar}
      {content}
    </div>
  );
};
SideBarLayout.displayName = "SideBarLayout";
