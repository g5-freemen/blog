import React, { useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';
import { IoSettingsSharp, IoCreateOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { UserType } from '../../redux/reducers/types';
import NavItem from '../NavItem/NavItem';

const Nav = styled.nav`
  width: 75%;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: var(--cDBlue);
`;

const Brand = styled.a`
  margin-right: 2rem;
  padding: 0 0 0.25rem 0;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cGreen);
  text-decoration: none;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
`;

interface IImg {
  size: string;
}

export const Img = styled.img<IImg>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  margin-right: 4px;
`;

const iconStyle = { width: '16px', height: '16px', marginRight: '2px' };

const icon = (Component: IconType, txt: string) => (
  <>
    <Component style={iconStyle} />
    {txt}
  </>
);

interface NavbarProps {
  user: UserType | undefined;
}

export default function Navbar(props: NavbarProps) {
  const { user } = props;
  const { pathname } = useLocation();
  const isActive = useCallback((val: string) => pathname === val, [pathname]);

  const items = useMemo(() => {
    if (user) {
      return [
        { url: '/', text: 'Home' },
        {
          url: '/editor',
          text: icon(IoCreateOutline, 'New Article'),
        },
        {
          url: '/settings',
          text: icon(IoSettingsSharp, 'Settings'),
        },
        {
          url: `/@${user.username}`,
          text: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {user?.image && user.image.trim() && (
                <Img
                  src={`${user.image}`}
                  alt="avatar"
                  size="26px"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = './unknown_user.png';
                  }}
                />
              )}
              {user.username}
            </div>
          ),
        },
      ];
    }

    return [
      { url: '/', text: 'Home' },
      { url: '/login', text: 'Sign in' },
      { url: '/register', text: 'Sign up' },
    ];
  }, [user]);

  return (
    <Nav>
      <Brand href="#/">conduit</Brand>
      <Ul>
        {items.map(({ url, text }) => (
          <NavItem key={uuid()} active={isActive(url)} url={url} text={text} />
        ))}
      </Ul>
    </Nav>
  );
}
