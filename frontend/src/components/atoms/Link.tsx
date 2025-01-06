import type { LinkProps as RouterLinkProps } from '@tanstack/react-router';

import { Link as RouterLink } from '@tanstack/react-router';

const Link = ({ ...props }: RouterLinkProps) => {
  return <RouterLink {...props} />;
};

export default Link;
