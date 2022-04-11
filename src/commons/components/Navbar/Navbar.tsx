import React, { useCallback, useMemo } from 'react';
import { IoSettingsSharp, IoCreateOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { UserType } from '../../redux/reducers/types';
import { selectUser } from '../../redux/reducers/userReducer';
import NavItem from '../NavItem/NavItem';

const Nav = styled.nav`
  width: 75%;
  margin: 0 auto;
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
  align-items: center;
`;

const iconStyle = { width: '16px', height: '16px', marginRight: '2px' };

export default function Navbar() {
  const user: UserType | undefined = useSelector(selectUser);
  const location = useLocation();
  const isActive = useCallback(
    (val: string) => location.pathname === val,
    [location.pathname],
  );

  const noUserItems = useMemo(
    () => [
      { url: '/', text: 'Home' },
      { url: '/login', text: 'Sign in' },
      { url: '/register', text: 'Sign up' },
    ],
    [],
  );

  const items = useMemo(() => {
    if (user) {
      const { username, image } = user;

      return [
        { url: '/', text: 'Home' },
        {
          url: '/editor',
          text: (
            <>
              <IoCreateOutline style={iconStyle} />
              New Article
            </>
          ),
        },
        {
          url: '/settings',
          text: (
            <>
              <IoSettingsSharp style={iconStyle} />
              Settings
            </>
          ),
        },
        {
          url: '/profile',
          text: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${image}`}
                alt="avatar"
                style={{ width: '26px', height: '26px', borderRadius: '50%' }}
              />
              &nbsp;
              {username}
            </div>
          ),
        },
      ];
    }

    return noUserItems;
  }, [user]);

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
    </Nav>
  );
}
