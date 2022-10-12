import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { Cookies } from 'react-cookie';
import Banner from '../../components/Banner/Banner';
import Articles from '../../components/Articles/Articles';
import ArticlesLimiter from '../../components/ArticlesLimiter/ArticlesLimiter';
import Navpills from '../../components/Navpills/Navpills';
import Tags from '../../components/Tags/Tags';
import Loader from '../../components/Loader/Loader';
import { ArticleType } from '../../components/Article/Article';
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
import {
  selectLimit,
  selectLoadingArticles,
  setLimit,
  setLoadingArticles,
} from '../../redux/reducers/globalReducer';
import { fetchArticles, fetchTags } from '../../utils/httpServices/feedServices';
import { selectUser } from '../../redux/reducers/userReducer';
import Pagination from '../../components/Pagination/Pagination';
import { DEFAULT_ARTICLES_LIMIT as defaultLimit } from '../../utils/constants';
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
  const loadingArticles: boolean = useSelector(selectLoadingArticles);

  const getArticles = useCallback(async () => {
    let str = `&offset=${(currentPage - 1) * limit}`;
    if (activePill === 'Your' && user) {
      str += `&author=${user.username}`;
    } else if (activePill && activePill.includes('#')) {
      str += `&tag=${activePill.slice(1)}`;
    }
    const articlesList = await fetchArticles(limit, token, str);
    if (typeof articlesList === 'string') {
      dispatch(setArticles(articlesList));
      dispatch(setArticlesCount(0));
    } else {
      dispatch(setArticlesCount(articlesList.articlesCount));
      dispatch(setArticles(articlesList.articles));
    }
  }, [limit, activePill, currentPage, user, token]);

  const { isLoading: loadingTags } = useQuery(
    'getTags',
    async () => {
      const res = await fetchTags(token);
      return res;
    },
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
      dispatch(setLoadingArticles(true));
      getArticles();
    }
  }, [limit, activePill, currentPage]);

  const show = (value: string) => {
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
  };

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.rowContainer}>
        <main className={styles.main}>
          <div className={styles.row}>
            <Navpills />
            <ArticlesLimiter limits={[5, 10, 20, 50, 100]} defaultValue={defaultLimit} />
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
