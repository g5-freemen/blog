import React, { useCallback, useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Articles from '../../components/Articles/Articles';
import Tags from '../../components/Tags/Tags';
import { ArticleType } from '../../components/Article/Article';
import { fetchArticles } from '../../components/Articles/fetchArticles';
import { fetchTags } from '../../components/Tags/fetchTags';
import * as slice from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Homepage.module.css';

export default function Homepage() {
  const dispatch = useDispatch();
  const tags = useSelector(slice.selectTags);
  const articles = useSelector(slice.selectArticles);

  const getTags = useCallback(async () => {
    const tagsList = await fetchTags();
    dispatch(slice.setTags(tagsList));
  }, []);

  const getArticles = useCallback(async () => {
    const articlesList: ArticleType[] | null = await fetchArticles();
    dispatch(slice.setArticles(articlesList));
  }, []);

  useEffect(() => {
    getArticles();
    getTags();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <Banner />
      <div className={styles.row}>
        <main className={styles.main}>
          {articles ? <Articles articlesList={articles} /> : 'Error'}
        </main>
        <aside className={styles.aside}>
          {tags ? <Tags tagsList={tags} /> : 'Error'}
        </aside>
      </div>
    </div>
  );
}
