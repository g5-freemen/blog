import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavItem from '../NavItem/NavItem';
import { v4 as uuid } from 'uuid';

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

const items = [
  { url: '#/', text: 'Home' },
  { url: '#/login', text: 'Sign in' },
  { url: '#/register', text: 'Sign up' },
];

export default function Navbar() {
  const location = useLocation();
  const isActive = useCallback(
    (val: string) => location.hash === val,
    [location.hash],
  );

  return (
    <Nav>
      <Brand href="#/">conduit</Brand>
      <Ul>
        {items.map((el) => (
          <NavItem
            key={uuid()}
            active={isActive(el.url)}
            url={el.url}
            text={el.text}
          />
        ))}
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
