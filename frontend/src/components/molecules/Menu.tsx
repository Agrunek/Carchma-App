import type { ReactNode } from 'react';
import type { ButtonProps } from '@/components/atoms/Button';
import type { LinkProps } from '@/components/atoms/Link';

import { Menu as HeadlessMenu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Button from '@/components/atoms/Button';
import Link from '@/components/atoms/Link';

type Align = 'start' | 'end';
type Placement = 'top' | 'right' | 'bottom' | 'left';
type AnchorPosition = Placement | `${Placement} ${Align}`;

interface MenuItemPropsButton extends ButtonProps {
  componentType: 'button';
}

interface MenuItemPropsLink extends LinkProps {
  componentType: 'link';
}

type MenuItemProps = MenuItemPropsButton | MenuItemPropsLink;

interface MenuProps {
  anchor?: AnchorPosition;
  children?: ReactNode;
  items?: MenuItemProps[];
}

const Menu = ({ anchor, children, items = [] }: MenuProps) => {
  return (
    <HeadlessMenu>
      <MenuButton as={Button} className="data-active:scale-95 data-active:bg-gray-800! dark:data-active:bg-gray-300!">
        {children}
      </MenuButton>

      <MenuItems
        anchor={anchor}
        modal={false}
        transition
        className="z-50 flex min-w-(--button-width) flex-col gap-2 rounded-md border-2 border-white/70 bg-white/50 p-4 shadow-md transition duration-200 ease-out [--anchor-gap:1rem] [--anchor-padding:1rem] data-closed:scale-95 data-closed:opacity-0 dark:border-black/70 dark:bg-black/50"
      >
        {items.map((item, idx) => {
          switch (item.componentType) {
            case 'button':
              return (
                <MenuItem key={idx}>
                  <Button {...(({ componentType: _, ...props }) => props)(item)} />
                </MenuItem>
              );
            case 'link':
              return (
                <MenuItem key={idx}>
                  <Link {...(({ componentType: _, ...props }) => props)(item)} />
                </MenuItem>
              );
          }
        })}
      </MenuItems>
    </HeadlessMenu>
  );
};

export default Menu;
