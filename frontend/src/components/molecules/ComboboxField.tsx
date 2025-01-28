import type { ComboboxItem, ComboboxProps } from '@/components/atoms/Combobox';

import { forwardRef } from 'react';
import { Field } from '@headlessui/react';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import Combobox from '@/components/atoms/Combobox';

interface ComboboxFieldProps<T extends ComboboxItem> extends ComboboxProps<T> {
  className?: string;
  invalid?: boolean;
  invalidMessage?: string;
}

const ComboboxField = <T extends ComboboxItem>(
  { className, invalid, invalidMessage, onChosen, ...props }: ComboboxFieldProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <Field className={className}>
      <Combobox ref={ref} onChosen={onChosen as (item: ComboboxItem | null) => void} {...props} />
      <ErrorMessage error={invalid}>{invalidMessage}</ErrorMessage>
    </Field>
  );
};

export default forwardRef(ComboboxField);
