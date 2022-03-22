import React from 'react';
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>conduit</h1>
      <p className={styles.content}>A place to share your knowledge.</p>
    </div>
  );
}
