import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectArticlesCount, selectPage, setPage } from '../../redux/reducers/feedReducer';
import { selectLimit } from '../../redux/reducers/globalReducer';

interface IButton {
  isActive?: boolean;
}

const Pages = styled.div`
  margin: 1rem auto;
  width: fit-content;
  display: flex;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  border-radius: 4px;
  color: var(--cDBlue);
`;

const Button = styled.button<IButton>`
  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }

   {
    padding: 5px;
    height: 100%;
    border: none;
    border-right: rgba(0, 0, 0, 0.2) solid 1px;
    transition: all 0.3s;
  }

  :last-child {
    border-right: none;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${({ isActive }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    isActive &&
    `
  {
    font-weight: 700;
    background-color: var(--cGreen);
    border-bottom: 1px solid var(--cGreen);
    cursor: auto;
  }

  :hover {
    background-color: var(--сGreenHover);
  }`}
`;

export default function Pagination() {
  const dispatch = useDispatch();
  const articlesCount = useSelector(selectArticlesCount);
  const limit = useSelector(selectLimit);
  const pagesNum = Math.ceil(articlesCount / limit);
  const lastPagesNum = pagesNum > 99 ? 4 : 5;
  const currentPage = useSelector(selectPage);
  // eslint-disable-next-line unicorn/new-for-builtins
  const pages = Array(pagesNum)
    .fill(0)
    .map((_, i) => i + 1);

  const button = useCallback(
    (el: number, isActive: boolean = false) => (
      <Button
        key={Date.now() + el}
        type="button"
        onClick={() => (el ? dispatch(setPage(el)) : {})}
        onKeyDown={() => (el ? dispatch(setPage(el)) : {})}
        isActive={isActive}
      >
        {el || '...'}
      </Button>
    ),
    [dispatch],
  );

  return articlesCount ? (
    <Pages>
      {pages.map((el, i, arr) => {
        const isActive = i + 1 === currentPage;
        if (pagesNum > 18) {
          if (currentPage < 4) {
            if (i > 4 && i < pagesNum - lastPagesNum) return null;
            if (i === 4) return button(0);
          } else if (currentPage > pagesNum - lastPagesNum) {
            if (i === 1) return button(0);
            if (i > 0 && i < pagesNum - (lastPagesNum + 1)) return null;
          } else {
            if (currentPage === i + 1) {
              return (
                <>
                  {button(0)}
                  {button(arr[i - 1], false)}
                  {button(el, isActive)}
                  {button(arr[i + 1], false)}
                  {button(0)}
                </>
              );
            }
            if (i !== 0 && i !== pagesNum - 1) return null;
          }
        }

        return button(el, isActive);
      })}
    </Pages>
  ) : null;
}
