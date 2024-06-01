import type { MetaFunction } from "@remix-run/node";
import { SideBarLayout } from "~/components/sidebar-layout";
import { SideBar } from "~/components/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Articles" },
    { name: "description", content: "EM GUIDE - Articles" },
  ];
};
export default function Articles() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <SideBarLayout sidebar={<SideBar />} content={<h1>fdgadg</h1>} />
    </div>
  );
}
