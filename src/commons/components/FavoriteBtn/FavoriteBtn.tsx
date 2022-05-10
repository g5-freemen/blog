import React from 'react';
import styled from 'styled-components';

interface IFavoriteBtnContainer {
  fav: boolean;
}

const FavoriteBtnContainer = styled.button<IFavoriteBtnContainer>`
  padding: 0.5rem 1rem;
  display: inline-block;
  line-height: 1.25;
  font-size: 0.875rem;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid var(--cGreen);
  border-radius: 0.25rem;
  font-size: 1rem;
  color: ${({ fav }) => (fav ? '#fff' : 'var(--cGreen)')};
  background-color: ${({ fav }) => (fav ? 'var(--cGreen)' : 'transparent')};
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
