import styled from 'styled-components';

interface IButton {
  red?: boolean;
  grey?: boolean;
  small?: boolean;
}

const redStyle = `
border-color: #B85C5C;
color: #B85C5C;
background-color: #fff;

&:hover,
&:focus {
  background-color:  #B85C5C;
  border-color: #B85C5C;
  color: #fff;
}
`;

const greyStyle = `
color: #999;
border: 1px solid #999;
background-color: transparent;

&:hover,
&:focus {
  background-color: #ccc;
  color: #999;
  border: 1px solid #999;
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
  background-color: #5cb85c;
  border: 1px solid transparent;
  border-color: #5cb85c;
  border-radius: 0.3rem;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
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
