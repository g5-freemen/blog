import React, { useCallback, useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Tags from '../../components/Tags/Tags';
import { fetchArticles } from '../../components/Articles/fetchArticles';
import { fetchTags } from '../../components/Tags/fetchTags';
import styles from './Homepage.module.css';
import Articles from '../../components/Articles/Articles';

export default function Homepage() {
  const [tags, setTags] = useState<string[] | null>([]);
  const [articles, setArticles] = useState<string[] | null>([]);

  const getTags = useCallback(async () => {
    const tagsList = await fetchTags();
    setTags(tagsList);
  }, []);

  const getArticles = useCallback(async () => {
    const articlesList = await fetchArticles();
    setArticles(articlesList);
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
