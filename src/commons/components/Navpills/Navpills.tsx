import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectActivePill,
  setActivePill,
} from '../../redux/reducers/feedReducer';
import { selectUser } from '../../redux/reducers/userReducer';

interface ILi {
  active?: boolean;
}

const NavpillsContainer = styled.ul`
  width: 100%;
  display: flex;
`;

const Li = styled.li<ILi>`
  padding: 0.5em 1em;
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.5;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ active }) => (active ? '#5CB85C' : 'transparent')};
  color: ${({ active }) => (active ? '#5CB85C' : '#aaa')};
`;

export default function Navpills() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const activePill = useSelector(selectActivePill);
  const isActive = useCallback(
    (val: string | undefined) => activePill === val,
    [activePill],
  );

  const clickPill = (event: React.MouseEvent<HTMLElement>) => {
    const { innerText } = event.target as HTMLElement;
    if (innerText.includes('Your')) {
      dispatch(setActivePill('user'));
    }

    if (innerText.includes('Global')) {
      dispatch(setActivePill(undefined));
    }

    if (innerText.includes('#')) {
      dispatch(setActivePill(innerText));
    }
  };

  return (
    <NavpillsContainer onClick={clickPill}>
      {user && <Li active={isActive('user')}>Your Feed</Li>}
      <Li active={isActive(undefined)}>Global Feed</Li>
      {activePill && activePill.includes('#') && (
        <Li active={isActive(activePill)}>{activePill}</Li>
      )}
    </NavpillsContainer>
  );
}
