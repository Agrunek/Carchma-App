import clsx from 'clsx';
import { tw } from '@/utils/string';

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
}

const baseClassName = tw`flex flex-col gap-4`;

const Section = ({ className, title, children }: SectionProps) => {
  const style = clsx(baseClassName, className);

  return (
    <div className={style}>
      <p className="text-2xl font-semibold">{title}</p>
      {children}
    </div>
  );
};

export default Section;
