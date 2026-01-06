import type { Ref } from 'react';
import type { ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { Button as HeadlessButton } from '@headlessui/react';
import { tw } from '@/utils/string';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends HeadlessButtonProps {
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
}

const baseClassName = tw`inline-flex cursor-pointer items-center justify-center gap-2 font-bold data-disabled:cursor-not-allowed`;

const variantClassNames: ClassNameDictionary<ButtonVariant> = {
  primary: tw`rounded-md bg-gray-900 px-4 py-2 text-gray-200 transition data-disabled:bg-gray-900/70 data-disabled:text-gray-200/70 data-hover:bg-gray-800 data-hover:data-active:scale-95 data-hover:data-active:bg-rose-800 dark:bg-gray-200 dark:text-gray-900 dark:data-disabled:bg-gray-200/70 dark:data-disabled:text-gray-900/70 dark:data-hover:bg-gray-300 dark:data-hover:data-active:bg-rose-300`,
  secondary: tw`rounded-md border border-gray-900 bg-gray-200/50 px-3.75 py-1.75 text-gray-900 transition data-disabled:border-gray-900/70 data-disabled:bg-gray-200/70 data-disabled:text-gray-900/70 data-hover:bg-gray-300/50 data-hover:data-active:scale-95 data-hover:data-active:bg-rose-300/50 dark:border-gray-200 dark:bg-gray-900/50 dark:text-gray-200 dark:data-disabled:border-gray-200/70 dark:data-disabled:bg-gray-900/70 dark:data-disabled:text-gray-200/70 dark:data-hover:bg-gray-800/50 dark:data-hover:data-active:bg-rose-800/50`,
  tertiary: tw`text-base text-gray-900 underline data-disabled:text-gray-900/70 data-hover:font-black data-hover:decoration-2 dark:text-gray-200 dark:data-disabled:text-gray-200/70`,
};

const loadingClassName = tw`animate-pulse`;

const Button = ({ className, disabled, loading, variant = 'primary', ...props }: ButtonProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], loading && loadingClassName, className);

  return <HeadlessButton className={style} disabled={loading || disabled} {...props} />;
};

export default Button;
