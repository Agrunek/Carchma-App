import type { ComboboxInputProps } from '@headlessui/react';

import clsx from 'clsx';
import { useState, forwardRef } from 'react';
import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from '@headlessui/react';
import CheckIcon from '@/components/atoms/CheckIcon';
import ChevronDownIcon from '@/components/atoms/ChevronDownIcon';
import { tw } from '@/utils/string';

export interface ComboboxItem {
  id: string;
  name: string;
}

export interface ComboboxProps<T extends ComboboxItem> extends ComboboxInputProps<'input', T | null> {
  chosen: T | null;
  items: T[];
  label: string;
  loading?: boolean;
  onChosen: (item: T | null) => void;
}

const containerBaseClassName = tw`relative rounded-md border-2 border-emerald-700 px-2 data-[disabled]:border-gray-400`;
const containerLoadingClassName = tw`animate-pulse`;

const headingBaseClassName = tw`px-1 font-semibold text-emerald-700 data-[disabled]:text-gray-400`;
const headingRequiredClassName = tw`after:content-['*']`;

const contentBaseClassName = tw`w-full bg-transparent pb-1.5 pl-1 pr-8 focus:outline-none data-[disabled]:text-gray-400`;

const Combobox = <T extends ComboboxItem>(
  { chosen, className, disabled, items, label, loading, onChosen, required, ...props }: ComboboxProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const containerStyle = clsx(containerBaseClassName, loading && containerLoadingClassName);
  const headingStyle = clsx(headingBaseClassName, required && headingRequiredClassName);
  const contentStyle = clsx(contentBaseClassName, className);

  const [query, setQuery] = useState('');

  const filtered = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <Field as="fieldset" disabled={disabled} className={containerStyle}>
      <legend>
        <Label className={headingStyle}>{label}</Label>
      </legend>
      <HeadlessCombobox value={chosen} onChange={onChosen} onClose={() => setQuery('')} virtual={{ options: filtered }}>
        <ComboboxInput
          ref={ref}
          required={required}
          className={contentStyle}
          {...props}
          displayValue={(item) => item?.name || ''}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute right-0 top-0 px-2 text-emerald-700 data-[disabled]:text-gray-400 data-[hover]:data-[active]:text-emerald-800 data-[hover]:text-emerald-600">
          <ChevronDownIcon className="size-6" />
        </ComboboxButton>
        <ComboboxOptions
          anchor={{ to: 'bottom', gap: '1rem', padding: '3rem' }}
          modal={false}
          transition
          className="flex w-[var(--input-width)] flex-col rounded-md border-2 border-emerald-700 bg-gray-100 p-2 shadow-md shadow-emerald-700/50 transition ease-out empty:invisible data-[closed]:opacity-0"
        >
          {({ option: item }) => (
            <ComboboxOption
              key={item.id}
              value={item}
              className="group flex w-full cursor-default select-none items-center gap-2 rounded-md p-2 text-center text-emerald-700 data-[focus]:bg-gray-200 data-[hover]:bg-gray-200"
            >
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              <p className="text-black">{item.name}</p>
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </HeadlessCombobox>
    </Field>
  );
};

export default forwardRef(Combobox);
