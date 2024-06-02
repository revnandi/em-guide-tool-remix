import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { SideBarLayout } from "~/components/sidebar-layout";
import { SideBar } from "~/components/sidebar";
import {
  Form,
  NavLink,
  Outlet,
  json,
  redirect,
  useActionData,
  useSearchParams,
} from "@remix-run/react";
import { Icon } from "~/components/icon";
import { z } from "zod";
import { useIsPending } from "~/utils/misc";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Field, CheckboxField } from "~/components/form";
import { StatusButton } from "~/components/status-button";
import { drizzle } from "drizzle-orm/mysql2";
import { articles, articlesRelations } from "~/drizzle/schema.server";
import { db } from "~/drizzle/config.server";
import slugify from "slugify";
import { useState } from "react";
import { DrizzleError } from "types/drizzle-error";

export const meta: MetaFunction = () => {
  return [
    { title: "Add new article | EM GUIDE" },
    { name: "description", content: "EM GUIDE - Articles" },
  ];
};

const AddArticleFormSchema = z.object({
  title: z.string(),
  slug: z.string(),
  originalUrl: z.string().url().optional(),
  excerpt: z.string().optional(),
  redirectTo: z.string().optional(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const originalUrl = formData.get("originalUrl");

  try {
    await db.insert(articles).values({ title, slug, originalUrl }).execute();
  } catch (error: unknown) {
    const err = error as DrizzleError
    return json(err.message, { status: 500 });
  }

  return json({ message: "Resource added" }, { status: 201 });
}
export default function AddArticles() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [form, fields] = useForm({
    id: "add-article-form",
    constraint: getZodConstraint(AddArticleFormSchema),
    defaultValue: { redirectTo },
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddArticleFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(slugify(newTitle));
  };

  // ! Fix slugify when directly editing slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
  };

  return (
    <div className="w-full px-12 py-16">
      <NavLink to="/articles" className="flex gap-1">
        <Icon name="arrow-left" size="lg" className="text-indigo-600" />
        <span className="text-indigo-600">Back</span>
      </NavLink>
      <div className="flex justify-between mt-4 mb-4">
        <div className="text-3xl font-medium text-white">
          <h1>Add Article</h1>
        </div>
        <NavLink
          to="/articles/add"
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors ease-in-out bg-indigo-600 rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-indigo-500 h-9"
        >
          <Icon name="plus" size="sm" className="text-white" />
          <span>Add new article</span>
        </NavLink>
      </div>
      <div className="border p-4 dark:border-zinc-700 rounded-md dark:bg-zinc-900 transition-colors hover:dark:bg-zinc-900 data-[state=selected]:dark:bg-zinc-900">
        <Form method="POST" {...getFormProps(form)}>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-y-4 gap-x-6">
              <Field
                className="col-span-6"
                labelProps={{
                  children: "Title",
                }}
                inputProps={{
                  ...getInputProps(fields.title, { type: "text" }),
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
                  ...getInputProps(fields.originalUrl, { type: "text" }),
                }}
                errors={fields.originalUrl.errors}
              />
              {/* <CheckboxField
                labelProps={{ children: "Remember me" }}
                buttonProps={{
                  ...getInputProps(fields.remember, { type: "checkbox" }),
                }}
              /> */}
            </div>
            <StatusButton
              className=""
              type="submit"
              status={isPending ? "pending" : form.status ?? "idle"}
              variant="ghost"
              disabled={isPending}
            >
              Create article
            </StatusButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
