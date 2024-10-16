import { Button as HeadlessButton } from '@headlessui/react';

import type { ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import type { ClassNameDictionary } from '@/types/utils';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends HeadlessButtonProps {
  variant?: ButtonVariant;
}

const classNames: ClassNameDictionary<ButtonVariant> = {
  primary:
    'inline-flex items-center gap-2 rounded-md bg-emerald-700 px-3.5 py-2 font-semibold text-white',
  secondary:
    'inline-flex items-center gap-2 rounded-md border-2 border-emerald-700 bg-gray-100 px-3 py-1.5 font-semibold text-emerald-700',
  tertiary:
    'inline-flex items-center gap-2 px-3.5 py-2 font-semibold text-emerald-700',
};

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return <HeadlessButton className={classNames[variant]} {...props} />;
};

export default Button;
