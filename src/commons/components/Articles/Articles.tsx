import React from 'react';

import { ArticleType } from '../../utils/httpServices/types';
import Article from '../Article/Article';

interface ArticlesProps {
  articlesList: ArticleType[];
}

export default function Articles(props: ArticlesProps) {
  const { articlesList } = props;

  return (
    <div style={{ width: '100%' }}>
      {articlesList.map((article) => (
        <Article key={article.title + article.createdAt} article={article} />
      ))}
    </div>
  );
}
