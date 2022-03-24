import React from 'react';
import Article, { ArticleType } from '../Article/Article';
import { v4 as uuid } from 'uuid';

interface ArticlesProps {
  articlesList: ArticleType[];
}

export default function Articles({ articlesList }: ArticlesProps) {
  return (
    <div>
      {articlesList.map((article) => (
        <Article key={uuid()} article={article} />
      ))}
    </div>
  );
}
