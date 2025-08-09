import type { AnchorHTMLAttributes, Ref } from 'react';
import type { LinkComponent } from '@tanstack/react-router';
import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { createLink } from '@tanstack/react-router';
import { tw } from '@/utils/string';

type LinkVariant = 'primary' | 'secondary' | 'tertiary';

interface BasicLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>;
  variant?: LinkVariant;
}

const baseClassName = tw``;

const variantClassNames: ClassNameDictionary<LinkVariant> = {
  primary: tw``,
  secondary: tw``,
  tertiary: tw``,
};

const BasicLinkComponent = ({ className, variant = 'primary', ...props }: BasicLinkProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return <a className={style} {...props} />;
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

export default Link;
