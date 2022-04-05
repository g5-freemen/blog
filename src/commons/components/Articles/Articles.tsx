import React from 'react';
import { v4 as uuid } from 'uuid';
import Article, { ArticleType } from '../Article/Article';

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
