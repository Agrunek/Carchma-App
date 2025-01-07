import type { InputProps } from '@/components/atoms/Input';

import { forwardRef } from 'react';
import { Field } from '@headlessui/react';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import Input from '@/components/atoms/Input';

interface InputFieldProps extends InputProps {
  className?: string;
  invalidMessage?: string;
}

const InputField = (
  { className, invalid, invalidMessage, ...props }: InputFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <Field className={className}>
      <Input invalid={invalid} ref={ref} {...props} />
      <ErrorMessage error={invalid}>{invalidMessage}</ErrorMessage>
    </Field>
  );
};

export default forwardRef(InputField);
