import clsx from 'clsx';
import { tw } from '@/utils/string';

interface ErrorMessageProps {
  children?: React.ReactNode;
  className?: string;
  error?: boolean;
}

const baseClassName = tw`min-h-6 w-full text-center text-red-600`;

const ErrorMessage = ({ children, className, error }: ErrorMessageProps) => {
  const style = clsx(baseClassName, className);

  return <p className={style}>{error && children}</p>;
};

export default ErrorMessage;
