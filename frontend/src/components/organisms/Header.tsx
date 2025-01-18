import AuthMenu from '@/components/molecules/AuthMenu';

const Header = () => {
  return (
    <div className="fixed top-0 flex h-16 w-full flex-row-reverse items-center bg-gradient-to-tr from-cyan-950 via-teal-950 to-emerald-950 px-6 shadow-md shadow-teal-950/50">
      <AuthMenu />
    </div>
  );
};

export default Header;
