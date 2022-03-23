import React from 'react';
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

const Link = styled.a<LinkProps>`
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

export default function NavItem({ active, url, text }: NavItemProps) {
  return (
    <Li>
      <Link active={active} href={url}>
        {text}
      </Link>
    </Li>
  );
}
