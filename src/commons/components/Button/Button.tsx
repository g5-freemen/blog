import styled from 'styled-components';

interface IButton {
  red?: boolean;
  grey?: boolean;
  small?: boolean;
}

const redStyle = `
border-color: var(--cRed);
color: var(--cRed);
background-color: #fff;

&:hover,
&:focus {
  background-color: var(--cRed);
  border-color: var(--cRed);
  color: #fff;
}
`;

const greyStyle = `
color: var(--сGrey);
border: 1px solid var(--сGrey);
background-color: transparent;

&:hover,
&:focus {
  background-color: #ccc;
  color: var(--сGrey);
  border: 1px solid var(--сGrey);
}
`;

export const Button = styled.button<IButton>`
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.25;
  font-size: ${({ small }) => (small ? '1rem' : '1.25rem')};
  color: #fff;
  background-color: var(--cGreen);
  border: 1px solid transparent;
  border-color: var(--cGreen);
  border-radius: 0.3rem;
  white-space: nowrap;
  transition: all 0.3s;

  &:hover,
  &:focus {
    background-color: #449d44;
    border-color: #419641;
  }

  &:disabled {
    background-color: #999;
    border-color: #999;
    color: #ddd;
    cursor: auto;
  }

  ${({ red }) => red && redStyle}
  ${({ grey }) => grey && greyStyle}
`;
