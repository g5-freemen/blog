import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectActivePill } from '../../redux/reducers/feedReducer';

interface TagStyledProps {
  active: boolean;
  outlined?: boolean;
}

const outlinedStyle = `
  border: 1px solid var(--сGrey);
  color: var(--сGrey);
  background: none;
`;

const TagContainer = styled.li<TagStyledProps>`
  margin: 0 3px 0.2rem 0;
  padding: 0.1rem 0.6rem;
  display: inline-block;
  white-space: nowrap;
  color: #fff;
  border-radius: 10rem;
  background-color: ${({ active }) => (active ? 'var(--сDGrey)' : 'var(--сGrey)')};
  ${({ outlined }) => outlined && outlinedStyle}
  font-size: 0.8rem;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  cursor: pointer;

  &:hover {
    ${({ outlined }) => !outlined && 'background-color: var(--сDGrey);'}
  }
`;

interface TagProps {
  name: string;
  outlined?: boolean;
  onClick?: () => void;
}

export default function Tag(props: TagProps) {
  const { name, outlined, onClick } = props;
  const activePill = useSelector(selectActivePill);
  const isActive = useCallback(
    (val: string) => `#${val}` === activePill,
    [activePill],
  );

  return (
    <TagContainer outlined={outlined} onClick={onClick} active={isActive(name)}>
      {name}
    </TagContainer>
  );
}

Tag.defaultProps = {
  outlined: false,
};
