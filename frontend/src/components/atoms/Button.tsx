import type { ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { Button as HeadlessButton } from '@headlessui/react';
import { tw } from '@/utils/string';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends HeadlessButtonProps {
  loading?: boolean;
  variant?: ButtonVariant;
}

const baseClassName = tw`inline-flex items-center justify-center gap-2 font-semibold`;

const variantClassNames: ClassNameDictionary<ButtonVariant> = {
  primary: tw`rounded-md bg-emerald-700 px-3.5 py-2 text-white data-[disabled]:bg-gray-400 data-[hover]:bg-emerald-600 data-[hover]:data-[active]:bg-emerald-800`,
  secondary: tw`rounded-md border-2 border-emerald-700 bg-gray-100 px-3 py-1.5 text-emerald-700 data-[disabled]:border-gray-400 data-[hover]:bg-gray-200 data-[hover]:data-[active]:bg-gray-50 data-[disabled]:text-gray-400`,
  tertiary: tw`px-3.5 py-2 text-emerald-700 data-[disabled]:text-gray-400 data-[hover]:data-[active]:text-emerald-800 data-[hover]:text-emerald-600 data-[hover]:underline`,
};

const loadingClassName = tw`animate-pulse`;

const Button = ({ className, disabled, loading, variant = 'primary', ...props }: ButtonProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], loading && loadingClassName, className);

  return <HeadlessButton disabled={disabled || loading} className={style} {...props} />;
};

export default Button;
