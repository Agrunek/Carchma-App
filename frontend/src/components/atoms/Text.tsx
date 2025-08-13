import type { ElementType, ReactNode } from 'react';
import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { tw } from '@/utils/string';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const ACCEPTED_ELEMENTS = ['h1', 'h2', 'h3', 'p', 'span'] as const satisfies readonly ElementType[];

type TextVariant = 'heading' | 'subheading' | 'paragraph';

interface TextProps {
  as?: (typeof ACCEPTED_ELEMENTS)[number];
  children?: ReactNode;
  className?: string;
  variant?: TextVariant;
}

const baseClassName = tw`text-gray-900 dark:text-gray-200`;

const variantClassNames: ClassNameDictionary<TextVariant> = {
  heading: tw`text-2xl font-bold`,
  subheading: tw`text-xl font-semibold`,
  paragraph: tw`text-base font-medium`,
};

const Text = ({ as: Element = 'p', children, className, variant = 'paragraph' }: TextProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return <Element className={style}>{children}</Element>;
};

export default Text;
