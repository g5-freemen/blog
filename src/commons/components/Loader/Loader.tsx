import React from 'react';
import styles from './Loader.module.css';

interface ILoader {
  content?: React.ReactNode;
}

export default function Loader(props: ILoader) {
  const { content } = props;

  return <span className={styles.pouring}>{content}</span>;
}

Loader.defaultProps = {
  content: 'Loading...',
};
