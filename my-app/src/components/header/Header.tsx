import Authentication from './auth/Authentication';
import Navigation from './navigation/Navigation';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <Logo />

      <Navigation />

      <Authentication />
    </header>
  );
}