import { useInputControl } from "@conform-to/react";
import React, { useId } from "react";
import { Checkbox, type CheckboxProps } from "~/components/form/checkbox";
import { Input } from "~/components/form/input";
import { Label } from "~/components/form/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { WysiwygEditor } from "./wysiwyg";
import { cn } from "~/utils/misc";

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <ul id={id} className="flex flex-col gap-1">
      {errorsToRender.map((e) => (
        <li key={e} className="text-[10px] text-red-500">
          {e}
        </li>
      ))}
    </ul>
  );
}

export function Field({
  labelProps,
  inputProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} className="inline-block mb-2" />
      <Input
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...inputProps}
        className={errors && errors?.length > 0 ? "dark:border-red-500" : ""}
      />
      <div
        className={cn(
          "min-h-[32px] px-4 pb-3 pt-1",
          errors && errors?.length > 0 ? "" : "hidden"
        )}
      >
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
}

export function WysiwygField({
  labelProps,
  inputProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} className="inline-block mb-2" />
      <WysiwygEditor
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...inputProps}
        className={errors && errors?.length > 0 ? "dark:border-red-500" : ""}
      />
      <div
        className={cn(
          "min-h-[32px] px-4 pb-3 pt-1",
          errors && errors?.length > 0 ? "" : "hidden"
        )}
      >
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
}

export function CheckboxField({
  labelProps,
  buttonProps,
  errors,
  className,
}: {
  labelProps: JSX.IntrinsicElements["label"];
  buttonProps: CheckboxProps & {
    name: string;
    form: string;
    value?: string;
  };
  errors?: ListOfErrors;
  className?: string;
}) {
  const { key, defaultChecked, ...checkboxProps } = buttonProps;
  const fallbackId = useId();
  const checkedValue = buttonProps.value ?? "on";
  const input = useInputControl({
    key,
    name: buttonProps.name,
    formId: buttonProps.form,
    initialValue: defaultChecked ? checkedValue : undefined,
  });
  const id = buttonProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <div className="flex gap-2">
        <Checkbox
          {...checkboxProps}
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          checked={input.value === checkedValue}
          onCheckedChange={(state) => {
            input.change(state.valueOf() ? checkedValue : "");
            buttonProps.onCheckedChange?.(state);
          }}
          onFocus={(event) => {
            input.focus();
            buttonProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            input.blur();
            buttonProps.onBlur?.(event);
          }}
          type="button"
        />
        <label
          htmlFor={id}
          {...labelProps}
          className="self-center text-body-xs text-muted-foreground"
        />
      </div>
      <div className="px-4 pt-1 pb-3">
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
}

export function SelectField({
  labelProps,
  selectProps,
  options,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  selectProps: React.SelectHTMLAttributes<HTMLSelectElement> & {
    placeholder?: string;
  };
  options?: {
    label: string;
    value: string;
  }[];
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = selectProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  console.warn(selectProps.defaultValue);

  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} className="inline-block mb-2" />
      <Select
        id={id}
        {...selectProps}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        defaultValue={selectProps.defaultValue?.toString()}
      >
        <SelectTrigger
          className={errors && errors?.length > 0 ? "dark:border-red-500" : ""}
        >
          <SelectValue placeholder={selectProps.placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option: { label: string; value: string }) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div
        className={cn(
          "min-h-[32px] px-4 pb-3 pt-1",
          errors && errors?.length > 0 ? "" : "hidden"
        )}
      >
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
}
