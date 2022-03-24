import React from 'react';
import styles from './Article.module.css';

interface ArticleProps {
  article: any;
}

export default function Tag({ article }: ArticleProps) {
  return <p className={styles.article}>{JSON.stringify(article)}</p>;
}
