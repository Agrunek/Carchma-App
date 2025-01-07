import type { InputProps as HeadlessInputProps } from '@headlessui/react';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { Field, Input as HeadlessInput, Label } from '@headlessui/react';
import { tw } from '@/utils/string';

export interface InputProps extends HeadlessInputProps {
  label: string;
  loading?: boolean;
}

const containerBaseClassName = tw`rounded-md border-2 border-emerald-700 px-2 data-[disabled]:border-gray-400`;
const containerLoadingClassName = tw`animate-pulse`;

const headingBaseClassName = tw`px-1 font-semibold text-emerald-700 data-[disabled]:text-gray-400`;
const headingRequiredClassName = tw`after:content-['*']`;

const contentBaseClassName = tw`w-full bg-transparent px-1 pb-1.5 focus:outline-none data-[disabled]:text-gray-400`;

const Input = (
  { className, label, loading, required, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const containerStyle = clsx(containerBaseClassName, loading && containerLoadingClassName);
  const headingStyle = clsx(headingBaseClassName, required && headingRequiredClassName);
  const contentStyle = clsx(contentBaseClassName, className);

  return (
    <Field as="fieldset" className={containerStyle}>
      <legend>
        <Label className={headingStyle}>{label}</Label>
      </legend>
      <HeadlessInput ref={ref} required={required} className={contentStyle} {...props} />
    </Field>
  );
};

export default forwardRef(Input);
