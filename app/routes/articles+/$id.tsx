import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
import {
  Form,
  NavLink,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { invariant, invariantResponse } from "@epic-web/invariant";
import { db } from "~/drizzle/config.server";
import { articles, languages } from "~/drizzle/schema.server";
import { DrizzleError, eq } from "drizzle-orm";
import { Icon } from "~/components/icon";
import { getCurrentFormattedDateTime } from "~/utils/date";
import { Field, SelectField, WysiwygField } from "~/components/form";
import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { GeneralErrorBoundary } from "~/components/error-boundary";
import { StatusButton } from "~/components/status-button";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useIsPending } from "~/utils/misc";
import slugify from "slugify";

// type Article = typeof articles.$inferSelect;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.article?.title} | EM GUIDE` },
    { name: "description", content: `EM GUIDE - ${data?.article?.title}` },
  ];
};

const EditArticleFormSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  originalUrl: z.string().url().optional(),
  language: z.string(),
  excerpt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  redirectTo: z.string().optional(),
});

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "params.id is required");

  const article = await db.query.articles.findFirst({
    where: eq(articles.id, Number(params.id)),
  });

  const languages = await db.query.languages.findMany();

  invariantResponse(article, `Article not found: ${params.id}`, {
    status: 404,
  });

  invariantResponse(languages, `There was an error loading languages`, {
    status: 404,
  });

  return json({ article, languages });
};

export async function action({ request }: ActionFunctionArgs) {
  console.log("actionnnn");
  const formData = await request.formData();

  const intent = formData.get("intent");
  // if (intent === "PUBLISH") {
  //   console.log("like");
  // } else if (intent === "SAVE") {
  //   console.log("like");


  const id = Number(formData.get("id")) as number;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const originalUrl = formData.get("originalUrl") as string;
  const excerpt = formData.get("excerpt") as string;
  const languageId = Number(formData.get("language")) as number;

  console.warn(languageId);

  try {
    await db
      .update(articles)
      .set({
        id,
        title,
        slug,
        excerpt,
        originalUrl,
        languageId,
        // TODO: Fix handling published states, maybe access article here somehow?
        publishedAt: intent === "PUBLISH" ? new Date() : article.publishedAt,
        isPublished: intent === "PUBLISH",
      })
      .where(eq(articles.id, id))
      .execute();
  } catch (error: unknown) {
    const err = error as DrizzleError;
    return json(err.message, { status: 500 });
  }

  return json({ message: "Resource added" }, { status: 201 });
}

export default function Article() {
  const { article, languages } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [form, fields] = useForm({
    id: "add-article-form",
    constraint: getZodConstraint(EditArticleFormSchema),
    defaultValue: { redirectTo },
    lastResult: actionData?.message,
    onValidate({ formData }) {
      console.log(formData.get("language"));
      return parseWithZod(formData, { schema: EditArticleFormSchema });
    },
    shouldRevalidate: "onBlur",
    onSubmit(event) {
      console.log(event);
    },
  });

  useEffect(() => {
    if (article.slug) {
      setSlug(article.slug);
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(slugify(newTitle, { lower: true, strict: true }));
  };

  // ! Fix slugify when directly editing slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = slugify(e.target.value, { lower: true, strict: true });
    setSlug(newSlug);
  };

  console.log(form.status);
  console.log(form.errors);

  return (
    <main className="w-full px-12 py-16">
      <NavLink to="/articles" className="flex gap-1">
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
      <Form method="POST" {...getFormProps(form)}>
        <div className="flex flex-col gap-4 lg:items-center lg:flex-row">
          <div className="flex items-center gap-4">
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
          <div className="flex gap-4 py-4 border-zinc-600 border-y lg:border-0 lg:py-0">
            <StatusButton
              name="intent"
              value="SAVE"
              type="submit"
              status={isPending ? "pending" : form.status ?? "idle"}
              variant="ghost"
              disabled={isPending}
            >
              Save draft
            </StatusButton>
            {!article.isPublished && !article.publishedAt && (
              <StatusButton
                name="intent"
                value="PUBLISH"
                type="submit"
                status={isPending ? "pending" : form.status ?? "idle"}
                variant="ghost"
                disabled={isPending}
              >
                Save and publish
              </StatusButton>
            )}
          </div>
        </div>
        <div className="mt-8">
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-y-4 gap-x-6">
              <Field
                className="hidden"
                labelProps={{
                  children: "",
                }}
                inputProps={{
                  ...getInputProps(fields.id, { type: "hidden" }),
                  value: article.id,
                }}
                errors={fields.id.errors}
              />
              <Field
                className="col-span-6"
                labelProps={{
                  children: "Title",
                }}
                inputProps={{
                  ...getInputProps(fields.title, { type: "text" }),
                  defaultValue: article.title ?? "",
                  autoFocus: true,
                  onChange: handleTitleChange,
                }}
                errors={fields.title.errors}
              />
              <Field
                className="col-span-6"
                labelProps={{
                  children: "Slug",
                }}
                inputProps={{
                  ...getInputProps(fields.slug, { type: "text" }),
                  onChange: handleSlugChange,
                  value: slug,
                }}
                errors={fields.slug.errors}
              />
              <Field
                className="col-span-6"
                labelProps={{
                  children: "Original URL",
                }}
                inputProps={{
                  ...getInputProps(fields.originalUrl, { type: "url" }),
                  defaultValue: article.originalUrl ?? "",
                }}
                errors={fields.originalUrl.errors}
              />
              <WysiwygField
                className="col-span-12"
                labelProps={{
                  children: "Excerpt",
                }}
                inputProps={{
                  defaultValue: article.excerpt ?? "",
                  ...getInputProps(fields.excerpt, {
                    type: "hidden",
                  }),
                }}
              />
              <SelectField
                className="col-span-6"
                labelProps={{
                  children: "Language",
                }}
                selectProps={{
                  ...getSelectProps(fields.language),
                  defaultValue: article.languageId?.toString() ?? "",
                  placeholder: "Select language",
                }}
                options={languages.map((language) => ({
                  label: language.name,
                  value: language.id.toString(),
                }))}
                errors={fields.language.errors}
              />
            </div>
          </div>
        </div>
      </Form>
    </main>
  );
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => (
          <div className="flex flex-col items-center justify-center dark:text-white">
            <p className="text-lg">
              No article with the id "{params.id}" exists.
            </p>
            <NavLink
              to="/articles"
              className="inline-flex items-center justify-center gap-1 px-4 py-1 mt-2 text-sm font-medium text-indigo-600 transition-colors ease-in-out rounded-md w-fit whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-violet-100 hover:bg-violet-50"
            >
              <Icon name="arrow-left" size="lg" className="text-indigo-600" />
              <span className="text-indigo-600">Back to articles</span>
            </NavLink>
          </div>
        ),
      }}
    />
  );
}
