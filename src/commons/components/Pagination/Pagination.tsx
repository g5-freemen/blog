import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectArticlesCount, selectPage, setPage } from '../../redux/reducers/feedReducer';
import { selectLimit } from '../../redux/reducers/globalReducer';

interface IPages {
  page: number;
}

const activePage = (page: number) => `
& button:nth-child(${page}) {
  font-weight: 700;
  background-color: var(--cGreen);
  border-bottom: 1px solid var(--cGreen);
  cursor: auto;
}
`;

const Pages = styled.div<IPages>`
  margin: 1rem auto;
  width: fit-content;
  display: flex;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  border-radius: 4px;
  color: var(--cDBlue);
  overflow: hidden;

  & button {
    font-size: 1.5rem;
    height: 100%;
    padding: 5px 10px;
    border: none;
    border-right: rgba(0, 0, 0, 0.2) solid 1px;
  }

  & button:last-child {
    border-right: none;
  }

  & button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${({ page }) => activePage(page)}
`;

export default function Pagination() {
  const dispatch = useDispatch();
  const articlesCount = useSelector(selectArticlesCount);
  const limit = useSelector(selectLimit);
  const pagesNum = Math.ceil(articlesCount / limit);
  const currentPage = useSelector(selectPage);
  const pages = Array(pagesNum)
    .fill(0)
    .map((_, i) => i + 1);

  return articlesCount ? (
    <Pages page={currentPage}>
      {pages.map((el) => (
        <button
          key={`page-${el}`}
          type="button"
          onClick={() => dispatch(setPage(el))}
          onKeyDown={() => dispatch(setPage(el))}
        >
          {el}
        </button>
      ))}
    </Pages>
  ) : null;
}
