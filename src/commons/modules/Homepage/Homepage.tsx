import React, { useCallback, useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Tags from '../../components/Tags/Tags';
import { fetchTags } from '../../components/Tags/fetchTags';
import styles from './Homepage.module.css';

export default function Homepage() {
  const [tags, setTags] = useState<string[] | null>([]);

  const getTags = useCallback(async () => {
    const tagsList = await fetchTags();
    setTags(tagsList);
  }, []);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <Banner />
      <div className={styles.row}>
        <main className={styles.main}>0</main>
        <aside className={styles.aside}>
          {tags ? <Tags tagsList={tags} /> : 'Error'}
        </aside>
      </div>
    </div>
  );
}
