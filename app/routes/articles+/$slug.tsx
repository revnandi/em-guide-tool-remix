import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { invariant } from "@epic-web/invariant";
import { db } from "~/drizzle/config.server";
import { articles } from "~/drizzle/schema.server";
import { eq } from "drizzle-orm";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.slug, "params.slug is required");

  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, params.slug),
  });

  invariant(article, `Article not found: ${params.slug}`);

  return json({ article });
};

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  return <div>Article {article.title}</div>;
}
