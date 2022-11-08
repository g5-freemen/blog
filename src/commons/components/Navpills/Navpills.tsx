import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  selectActivePill,
  selectArticlesCount,
  setActivePill,
} from '../../redux/reducers/feedReducer';
import { selectUser } from '../../redux/reducers/userReducer';

interface ILi {
  count: number;
  active?: boolean;
}

const NavpillsContainer = styled.ul`
  width: 100%;
  display: flex;
`;

const Li = styled.li<ILi>`
  padding: 0.5em 1em;
  cursor: pointer;
  border-bottom: 2px solid ${({ active }) => (active ? 'var(--cGreen)' : 'transparent')};
  color: ${({ active }) => (active ? 'var(--cGreen)' : 'var(--сGrey)')};

  &::after {
    content: ' ${({ count, active }) => active && count > 0 && count}';
    font-size: 12px;
    vertical-align: super;
  }
`;

const possibleValues = ['Your', 'Global', 'My', 'Favorited', '#'];

export default function Navpills(props: { isLoading: boolean }) {
  const { isLoading } = props;
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const activePill = useSelector(selectActivePill);
  const counter = useSelector(selectArticlesCount);
  const count = isLoading ? 0 : counter;
  const isActive = useCallback((val: string) => activePill === val, [activePill]);

  useEffect(() => {
    dispatch(setActivePill(pathname === '/' ? 'Global' : 'My'));
  }, [pathname]);

  const clickPill = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { innerText } = event.target as HTMLElement;
      possibleValues.forEach((str) => {
        if (innerText.includes(str)) {
          dispatch(setActivePill(str === '#' ? innerText : str));
        }
      });
    },
    [dispatch],
  );

  return pathname === '/' ? (
    <NavpillsContainer onClick={clickPill}>
      {user && (
        <Li active={isActive('Your')} count={count}>
          Your Feed
        </Li>
      )}
      <Li active={isActive('Global')} count={count}>
        Global Feed
      </Li>
      {activePill && activePill.includes('#') && (
        <Li active={isActive(activePill)} count={count}>
          {activePill}
        </Li>
      )}
    </NavpillsContainer>
  ) : (
    <NavpillsContainer onClick={clickPill}>
      <Li active={isActive('My')} count={count}>
        My Articles
      </Li>
      <Li active={isActive('Favorited')} count={count}>
        Favorited Articles
      </Li>
    </NavpillsContainer>
  );
}
