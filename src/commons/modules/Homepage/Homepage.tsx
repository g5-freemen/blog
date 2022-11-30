import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { Cookies } from 'react-cookie';
import Banner from '../../components/Banner/Banner';
import Articles from '../../components/Articles/Articles';
import ArticlesLimiter from '../../components/ArticlesLimiter/ArticlesLimiter';
import Navpills from '../../components/Navpills/Navpills';
import Tags from '../../components/Tags/Tags';
import Loader from '../../components/Loader/Loader';
import {
  selectActivePill,
  selectArticles,
  selectArticlesCount,
  selectPage,
  selectTags,
  setArticles,
  setArticlesCount,
  setPage,
  setTags,
} from '../../redux/reducers/feedReducer';
import { selectLimit, setLimit } from '../../redux/reducers/globalReducer';
import { fetchArticles, fetchTags } from '../../utils/httpServices/feedServices';
import { selectUser } from '../../redux/reducers/userReducer';
import Pagination from '../../components/Pagination/Pagination';
import { DEFAULT_ARTICLES_LIMIT as defaultLimit, limits, options } from '../../utils/constants';
import { ArticleType } from '../../utils/httpServices/types';
import styles from './Homepage.module.css';

export default function Homepage() {
  const cookies = new Cookies();
  const token: string = cookies.get('token');
  const dispatch = useDispatch();
  const activePill: string = useSelector(selectActivePill);
  const user = useSelector(selectUser);
  const tags: string[] = useSelector(selectTags);
  const articles: ArticleType[] = useSelector(selectArticles);
  const articlesCount: number = useSelector(selectArticlesCount);
  const limit: number = useSelector(selectLimit);
  const currentPage: number = useSelector(selectPage);
  const [searchStr, setSearchStr] = useState('');

  const { data: articlesData, isLoading: loadingArticles } = useQuery(
    `getArticles-${limit}-${searchStr}`,
    () => {
      if (!searchStr || !limit) return null;
      return fetchArticles(limit, token, searchStr);
    },
    options,
  );

  useEffect(() => {
    if (articlesData) {
      if (typeof articlesData === 'string') {
        dispatch(setArticles(articlesData));
        dispatch(setArticlesCount(0));
      } else {
        dispatch(setArticlesCount(articlesData.articlesCount));
        dispatch(setArticles(articlesData.articles));
      }
    }
  }, [articlesData]);

  const { isLoading: loadingTags } = useQuery(
    `getTags-${user?.username || ''}`,
    () => fetchTags(token),
    {
      onSuccess: (data) => dispatch(setTags(data)),
    },
  );

  useEffect(() => {
    if (limit && limit !== defaultLimit) {
      dispatch(setLimit(defaultLimit));
    }
  }, []);

  useEffect(() => {
    if (currentPage && currentPage !== 1) {
      dispatch(setPage(1));
    }
  }, [activePill, limit]);

  useEffect(() => {
    if (activePill) {
      let str = `&offset=${(currentPage - 1) * limit}`;
      if (activePill === 'Your' && user) {
        str += `&author=${user.username}`;
      } else if (activePill && activePill.includes('#')) {
        str += `&tag=${activePill.slice(1)}`;
      }
      setSearchStr(str);
    }
  }, [limit, activePill, currentPage]);

  const show = useCallback(
    (value: string) => {
      if ((value === 'articles' && loadingArticles) || (value === 'tags' && loadingTags)) {
        return <Loader content={`Loading ${value}...`} />;
      }

      if (value === 'articles' && articles) {
        if (typeof articles !== 'string') {
          if (articles.length > 0) {
            return (
              <>
                <Articles articlesList={articles} />
                {articlesCount > limit && <Pagination />}
              </>
            );
          }
          return <p className={styles.p}>No articles are here... yet.</p>;
        }
        return articles;
      }

      if (value === 'tags' && tags) {
        if (typeof tags !== 'string') {
          return <Tags tagsList={tags} />;
        }
        return tags;
      }

      return 'Error';
    },
    [tags, articles, articlesCount, limit, loadingTags, loadingArticles],
  );

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.rowContainer}>
        <main className={styles.main}>
          <div className={styles.row}>
            <Navpills isLoading={loadingArticles} />
            <ArticlesLimiter limits={limits} defaultValue={defaultLimit} />
          </div>
          {show('articles')}
        </main>
        <aside className={styles.aside} aria-label="tags list">
          {show('tags')}
        </aside>
      </div>
    </div>
  );
}
