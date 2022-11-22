import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconType } from 'react-icons';
import { IoSettingsSharp, IoCreateOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavItem from '../NavItem/NavItem';
import { selectUser } from '../../redux/reducers/userReducer';

const Nav = styled.nav`
  @media (max-width: 1200px) {
    max-width: 99vw;
  }

  @media (min-width: 1200px) {
    max-width: 75%;
  }

  min-width: 500px;
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
  transition: width 0.5s, height 0.5s;

  &:hover {
    width: ${({ size }) => `${+size.replace('px', '') * 1.5}px`};
    height: ${({ size }) => `${+size.replace('px', '') * 1.5}px`};
  }
`;

const iconStyle = { width: '16px', height: '16px', marginRight: '2px' };

const icon = (Component: IconType, txt: string) => (
  <>
    <Component style={iconStyle} />
    {txt}
  </>
);

export default function Navbar() {
  const user = useSelector(selectUser);
  const { pathname } = useLocation();
  const isActive = useCallback((val: string) => pathname === val, [pathname]);
  const [imageError, setImageError] = useState(false);

  const onErrorImage = useCallback(() => {
    if (!imageError) setImageError(true);
  }, [imageError]);

  useEffect(() => {
    if (imageError) setImageError(false);
  }, [user?.image]);

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
              {user?.image && user.image.trim() && !imageError && (
                <Img
                  src={`${user.image}`}
                  alt="avatar"
                  size="26px"
                  onError={onErrorImage}
                  onLoad={() => {
                    if (imageError) setImageError(false);
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
  }, [user, imageError]);

  return (
    <Nav>
      <Brand href="#/">conduit</Brand>
      <Ul>
        {items.map(({ url, text }) => (
          <NavItem key={useId()} active={isActive(url)} url={url} text={text} />
        ))}
      </Ul>
    </Nav>
  );
}
