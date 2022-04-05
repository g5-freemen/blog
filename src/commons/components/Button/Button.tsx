import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  line-height: 1.25;
  font-size: 1.25rem;
  color: #fff;
  background-color: #5cb85c;
  border: 1px solid transparent;
  border-color: #5cb85c;
  border-radius: 0.3rem;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #449d44;
    border-color: #419641;
  }
`;
