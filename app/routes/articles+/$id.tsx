import { LoaderFunctionArgs, json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { invariant } from "@epic-web/invariant";
import { db } from "~/drizzle/config.server";
import { articles } from "~/drizzle/schema.server";
import { eq } from "drizzle-orm";
import { Icon } from "~/components/icon";
import { getCurrentFormattedDateTime } from "~/utils/date";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "params.id is required");

  const article = await db.query.articles.findFirst({
    where: eq(articles.id, Number(params.id)),
  });

  invariant(article, `Article not found: ${params.id}`);

  return json({ article });
};

export default function Article() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div className="w-full px-12 py-16">
      <NavLink to="/" className="flex gap-1">
        <Icon name="arrow-left" size="lg" className="text-indigo-600" />
        <span className="text-indigo-600">Back</span>
      </NavLink>
      <div className="flex justify-between mt-4 mb-4">
        <div className="text-3xl font-medium text-white lg:text-4xl">
          <h1>{article.title}</h1>
        </div>
        <NavLink
          to="/articles/add"
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors ease-in-out bg-indigo-600 rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-indigo-500 h-9"
        >
          <Icon name="plus" size="sm" className="text-white" />
          <span>Create new</span>
        </NavLink>
      </div>
      <div className="bg-zinc-600 w-full h-[1px] my-4 inline-block"></div>
      <div className="flex gap-4">
        <div className="text-sm font-light text-zinc-400">
          Status:{" "}
          <span className="font-medium text-white">
            {article.isPublished ? "Published" : "Draft"}
          </span>
        </div>
        {article.publishedAt && (
          <div className="text-sm font-light text-zinc-400">
            Published at:{" "}
            <span className="font-medium text-white">
              {getCurrentFormattedDateTime(article.publishedAt)}
            </span>
          </div>
        )}
        {article.createdAt && (
          <div className="text-sm font-light text-zinc-400">
            Created at:{" "}
            <span className="font-medium text-white">
              {getCurrentFormattedDateTime(article.createdAt)}
            </span>
          </div>
        )}
        {article.updatedAt && (
          <div className="text-sm font-light text-zinc-400">
            Last updated at:{" "}
            <span className="font-medium text-white">
              {getCurrentFormattedDateTime(article.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
