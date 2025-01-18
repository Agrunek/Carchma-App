import type { LinkComponentProps } from '@tanstack/react-router';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { createLink } from '@tanstack/react-router';
import { tw } from '@/utils/string';

const LinkComponent = createLink('a');

const baseClassName = tw`font-semibold text-emerald-700 hover:text-emerald-600 hover:underline active:text-emerald-800 [&:not([href])]:pointer-events-none [&:not([href])]:text-gray-400`;

const Link = ({ className, ...props }: LinkComponentProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
  const style = clsx(baseClassName, className);

  return <LinkComponent preload="intent" ref={ref} className={style} {...props} />;
};

export default forwardRef(Link);
