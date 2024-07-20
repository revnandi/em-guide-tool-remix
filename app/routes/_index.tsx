import type { MetaFunction } from "@remix-run/node";
import { SideBarLayout } from "~/components/sidebar-layout";
import { SideBar } from "~/components/sidebar";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export default function Index() {
  return (
    <div>
      <div>
        <h1>Articles</h1>
      </div>
    </div>
  );
}
