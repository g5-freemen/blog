import React from 'react';
import uuid from 'react-uuid';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { selectPage, setArticles } from '../../redux/reducers/feedReducer';
import { selectLimit } from '../../redux/reducers/globalReducer';
import { TOAST_TIMEOUT } from '../../utils/constants';
import { favorite, fetchArticles } from '../../utils/httpServices/feedServices';
import FavoriteBtn from '../FavoriteBtn/FavoriteBtn';
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

export default function Article(props: ArticleProps) {
  const { article } = props;
  const cookies = new Cookies();
  const limit: number = useSelector(selectLimit);
  const currentPage: number = useSelector(selectPage);
  const dispatch = useDispatch();

  const pressFavorite = async () => {
    const token = cookies.get('token');
    if (!token) {
      toast("You're not logged in!", {
        type: 'warning',
        autoClose: TOAST_TIMEOUT,
      });
      return false;
    }

    const { slug, favorited } = article;
    const str = `&offset=${(currentPage - 1) * limit}`;
    await favorite(slug, token, favorited)
      .then(() => fetchArticles(limit, token, str))
      .then((data) => {
        dispatch(setArticles(typeof data === 'string' ? data : data.articles));
      });
    return true;
  };

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
        <FavoriteBtn
          counter={article.favoritesCount}
          favorited={article.favorited}
          onPress={pressFavorite}
        />
      </div>
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.row}>
        <span className={styles.span}>Read more...</span>
        <ul>
          {article.tagList.map((name) => (
            <Tag key={uuid()} name={name} outlined />
          ))}
        </ul>
      </div>
    </article>
  );
}
