import type { CheckboxProps as HeadlessCheckboxProps } from '@headlessui/react';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react';
import CheckIcon from '@/components/atoms/CheckIcon';
import { tw } from '@/utils/string';

export interface CheckboxProps extends HeadlessCheckboxProps {
  label: string;
  loading?: boolean;
  required?: boolean;
}

const containerBaseClassName = tw`flex items-center gap-2`;
const containerLoadingClassName = tw`animate-pulse`;

const headingBaseClassName = tw`font-semibold text-emerald-700 data-[disabled]:text-gray-400`;
const headingRequiredClassName = tw`after:content-['*']`;

const contentBaseClassName = tw`group size-6 rounded-md border-2 border-emerald-700 bg-gray-100 p-px text-emerald-700 data-[disabled]:border-gray-400 data-[checked]:bg-emerald-700 data-[disabled]:data-[checked]:bg-gray-400 data-[checked]:text-white data-[disabled]:text-gray-400`;

const Checkbox = (
  { className, disabled, label, loading, required, ...props }: CheckboxProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const containerStyle = clsx(containerBaseClassName, loading && containerLoadingClassName);
  const headingStyle = clsx(headingBaseClassName, required && headingRequiredClassName);
  const contentStyle = clsx(contentBaseClassName, className);

  return (
    <Field as="fieldset" disabled={disabled} className={containerStyle}>
      <HeadlessCheckbox ref={ref} className={contentStyle} {...props}>
        <CheckIcon />
      </HeadlessCheckbox>
      <Label className={headingStyle}>{label}</Label>
    </Field>
  );
};

export default forwardRef(Checkbox);
