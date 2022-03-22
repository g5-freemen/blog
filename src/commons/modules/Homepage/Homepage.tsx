import React from 'react';
import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Homepage.module.css';

export default function Homepage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Banner />
      <div className={styles.row}>
        <main className={styles.main}>0</main>
        <aside className={styles.aside}>1</aside>
      </div>
    </div>
  );
}
