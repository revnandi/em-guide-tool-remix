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
import { useIsPending } from "~/utils/misc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/card";
import { Button } from "~/components/button";

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
    <main className="">
      <div className="container mx-auto">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="POST" {...getFormProps(form)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Field
                    labelProps={{
                      children: "Username",
                    }}
                    inputProps={{
                      ...getInputProps(fields.username, { type: "text" }),
                      autoFocus: true,
                      className: "lowercase",
                      autoComplete: "username",
                    }}
                    errors={fields.username.errors}
                  />
                  <Field
                    labelProps={{
                      children: "Password",
                    }}
                    inputProps={{
                      ...getInputProps(fields.password, { type: "password" }),
                      autoComplete: "current-password",
                    }}
                    errors={fields.password.errors}
                  />
                  <CheckboxField
                    labelProps={{ children: "Remember me" }}
                    buttonProps={{
                      ...getInputProps(fields.remember, { type: "checkbox" }),
                    }}
                  />
                </div>
                <Button className="w-full" type="submit" variant="ghost">Log in</Button>
              </div>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </main>
  );
}
