import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import styled from 'styled-components';

interface LinkProps {
  active: boolean;
}

const Link = styled.a<LinkProps>`
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.5;
  text-decoration: none;
  color: ${({ active }) => (active ? '#373a3c' : 'rgba(0, 0, 0, 0.3)')};

  &:hover {
    text-decoration: underline;
  }
`;

const Nav = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #373a3c;
  background-color: #fff;
`;

const path = window.location.pathname;

export default function Navbar() {
  // const location = useLocation();

  // const isActive = (val: string) => path.includes(val);

  return (
    <Nav>
      <div className={styles.container}>
        <a className={styles.brand} href="#/">
          conduit
        </a>

        <ul className={styles.nav}>
          <li className={styles.navitem}>
            <Link active={path === '/'} href="#/">
              Home
            </Link>
          </li>

          <li className={styles.navitem}>
            <Link active={path.includes('login')} href="#/login">
              Sign in
            </Link>
          </li>

          <li className={styles.navitem}>
            <Link active={path.includes('register')} href="#/register">
              Sign up
            </Link>
          </li>
        </ul>

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
      </div>
    </Nav>
  );
}
