import React from 'react';
import styled from 'styled-components';

interface IFavoriteBtnContainer {
  followed: boolean;
}

const FollowBtnContainer = styled.button<IFavoriteBtnContainer>`
  padding: 0.5rem 1rem;
  display: inline-block;
  line-height: 1.25;
  font-size: 0.875rem;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;

  color: ${({ followed }) => (!followed ? '#ccc' : '#373a3c')};
  background-color: ${({ followed }) => (!followed ? 'transparent' : '#e6e6e6')};
  transition: all 0.1s;

  &:hover {
    color: #373a3c;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
`;

interface IFavoriteBtn {
  followed?: boolean;
  text?: string;
  onPress: () => void;
}

export default function FollowBtn(props: IFavoriteBtn) {
  const { followed = false, text = '', onPress } = props;

  return (
    <FollowBtnContainer type="button" followed={followed} onClick={onPress} onKeyDown={onPress}>
      {`${followed ? '➖ Unfollow' : '➕ Follow'} ${text}`}
    </FollowBtnContainer>
  );
}
