import type { ReactNode } from 'react';
import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import Link from '@/components/atoms/Link';
import { tw } from '@/utils/string';

type SimpleFeedbackVariant = 'informative' | 'error';

interface GlobalFeedbackProps {
  children?: ReactNode;
  className?: string;
  variant?: SimpleFeedbackVariant;
}

const baseClassName = tw`flex flex-col items-center gap-4 rounded-md border-2 p-4`;

const variantClassNames: ClassNameDictionary<SimpleFeedbackVariant> = {
  informative: tw`border-white/70 bg-white/50 dark:border-black/70 dark:bg-black/50`,
  error: tw`border-rose-500/70 bg-rose-500/50`,
};

const SimpleFeedback = ({ children, className, variant = 'informative' }: GlobalFeedbackProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return (
    <div className={style}>
      {children}
      <Link to="/">Powrót do strony głównej</Link>
    </div>
  );
};

export default SimpleFeedback;
