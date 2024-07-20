import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
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
import { db } from "~/drizzle/config.server";
import { DrizzleError } from "types/drizzle-error";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { magazines } from "~/drizzle/schema.server";
import { toast } from "sonner";

export const meta: MetaFunction = () => {
  return [
    { title: "Add new magazine | EM GUIDE" },
    { name: "description", content: "EM GUIDE - Magazines" },
  ];
};

const AddMagazineFormSchema = z.object({
  name: z.string(),
  slug: z.string(),
  redirectTo: z.string().optional(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name");
  const slug = formData.get("slug");

  try {
    await db.insert(magazines).values({ name, slug }).execute();
    return json({ message: "Magazine created" }, { status: 201 });
  } catch (error: unknown) {
    const err = error as DrizzleError;
    if ((err.code = "ER_DUP_ENTRY"))
      return json(
        { error: "Magazine with that slug already exists." },
        { status: 400 }
      );

    return json(err, { status: 500 });
  }
}
export default function AddMagazine() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (actionData?.message) {
      toast.success(actionData?.message);
    } else if (actionData?.error) {
      toast.error(actionData?.error);
    }
  }, [actionData]);

  const [form, fields] = useForm({
    id: "add-magazine-form",
    constraint: getZodConstraint(AddMagazineFormSchema),
    defaultValue: { redirectTo },
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddMagazineFormSchema });
    },

    shouldRevalidate: "onBlur",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(slugify(newName, { lower: true, strict: true }));
  };

  // ! Fix slugify when directly editing slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
  };

  return (
    <div className="w-full px-12 py-16">
      <NavLink to="/magazines" className="flex gap-1">
        <Icon name="arrow-left" size="lg" className="text-indigo-600" />
        <span className="text-indigo-600">Back</span>
      </NavLink>
      <div className="flex justify-between mt-4 mb-4">
        <div className="text-3xl font-medium text-white">
          <h1>Add Magazine</h1>
        </div>
        <NavLink
          to="/magazines/add"
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors ease-in-out bg-indigo-600 rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-indigo-500 h-9"
        >
          <Icon name="plus" size="sm" className="text-white" />
          <span>Add new magazine</span>
        </NavLink>
      </div>
      <div className="border p-4 dark:border-zinc-700 rounded-md dark:bg-zinc-900 transition-colors hover:dark:bg-zinc-900 data-[state=selected]:dark:bg-zinc-900">
        <Form method="POST" {...getFormProps(form)}>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-y-4 gap-x-6">
              <Field
                className="col-span-6"
                labelProps={{
                  children: "Name",
                }}
                inputProps={{
                  ...getInputProps(fields.name, { type: "text" }),
                  autoFocus: true,
                  onChange: handleTitleChange,
                }}
                errors={fields.name.errors}
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
            </div>
            <StatusButton
              className=""
              type="submit"
              status={isPending ? "pending" : form.status ?? "idle"}
              variant="ghost"
              disabled={isPending}
            >
              Create magazine
            </StatusButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
