import type { ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { Button as HeadlessButton } from '@headlessui/react';
import { tw } from '@/utils/string';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends HeadlessButtonProps {
  variant?: ButtonVariant;
}

const baseClassName = tw`inline-flex items-center justify-center gap-2 font-semibold`;

const variantClassNames: ClassNameDictionary<ButtonVariant> = {
  primary: tw`rounded-md bg-emerald-700 px-3.5 py-2 text-white`,
  secondary: tw`rounded-md border-2 border-emerald-700 bg-gray-100 px-3 py-1.5 text-emerald-700`,
  tertiary: tw`px-3.5 py-2 text-emerald-700`,
};

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return <HeadlessButton className={style} {...props} />;
};

export default Button;
