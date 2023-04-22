import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { StyledNavLink, Header } from './Layout.styled';

const Layout = () => {
  return (
    <>
      <Header>
        <nav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="movies">Movies</StyledNavLink>
        </nav>{' '}
      </Header>
      <main>
        <Suspense fallback={<div>Loading</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
