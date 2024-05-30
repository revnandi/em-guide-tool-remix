import type { MetaFunction } from "@remix-run/node";
import { SideBarLayout } from "~/components/sidebar-layout";
import { SideBar } from "~/components/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <SideBarLayout sidebar={ <SideBar/> } content={ <h1>fdgadg</h1>} />
    </div>
  );
}
