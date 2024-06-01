import type { MetaFunction } from "@remix-run/node";
import { SideBarLayout } from "~/components/sidebar-layout";
import { SideBar } from "~/components/sidebar";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Articles" },
    { name: "description", content: "EM GUIDE - Articles" },
  ];
};
export default function Articles() {
  return (
    <div>
      <div>
        <h1>Articles List</h1>
      </div>
    </div>
  );
}
