import type { LinkComponentProps } from '@tanstack/react-router';
import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { createLink } from '@tanstack/react-router';
import { tw } from '@/utils/string';

type LinkVariant = 'primary' | 'secondary';

interface LinkProps extends LinkComponentProps {
  variant?: LinkVariant;
}

const LinkComponent = createLink('a');

const baseClassName = tw`font-semibold hover:underline [&:not([href])]:pointer-events-none [&:not([href])]:text-gray-400`;

const variantClassNames: ClassNameDictionary<LinkVariant> = {
  primary: tw`text-emerald-700 hover:text-emerald-600 active:text-emerald-800`,
  secondary: tw`text-gray-100 hover:text-gray-200 active:text-gray-50`,
};

const Link = ({ className, variant = 'primary', ...props }: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return <LinkComponent preload="intent" ref={ref} className={style} {...props} />;
};

export default forwardRef(Link);
