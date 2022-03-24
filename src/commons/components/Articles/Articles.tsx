import React from 'react';
import Article from '../Article/Article';
import { v4 as uuid } from 'uuid';
import styles from './Articles.module.css';

interface ArticlesProps {
  articlesList: any[];
}

export default function Articles({ articlesList }: ArticlesProps) {
  return (
    <div>
      {articlesList.map((el) => (
        <Article key={uuid()} article={el} />
      ))}
    </div>
  );
}
