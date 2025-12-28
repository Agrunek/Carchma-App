import type { AnchorHTMLAttributes, Ref } from 'react';
import type { LinkComponent } from '@tanstack/react-router';

import clsx from 'clsx';
import { createLink } from '@tanstack/react-router';
import { tw } from '@/utils/string';

interface BasicLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>;
}

const baseClassName = tw`text-base font-bold text-gray-900 underline hover:font-black hover:decoration-2 dark:text-gray-200`;

const BasicLinkComponent = ({ className, ...props }: BasicLinkProps) => {
  const style = clsx(baseClassName, className);

  return <a className={style} {...props} />;
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

export default Link;
