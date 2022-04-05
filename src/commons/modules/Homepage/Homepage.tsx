import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArticleType } from '../../components/Article/Article';
import { fetchArticles } from '../../components/Articles/fetchArticles';
import { fetchTags } from '../../components/Tags/fetchTags';
import Banner from '../../components/Banner/Banner';
import Articles from '../../components/Articles/Articles';
import Tags from '../../components/Tags/Tags';
import Loader from '../../components/Loader/Loader';
import {
  selectArticles,
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
  const loading = useSelector(selectLoading);

  const getArticles = useCallback(async () => {
    const articlesList: ArticleType[] | null = await fetchArticles();
    dispatch(setArticles(articlesList));
  }, []);

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

  const show = (value: string) => {
    if (loading) {
      return <Loader content={`Loading ${value}...`} />;
    }

    if (value === 'articles' && articles) {
      return <Articles articlesList={articles} />;
    }

    if (value === 'tags' && tags) {
      return <Tags tagsList={tags} />;
    }

    return 'Error';
  };

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.row}>
        <main className={styles.main}>{show('articles')}</main>
        <aside className={styles.aside}>{show('tags')}</aside>
      </div>
    </div>
  );
}
