import React from 'react';
import styled from 'styled-components';

interface IFavoriteBtnContainer {
  fav: boolean;
}

const FavoriteBtnContainer = styled.button<IFavoriteBtnContainer>`
  display: inline-block;
  line-height: 1.25;
  font-size: 0.875rem;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  color: ${({ fav }) => (fav ? '#fff' : '#5cb85c')};
  background-color: ${({ fav }) => (fav ? '#5cb85c' : 'transparent')};
  background-image: none;
  border-color: #5cb85c;
`;

interface IFavoriteBtn {
  counter: number;
  favorited: boolean;
  onPress: () => void;
}

export default function FavoriteBtn(props: IFavoriteBtn) {
  const { counter, favorited, onPress } = props;

  return (
    <FavoriteBtnContainer
      type="button"
      fav={favorited}
      onClick={onPress}
      onKeyPress={onPress}
    >
      {`❤ ${counter}`}
    </FavoriteBtnContainer>
  );
}
