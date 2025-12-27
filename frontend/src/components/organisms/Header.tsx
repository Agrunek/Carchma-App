import clsx from 'clsx';
import useViewportVisibility from '@/hooks/useViewportVisibility';
import { createPortal } from 'react-dom';
import { tw } from '@/utils/string';

interface HeaderProps {
  className?: string;
  offset?: number;
}

const baseClassName = tw`fixed top-0 left-0 w-full transition-all duration-300`;

const Header = ({ className, offset = 1 }: HeaderProps) => {
  const { elementRef, isVisible: isAtTheTop } = useViewportVisibility<HTMLDivElement>(true);

  const style = clsx(baseClassName, isAtTheTop ? 'h-32 bg-blue-300' : 'h-16 bg-red-500', className);

  return (
    <>
      {createPortal(
        <div className="invisible absolute top-0 left-0 w-full" ref={elementRef} style={{ height: offset }} />,
        document.getElementById('root')!,
      )}
      <div className={style}>HEADER</div>
    </>
  );
};

export default Header;
