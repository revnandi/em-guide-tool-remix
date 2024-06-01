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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
          <div>
      <h1>Articles List</h1>
    </div>
    </div>
  );
}
