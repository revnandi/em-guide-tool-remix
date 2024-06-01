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
export default function AddArticles() {
  return (
    <div>
        <h1>Add Article</h1>
    </div>
  );
}
