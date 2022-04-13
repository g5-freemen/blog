import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import Banner from '../../components/Banner/Banner';
import Articles from '../../components/Articles/Articles';
import ArticlesLimiter from '../../components/ArticlesLimiter/ArticlesLimiter';
import Tags from '../../components/Tags/Tags';
import Loader from '../../components/Loader/Loader';
import { ArticleType } from '../../components/Article/Article';
import {
  selectActivePill,
  selectArticles,
  selectTags,
  setArticles,
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
import styles from './Homepage.module.css';
import Navpills from '../../components/Navpills/Navpills';
import { selectUser } from '../../redux/reducers/userReducer';

export default function Homepage() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const activePill = useSelector(selectActivePill);
  const user = useSelector(selectUser);
  const tags: string[] = useSelector(selectTags);
  const articles: ArticleType[] = useSelector(selectArticles);
  const limit = useSelector(selectLimit);
  const loading = useSelector(selectLoading);

  const getArticles = useCallback(async () => {
    const token = cookies.get('token');
    let articlesList;
    if (activePill === 'user' && user) {
      const str = `&author=${user.username}`;
      articlesList = await fetchArticles(limit, token, str);
    } else if (activePill && activePill.includes('#')) {
      const str = `&tag=${activePill.slice(1)}`;
      articlesList = await fetchArticles(limit, token, str);
    } else {
      articlesList = await fetchArticles(limit, token, undefined);
    }
    dispatch(setArticles(articlesList));
  }, [limit, activePill]);

  const getTags = useCallback(async () => {
    const tagsList = await fetchTags();
    dispatch(setTags(tagsList));
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getArticles()
      .then(() => getTags())
      .then(() => dispatch(setLoading(false)));
  }, []);

  useEffect(() => {
    getArticles();
  }, [limit, activePill]);

  const show = (value: string) => {
    if (loading) {
      return <Loader content={`Loading ${value}...`} />;
    }

    if (value === 'articles' && articles) {
      if (typeof articles !== 'string') {
        if (articles.length > 0) {
          return <Articles articlesList={articles} />;
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
            <ArticlesLimiter limits={[5, 10, 20, 50, 100]} />
          </div>
          {show('articles')}
        </main>
        <aside className={styles.aside}>{show('tags')}</aside>
      </div>
    </div>
  );
}
