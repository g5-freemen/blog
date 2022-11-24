import React from 'react';
import styled from 'styled-components';
import { ArticleType } from '../Article/types';
import styles from './Author.module.css';

interface Props {
  article?: ArticleType | null;
}

interface AvatarProps {
  url: string;
}

const Avatar = styled.div<AvatarProps>`
  margin-right: 4px;
  width: 32px;
  height: 32px;
  background: url(${({ url }) => url}) no-repeat center;
  background-size: contain;
  border-radius: 50%;
`;

export default function Author(props: Props) {
  const { article } = props;

  if (!article) return null;

  return (
    <div className={styles.info}>
      <Avatar url={article.author.image} />
      <div>
        <div className={styles.author}>{article.author.username}</div>
        <div className={styles.date}>
          {new Date(article.createdAt).toLocaleDateString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
