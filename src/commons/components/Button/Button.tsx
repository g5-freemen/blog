import styled from 'styled-components';

interface IButton {
  red?: boolean;
  small?: boolean;
}

export const Button = styled.button<IButton>`
  padding: 0.75rem 1.5rem;
  line-height: 1.25;
  font-size: ${({ small }) => (small ? '1rem' : '1.25rem')};
  color: ${({ red }) => (red ? '#B85C5C' : '#fff')};
  background-color: ${({ red }) => (red ? '#fff' : '#5cb85c')};
  border: 1px solid transparent;
  border-color: ${({ red }) => (red ? '#B85C5C' : '#5cb85c')};
  border-radius: 0.3rem;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;

  &:hover,
  &:focus {
    background-color: ${({ red }) => (red ? '#B85C5C' : '#449d44')};
    border-color: ${({ red }) => (red ? '#B85C5C' : '#419641')};
    ${({ red }) => red && 'color: #fff'};
  }

  &:disabled {
    background-color: #999;
    border-color: #999;
    color: #ddd;
    cursor: auto;
  }
`;
