import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { z } from "zod";
// import { GeneralErrorBoundary } from "~components/error-boundary.tsx";
import { CheckboxField, ErrorList, Field } from "~/components/form";
import EditorContent from '~/components/form/wysiwyg'
import { useIsPending } from "~/utils/misc";

// TODO make schemas more nuanced
const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  redirectTo: z.string().optional(),
  remember: z.boolean().optional(),
});
export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const [form, fields] = useForm({
    id: "login-form",
    constraint: getZodConstraint(LoginFormSchema),
    defaultValue: { redirectTo },
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="container mx-auto">
      <div className="max-w-prose mx-auto p-4">
        <div className="mb-4">
          <h1 className="font-bold text-3xl">Log in</h1>
        </div>
        <Form method="POST" {...getFormProps(form)}>
          <Field
            labelProps={{ children: "Username" }}
            inputProps={{
              ...getInputProps(fields.username, { type: "text" }),
              autoFocus: true,
              className: "lowercase",
              autoComplete: "username",
            }}
            errors={fields.username.errors}
          />
        </Form>
        <EditorContent></EditorContent>
      </div>
    </div>
  );
}