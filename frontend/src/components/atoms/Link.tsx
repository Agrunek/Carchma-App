import type { AnchorHTMLAttributes, Ref } from 'react';
import type { LinkComponent, LinkComponentProps } from '@tanstack/react-router';

import clsx from 'clsx';
import { createLink } from '@tanstack/react-router';
import { tw } from '@/utils/string';

interface BasicLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>;
}

const baseClassName = tw`cursor-pointer text-base font-bold text-gray-900 underline not-[[href]]:cursor-not-allowed not-[[href]]:text-gray-900/70 dark:text-gray-200 dark:not-[[href]]:text-gray-200/70 [[href]]:hover:font-black [[href]]:hover:decoration-2`;

const BasicLinkComponent = ({ className, ...props }: BasicLinkProps) => {
  const style = clsx(baseClassName, className);

  return <a className={style} {...props} />;
};

export type LinkProps = LinkComponentProps<typeof BasicLinkComponent>;

const CreatedLinkComponent = createLink(BasicLinkComponent);

const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

export default Link;
