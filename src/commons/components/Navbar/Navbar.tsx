import React from 'react';
import styled from 'styled-components';

interface LinkProps {
  active: boolean;
}

const Nav = styled.nav`
  width: 75%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-family: 'Source Sans Pro', sans-serif;
  color: #373a3c;
`;

const Brand = styled.a`
  margin-right: 2rem;
  padding: 0 0 0.25rem 0;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: transparent;
  color: #5cb85c;
  text-decoration: none;
`;

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li`
  margin-right: 1rem;

  &:last-child {
    margin: 0;
  }
`;

const Link = styled.a<LinkProps>`
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.5;
  text-decoration: none;
  color: ${({ active }) => (active ? '#373a3c' : 'rgba(0, 0, 0, 0.3)')};

  &:hover {
    text-decoration: underline;
  }
`;

const path = window.location.pathname;

export default function Navbar() {
  // const location = useLocation();

  // const isActive = (val: string) => path.includes(val);

  return (
    <Nav>
      <Brand href="#/">conduit</Brand>
      <Ul>
        <Li>
          <Link active={path === '/'} href="#/">
            Home
          </Link>
        </Li>
        <Li>
          <Link active={path.includes('login')} href="#/login">
            Sign in
          </Link>
        </Li>
        <Li>
          <Link active={path.includes('register')} href="#/register">
            Sign up
          </Link>
        </Li>
      </Ul>

      {/* <ul show-authed="true" class="nav navbar-nav pull-xs-right" style="display: none;">

      <li class="nav-item">
        <a class="nav-link active" ui-sref-active="active" ui-sref="app.home" href="#/">
          Home
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" ui-sref-active="active" ui-sref="app.editor" href="#/editor/">
          <i class="ion-compose"></i>&nbsp;New Article
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" ui-sref-active="active" ui-sref="app.settings" href="#/settings">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link ng-binding" ui-sref-active="active"
         ui-sref="app.profile.main({ username: $ctrl.currentUser.username })" href="#/@">
          <img class="user-pic"/>
        </a>
      </li>

    </ul> */}
    </Nav>
  );
}
