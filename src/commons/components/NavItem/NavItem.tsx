import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface LinkProps {
  active: boolean;
}

const Li = styled.li`
  margin-right: 1rem;

  &:last-child {
    margin: 0;
  }
`;

const TextWrapper = styled.span<LinkProps>`
  display: flex;
  align-items: center;
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.5;
  text-decoration: none;
  color: ${({ active }) => (active ? '#373a3c' : 'rgba(0, 0, 0, 0.3)')};

  &:hover {
    text-decoration: underline;
  }
`;

interface NavItemProps {
  active: boolean;
  url: string;
  text: React.ReactNode;
}

export default function NavItem(props: NavItemProps) {
  const { active, url, text } = props;

  return (
    <Li>
      <Link to={{ pathname: url }} style={{ textDecoration: 0 }}>
        <TextWrapper active={active}>{text}</TextWrapper>
      </Link>
    </Li>
  );
}
