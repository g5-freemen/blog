import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  selectLoading,
  setLoading,
} from '../../redux/reducers/globalReducer';
import {
  fetchArticles,
  fetchTags,
} from '../../utils/httpServices/feedServices';
import { selectUser } from '../../redux/reducers/userReducer';
import styles from './Homepage.module.css';
import Pagination from '../../components/Pagination/Pagination';

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
  const loading: boolean = useSelector(selectLoading);

  const getArticles = useCallback(async () => {
    dispatch(setArticlesCount(0));
    let str = `&offset=${(currentPage - 1) * limit}`;
    if (activePill === 'Your' && user) {
      str += `&author=${user.username}`;
    } else if (activePill && activePill.includes('#')) {
      str += `&tag=${activePill.slice(1)}`;
    }
    const articlesList = await fetchArticles(limit, token, str);
    if (typeof articlesList === 'string') {
      dispatch(setArticles(articlesList));
    } else {
      dispatch(setArticles(articlesList.articles));
      dispatch(setArticlesCount(articlesList.articlesCount));
    }
  }, [limit, activePill, currentPage]);

  const getTags = useCallback(async () => {
    const tagsList = await fetchTags(token);
    dispatch(setTags(tagsList));
  }, []);

  useEffect(() => {
    dispatch(setPage(1));
  }, [activePill]);

  useEffect(() => {
    dispatch(setLoading(true));
    getTags().then(() => dispatch(setLoading(false)));
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getArticles().then(() => dispatch(setLoading(false)));
  }, [limit, activePill, currentPage]);

  const show = (value: string) => {
    if (loading) {
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
            <ArticlesLimiter limits={[5, 10, 20, 50, 100]} defaultValue={20} />
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
