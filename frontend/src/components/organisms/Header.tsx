import type { ClassNameDictionary } from '@/types/utils';

import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useRouteContext } from '@tanstack/react-router';
import useViewportVisibility from '@/hooks/useViewportVisibility';
import ThemeToggle from '@/components/molecules/ThemeToggle';
import Link from '@/components/atoms/Link';
import Text from '@/components/atoms/Text';
import { tw } from '@/utils/string';

type HeaderVariant = 'expanded' | 'collapsed';

const baseClassName = tw`fixed top-0 left-0 z-40 flex w-full items-center gap-4 p-4 transition-all duration-500`;

const variantClassNames: ClassNameDictionary<HeaderVariant> = {
  expanded: tw`h-24 bg-white/10 dark:bg-black/10`,
  collapsed: tw`h-16 bg-white/50 backdrop-blur-md dark:bg-black/50`,
};

const titleVariantClassNames: ClassNameDictionary<HeaderVariant> = {
  expanded: tw`hidden text-center font-serif text-5xl sm:block`,
  collapsed: tw`text-left`,
};

const Header = () => {
  const { elementRef, isVisible: isAtTheTop } = useViewportVisibility<HTMLDivElement>(true);

  const { auth } = useRouteContext({ from: '__root__' });

  const style = clsx(baseClassName, variantClassNames[isAtTheTop ? 'expanded' : 'collapsed']);
  const titleStyle = clsx(titleVariantClassNames[isAtTheTop ? 'expanded' : 'collapsed']);

  return (
    <>
      {createPortal(
        <div className="invisible absolute top-0 left-0 h-20 w-full" ref={elementRef} />,
        document.getElementById('root')!,
      )}

      <div className={style}>
        {isAtTheTop && (
          <div className="flex flex-1">
            <ThemeToggle />
          </div>
        )}

        <Text as="h1" variant="heading" className={titleStyle}>
          CARchma
        </Text>

        <div className="flex flex-1 justify-end">
          {auth.isAuthenticated ? (
            <Link to="/auth/logout">Wyloguj się</Link>
          ) : (
            <Link to="/auth/login">Zaloguj się</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
