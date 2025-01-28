import type { CheckboxProps } from '@/components/atoms/Checkbox';

import React, { forwardRef } from 'react';
import { Field } from '@headlessui/react';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import Checkbox from '@/components/atoms/Checkbox';

interface CheckboxFieldProps extends CheckboxProps {
  className?: string;
  invalid?: boolean;
  invalidMessage?: string;
}

const CheckboxField = (
  { className, invalid, invalidMessage, ...props }: CheckboxFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <Field className={className}>
      <Checkbox ref={ref} {...props} />
      <ErrorMessage error={invalid}>{invalidMessage}</ErrorMessage>
    </Field>
  );
};

export default forwardRef(CheckboxField);
