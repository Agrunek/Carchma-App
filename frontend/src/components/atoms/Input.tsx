import type { ReactNode, Ref } from 'react';
import type { InputProps as HeadlessInputProps } from '@headlessui/react';

import clsx from 'clsx';
import { Field, Input as HeadlessInput, Label } from '@headlessui/react';
import { tw } from '@/utils/string';

interface InputProps extends HeadlessInputProps {
  label?: ReactNode;
  loading?: boolean;
  ref?: Ref<HTMLInputElement>;
}

const fieldBaseClassName = tw`rounded-md border border-gray-900 bg-gray-200/50 px-px pb-0.5 text-gray-900 focus-within:border-2 focus-within:border-black focus-within:px-0 focus-within:pb-px data-disabled:border-gray-900/70 data-disabled:bg-gray-200/70 data-disabled:text-gray-900/70 dark:border-gray-200 dark:bg-gray-900/50 dark:text-gray-200 dark:focus-within:border-white dark:data-disabled:border-gray-200/70 dark:data-disabled:bg-gray-900/70 dark:data-disabled:text-gray-200/70`;
const fieldLoadingClassName = tw`animate-pulse`;

const labelBaseClassName = tw`cursor-text px-1 font-bold data-disabled:cursor-not-allowed`;
const labelRequiredClassName = tw`after:content-['*']`;

const inputBaseClassName = tw`px-3.5 py-1 outline-none data-disabled:cursor-not-allowed`;
const inputPlaceholderClassName = tw`placeholder:font-serif placeholder:italic`;

const Input = ({ className, disabled, label = 'Tekst', loading, required, ...props }: InputProps) => {
  const fieldStyle = clsx(fieldBaseClassName, loading && fieldLoadingClassName, className);
  const labelStyle = clsx(labelBaseClassName, required && labelRequiredClassName);
  const inputStyle = clsx(inputBaseClassName, inputPlaceholderClassName);

  return (
    <Field as="fieldset" className={fieldStyle} disabled={loading || disabled}>
      <legend className="ml-2.75">
        <Label className={labelStyle}>{label}</Label>
      </legend>
      <HeadlessInput className={inputStyle} required={required} {...props} />
    </Field>
  );
};

export default Input;
