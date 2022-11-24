import React from 'react';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectPage, setArticles } from '../../redux/reducers/feedReducer';
import { selectLimit } from '../../redux/reducers/globalReducer';
import { TOAST_TIMEOUT } from '../../utils/constants';
import { favorite, fetchArticles } from '../../utils/httpServices/feedServices';
import FavoriteBtn from '../FavoriteBtn/FavoriteBtn';
import Tag from '../Tag/Tag';
import styles from './Article.module.css';
import Author from '../Author/Author';
import { ArticleProps } from './types';

export default function Article(props: ArticleProps) {
  const { article } = props;
  const { slug, favorited } = article;
  const cookies = new Cookies();
  const limit: number = useSelector(selectLimit);
  const currentPage: number = useSelector(selectPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pressFavorite = async () => {
    const token = cookies.get('token');
    if (!token) {
      toast("You're not logged in!", {
        type: 'warning',
        autoClose: TOAST_TIMEOUT,
      });
      return false;
    }

    const str = `&offset=${(currentPage - 1) * limit}`;
    await favorite(slug, token, favorited)
      .then(() => fetchArticles(limit, token, str))
      .then((data) => {
        dispatch(setArticles(typeof data === 'string' ? data : data.articles));
      });
    return true;
  };

  const navigateToArticle = () => navigate(`article/${slug}`);

  return (
    <article className={styles.article}>
      <div className={styles.meta}>
        <Author article={article} />
        <FavoriteBtn
          counter={article.favoritesCount}
          favorited={article.favorited}
          onPress={pressFavorite}
        />
      </div>
      <div role="link" tabIndex={0} onKeyDown={navigateToArticle} onClick={navigateToArticle}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.description}>{article.description}</p>
      </div>
      <div className={styles.row}>
        <span
          className={styles.span}
          role="link"
          tabIndex={0}
          onKeyDown={navigateToArticle}
          onClick={navigateToArticle}
        >
          Read more...
        </span>
        <ul>
          {article.tagList.map((name) => (
            <Tag key={uuid()} name={name} outlined />
          ))}
        </ul>
      </div>
    </article>
  );
}
