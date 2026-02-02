import type { Ref } from 'react';
import type { CheckboxProps as HeadlessCheckboxProps } from '@headlessui/react';

import clsx from 'clsx';
import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react';
import { tw } from '@/utils/string';

export interface CheckboxProps extends HeadlessCheckboxProps {
  label: string;
  loading?: boolean;
  required?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

const boxBaseClassName = tw`inline-flex items-center gap-2 text-gray-900 data-disabled:text-gray-900/70 dark:text-gray-200 dark:data-disabled:text-gray-200/70`;
const boxLoadingClassName = tw`animate-pulse`;

const labelBaseClassName = tw`cursor-text px-1 font-bold data-disabled:cursor-not-allowed`;
const labelRequiredClassName = tw`after:content-['*']`;

const checkBaseClassName = tw`group rounded-md border border-gray-900 bg-gray-200 p-0.5 data-checked:bg-gray-900 data-checked:text-gray-200 data-disabled:border-gray-900/70 data-disabled:bg-gray-200/70 dark:border-gray-200 dark:bg-gray-900 dark:data-checked:bg-gray-200 dark:data-checked:text-gray-900 dark:data-disabled:border-gray-200/70 dark:data-disabled:bg-gray-900/70`;

const Checkbox = ({ className, disabled, label, loading, required, ...props }: CheckboxProps) => {
  const boxStyle = clsx(boxBaseClassName, loading && boxLoadingClassName, className);
  const labelStyle = clsx(labelBaseClassName, required && labelRequiredClassName);
  const checkStyle = clsx(checkBaseClassName);

  return (
    <Field as="fieldset" disabled={loading || disabled} className={boxStyle}>
      <HeadlessCheckbox className={checkStyle} {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </HeadlessCheckbox>
      <Label className={labelStyle}>{label}</Label>
    </Field>
  );
};

export default Checkbox;
