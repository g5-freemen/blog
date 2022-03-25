import React from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import Tag from '../Tag/Tag';
import styles from './Article.module.css';

export type ArticleType = {
  author: {
    bio: null | string;
    following: boolean;
    image: string;
    username: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

interface ArticleProps {
  article: ArticleType;
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

export default function Article({ article }: ArticleProps) {
  return (
    <article className={styles.article}>
      <div className={styles.meta}>
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
        <button className={styles.favoriteBtn}>
          ❤ {article.favoritesCount}
        </button>
      </div>
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.row}>
        <span className={styles.span}>Read more...</span>
        <span>
          {article.tagList.map((name) => (
            <Tag key={uuid()} name={name} outlined={true} />
          ))}
        </span>
      </div>
    </article>
  );
}
