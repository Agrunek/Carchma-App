import { useNavigate, useRouteContext } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Button from '@/components/atoms/Button';
import Link from '@/components/atoms/Link';
import UserIcon from '@/components/atoms/UserIcon';
import Snackbar from '@/components/molecules/Snackbar';
import { logout } from '@/middleware/api';
import { AUTH_KEY } from '@/hooks/useAuth';

const AuthMenu = () => {
  const { queryClient, auth } = useRouteContext({ from: '__root__' });
  const navigate = useNavigate();

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await navigate({ to: '/' });
      await queryClient.invalidateQueries({ queryKey: [AUTH_KEY], exact: true });
    },
  });

  if (!auth.isAuthenticated) {
    return (
      <Link to="/login" className="text-gray-100 hover:text-gray-200 active:text-gray-50">
        Zaloguj się
      </Link>
    );
  }

  return (
    <Menu>
      <MenuButton
        disabled={isPending || isSuccess}
        className="inline-flex items-center justify-center gap-2 font-semibold text-gray-100 hover:text-gray-200 active:text-gray-50"
      >
        {auth.user.name}
        <UserIcon className="size-10" />
      </MenuButton>
      <MenuItems
        anchor={{ to: 'bottom end', gap: '1rem' }}
        transition
        className="flex flex-col rounded-md border-2 border-emerald-700 bg-gray-100 p-2 shadow-md shadow-emerald-700/50 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <MenuItem>
          <Link
            to="/me"
            disabled={isPending || isSuccess}
            className="w-full rounded-md py-2 text-center hover:bg-gray-200"
          >
            Mój profil
          </Link>
        </MenuItem>
        <MenuItem>
          <Button
            variant="tertiary"
            disabled={isPending || isSuccess}
            className="rounded-md hover:bg-gray-200"
            onClick={() => mutate()}
          >
            Wyloguj się
          </Button>
        </MenuItem>
      </MenuItems>
      <Snackbar message="Wystąpił niespodziewany błąd" open={isError} onClose={reset} variant="error" />
    </Menu>
  );
};

export default AuthMenu;
