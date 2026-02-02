import type { ReactNode, Ref } from 'react';
import type { ComboboxInputProps } from '@headlessui/react';

import clsx from 'clsx';
import { useState } from 'react';
import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from '@headlessui/react';
import { tw } from '@/utils/string';

interface ComboboxItem {
  id: string;
  name: string;
}

interface ComboboxProps<T extends ComboboxItem> extends ComboboxInputProps<'input', T | null> {
  chosen: T | null;
  items: T[];
  label?: ReactNode;
  loading?: boolean;
  onChosen: (item: T | null) => void;
  ref?: Ref<HTMLInputElement>;
}

const fieldBaseClassName = tw`relative rounded-md border border-gray-900 bg-gray-200/50 px-px pb-0.5 text-gray-900 focus-within:border-2 focus-within:border-black focus-within:px-0 focus-within:pb-px data-disabled:border-gray-900/70 data-disabled:bg-gray-200/70 data-disabled:text-gray-900/70 dark:border-gray-200 dark:bg-gray-900/50 dark:text-gray-200 dark:focus-within:border-white dark:data-disabled:border-gray-200/70 dark:data-disabled:bg-gray-900/70 dark:data-disabled:text-gray-200/70`;
const fieldLoadingClassName = tw`animate-pulse`;

const labelBaseClassName = tw`cursor-text px-1 font-bold data-disabled:cursor-not-allowed`;
const labelRequiredClassName = tw`after:content-['*']`;

const inputBaseClassName = tw`w-full px-3.5 pb-1 outline-none data-disabled:cursor-not-allowed`;
const inputPlaceholderClassName = tw`placeholder:font-serif placeholder:italic`;

const Combobox = <T extends ComboboxItem>({
  chosen,
  className,
  disabled,
  items,
  label = 'Tekst',
  loading,
  name,
  onChosen,
  required,
  ...props
}: ComboboxProps<T>) => {
  const fieldStyle = clsx(fieldBaseClassName, loading && fieldLoadingClassName, className);
  const labelStyle = clsx(labelBaseClassName, required && labelRequiredClassName);
  const inputStyle = clsx(inputBaseClassName, inputPlaceholderClassName);

  const [query, setQuery] = useState('');
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <Field as="fieldset" className={fieldStyle} disabled={loading || disabled}>
      <legend className="ml-2.75">
        <Label className={labelStyle}>{label}</Label>
      </legend>
      <HeadlessCombobox
        value={chosen}
        onChange={onChosen}
        onClose={() => setQuery('')}
        name={name}
        virtual={{ options: filteredItems.length > 0 ? filteredItems : [null] }}
      >
        <ComboboxInput
          className={inputStyle}
          required={required}
          displayValue={(item) => item?.name || ''}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          {...props}
        />

        <ComboboxButton className="group absolute -top-0.5 right-0 cursor-pointer px-2 text-gray-900 data-disabled:cursor-not-allowed data-disabled:text-gray-900/70 dark:text-gray-200 dark:data-disabled:text-gray-200/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </ComboboxButton>

        <ComboboxOptions
          anchor="bottom"
          modal={false}
          transition
          className="z-50 -ml-4 flex min-w-[calc(var(--input-width)+0.25rem)] flex-col rounded-md border-2 border-black/70 bg-white/50 p-2 shadow-md transition duration-200 ease-out [--anchor-gap:1rem] [--anchor-max-height:15rem] [--anchor-padding:1rem] empty:invisible data-closed:scale-95 data-closed:opacity-0 dark:border-white/70 dark:bg-black/50"
        >
          {({ option: item }) => (
            <ComboboxOption
              key={item?.id || '__empty__'}
              value={item}
              className="group flex h-10 w-full cursor-pointer items-center gap-2 rounded-md p-2 font-semibold text-gray-900 select-none hover:bg-gray-900/10 data-disabled:cursor-not-allowed data-disabled:text-gray-900/70 dark:text-gray-200 dark:hover:bg-gray-200/10 dark:data-disabled:text-gray-200/70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="invisible size-5 group-data-selected:visible"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {item?.name || 'Brak dopasowań'}
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </HeadlessCombobox>
    </Field>
  );
};

export default Combobox;
