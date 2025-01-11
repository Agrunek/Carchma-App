import clsx from 'clsx';
import { tw } from '@/utils/string';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const baseClassName = tw`rounded-md border border-emerald-700 bg-gray-100 p-6 shadow-md`;

const Card = ({ children, className }: CardProps) => {
  const style = clsx(baseClassName, className);

  return <div className={style}>{children}</div>;
};

export default Card;
