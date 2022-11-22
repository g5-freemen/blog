import React, { useId } from 'react';
import Article, { ArticleType } from '../Article/Article';

interface ArticlesProps {
  articlesList: ArticleType[];
}

export default function Articles(props: ArticlesProps) {
  const { articlesList } = props;
  const id = useId();

  return (
    <div style={{ width: '100%' }}>
      {articlesList.map((article) => (
        <Article key={id} article={article} />
      ))}
    </div>
  );
}
