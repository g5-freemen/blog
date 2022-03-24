import React from 'react';
import styled from 'styled-components';

interface TagStyledProps {
  outlined?: boolean;
}

const TagContainer = styled.div<TagStyledProps>`
  margin: 0 3px 0.2rem 0;
  padding: 0.1rem 0.6rem;
  display: inline-block;
  white-space: nowrap;
  color: #fff;
  border-radius: 10rem;
  background-color: rgb(129, 138, 145);
  ${({ outlined }) =>
    outlined &&
    `border: 1px solid #ddd;
    color: #aaa;
    background: none;
  `}
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    ${({ outlined }) => !outlined && `background-color: #666;`}
  }
`;

interface TagProps {
  name: string;
  outlined?: boolean;
}

export default function Tag({ name, outlined = false }: TagProps) {
  return <TagContainer outlined={outlined}>{name}</TagContainer>;
}
