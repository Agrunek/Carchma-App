import type { InputProps as HeadlessInputProps } from '@headlessui/react';

import clsx from 'clsx';
import { Field, Input as HeadlessInput, Label } from '@headlessui/react';
import { tw } from '@/utils/string';

interface InputProps extends HeadlessInputProps {
  loading?: boolean;
  name: string;
}

const containerBaseClassName = tw`rounded-md border-2 border-emerald-700 px-2 data-[disabled]:border-gray-400`;
const containerLoadingClassName = tw`animate-pulse`;

const headingBaseClassName = tw`px-1 font-semibold text-emerald-700 data-[disabled]:text-gray-400`;
const headingRequiredClassName = tw`after:content-['*']`;

const contentBaseClassName = tw`bg-transparent px-1 pb-1.5 focus:outline-none data-[disabled]:text-gray-400 data-[invalid]:text-red-500`;

const Input = ({ className, disabled, invalid, loading, name, required, ...props }: InputProps) => {
  const containerStyle = clsx(containerBaseClassName, loading && containerLoadingClassName);
  const headingStyle = clsx(headingBaseClassName, required && headingRequiredClassName);
  const contentStyle = clsx(contentBaseClassName, className);

  const block = disabled || loading;

  return (
    <Field as="fieldset" disabled={block} className={containerStyle}>
      <legend>
        <Label className={headingStyle}>{name}</Label>
      </legend>
      <HeadlessInput invalid={invalid && !block} name={name} required={required} className={contentStyle} {...props} />
    </Field>
  );
};

export default Input;
