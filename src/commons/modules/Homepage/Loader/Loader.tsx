import React from 'react';
import { LoaderSmall } from './LoaderSmall';
import styles from './Loader.module.css';

interface ILoader {
  type?: 'text' | 'small';
}

export default function Loader({ type = 'text' }: ILoader) {
  if (type === 'text') {
    return <div className={styles.text}>Loading...</div>;
  }

  if (type === 'small') {
    return <LoaderSmall />;
  }

  return null;
}
