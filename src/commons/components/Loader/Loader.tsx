import React from 'react';
import styled from 'styled-components';

interface ILoader {
  content?: string;
}

const LoaderContainer = styled.span`
  font-size: 18px;
  font-style: italic;
  color: gray;
`;

export default function Loader({ content = 'Loading...' }: ILoader) {
  return <LoaderContainer>{content}</LoaderContainer>;
}
