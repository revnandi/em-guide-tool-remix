import type { MetaFunction } from "@remix-run/node";
import { SideBarLayout } from "~/components/sidebar-layout";
import { SideBar } from "~/components/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Article" },
    { name: "description", content: "EM GUIDE - Add Article" },
  ];
};
export default function AddArticles() {
  return (
    <div>
      <h1>Add Articles</h1>
    </div>
  );
}