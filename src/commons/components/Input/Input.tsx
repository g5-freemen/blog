import styled from 'styled-components';

interface IInput {
  small?: boolean;
}

export const Input = styled.input<IInput>`
  padding: 0.75rem 1.5rem;
  width: 100%;
  font-size: ${({ small }) => (small ? '1rem' : '1.25rem')};
  line-height: 1.25;
  color: #55595c;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    border-color: #66afe9;
    outline: none;
  }

  &::placeholder {
    color: #99a3b0;
  }

  &:disabled {
    background-color: #eee;
  }
`;
