import type { LinkComponent as TanStackLinkComponent } from '@tanstack/react-router';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { createLink } from '@tanstack/react-router';
import { tw } from '@/utils/string';

const LinkComponent = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) => {
  return <a ref={ref} {...props} />;
};

const CreatedLinkComponent = createLink(forwardRef(LinkComponent));

const baseClassName = tw`font-semibold text-emerald-700 hover:text-emerald-600 hover:underline active:text-emerald-800 [&:not([href])]:pointer-events-none [&:not([href])]:text-gray-400`;

const Link: TanStackLinkComponent<typeof LinkComponent> = ({ className, ...props }) => {
  const style = clsx(baseClassName, className);

  return <CreatedLinkComponent preload="intent" className={style} {...props} />;
};

export default Link;
