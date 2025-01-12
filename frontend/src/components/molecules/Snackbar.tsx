import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { tw } from '@/utils/string';

type SnackbarVariant = 'success' | 'warning' | 'error';

interface SnackbarProps {
  duration?: number;
  message: string;
  onClose?: () => void;
  open?: boolean;
  variant?: SnackbarVariant;
}

const baseClassName = tw`fixed bottom-4 right-4 z-50 rounded-md px-3.5 py-2 shadow-md transition duration-300 data-[enter]:translate-x-full data-[leave]:translate-y-full data-[enter]:opacity-0 data-[leave]:opacity-0 data-[enter]:ease-out`;

const variantClassNames: ClassNameDictionary<SnackbarVariant> = {
  success: tw`bg-emerald-700 shadow-emerald-700/50`,
  warning: tw`bg-orange-500 shadow-orange-500/50`,
  error: tw`bg-red-600 shadow-red-600/50`,
};

const Snackbar = ({ duration = 3000, message, onClose = () => {}, open, variant = 'success' }: SnackbarProps) => {
  const style = clsx(baseClassName, variantClassNames[variant]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, open]);

  return (
    <Transition show={open} as="div" className={style}>
      <p className="font-semibold text-white">{message}</p>
    </Transition>
  );
};

export default Snackbar;
