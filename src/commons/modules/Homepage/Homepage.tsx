import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../components/Banner/Banner';
import Articles from '../../components/Articles/Articles';
import ArticlesLimiter from '../../components/ArticlesLimiter/ArticlesLimiter';
import Tags from '../../components/Tags/Tags';
import Loader from '../../components/Loader/Loader';
import { fetchArticles, fetchTags } from '../../utils/httpService';
import {
  selectArticles,
  selectLimit,
  selectLoading,
  selectTags,
  setArticles,
  setLoading,
  setTags,
} from '../../redux/rootReducer';
import styles from './Homepage.module.css';

export default function Homepage() {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const articles = useSelector(selectArticles);
  const limit = useSelector(selectLimit);
  const loading = useSelector(selectLoading);

  const getArticles = useCallback(async () => {
    const articlesList = await fetchArticles(limit);
    dispatch(setArticles(articlesList));
  }, [limit]);

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
  }, [limit]);

  const show = (value: string) => {
    if (loading) {
      return <Loader content={`Loading ${value}...`} />;
    }

    if (value === 'articles' && articles) {
      if (typeof articles !== 'string') {
        return <Articles articlesList={articles} />;
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
      <div className={styles.row}>
        <main className={styles.main}>
          <ArticlesLimiter limits={[5, 10, 20, 50, 100]} />
          {show('articles')}
        </main>
        <aside className={styles.aside}>{show('tags')}</aside>
      </div>
    </div>
  );
}
