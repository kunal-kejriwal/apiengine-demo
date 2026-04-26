import { Outlet, useNavigate } from 'react-router-dom';
import { AppNavbar } from '@apiengine/react-sdk';

export default function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <AppNavbar
        navItems={[
          { label: 'Home',    href: '/' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'About',   href: '/about' },
        ]}
        onNavigate={navigate}
      />
      <Outlet />
    </>
  );
}