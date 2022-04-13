import styled from 'styled-components';

interface ITextArea {
  small?: boolean;
}

export const TextArea = styled.textarea<ITextArea>`
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
  resize: vertical;
  cursor: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;

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
