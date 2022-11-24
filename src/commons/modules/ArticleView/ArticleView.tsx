import React from 'react';
import { Cookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import Author from '../../components/Author/Author';
import Comment from '../../components/Comment/Comment';
import FavoriteBtn from '../../components/FavoriteBtn/FavoriteBtn';
import FollowBtn from '../../components/FollowBtn/FollowBtn';
import { Spinner } from '../../components/Spinner/Spinner';
import Tag from '../../components/Tag/Tag';
import { options } from '../../utils/constants';
import { toastNotLogged } from '../../utils/errorsToasts';
import {
  favorite,
  fetchArticle,
  fetchComments,
  follow,
} from '../../utils/httpServices/feedServices';
import { CommentType } from '../../utils/httpServices/types';
import styles from './ArticleView.module.css';

export default function ArticleView() {
  const { slug } = useParams();
  const cookies = new Cookies();
  const token: string = cookies.get('token');

  const { data, isLoading, refetch } = useQuery(
    `getArticle-${slug}`,
    () => fetchArticle(slug, token),
    options,
  );

  const { data: comments } = useQuery(
    `getComments-${slug}`,
    () => fetchComments(slug, token),
    options,
  );

  const article = typeof data !== 'string' ? data : null;

  const pressFollow = async () => {
    if (!token) toastNotLogged();
    if (!article || !token) return false;

    await follow(article.author.username, token, article.author.following).then(() => refetch());
    return true;
  };

  const pressFavorite = async () => {
    if (!token) toastNotLogged();
    if (!article || !token) return false;

    await favorite(article.slug, token, article.favorited).then(() => refetch());
    return true;
  };

  return (
    <div>
      {typeof data === 'string' && data}
      {isLoading ? (
        <div className={styles.loading}>
          <Spinner size="33%" />
        </div>
      ) : (
        <>
          <div className={styles.banner}>
            <div className={styles.bannerContainer}>
              <h1 className={styles.title}>{article?.title}</h1>
              <div className={styles.flex}>
                <Author article={article} />
                <FollowBtn
                  followed={article?.author.following}
                  text={article?.author.username}
                  onPress={pressFollow}
                />
                <FavoriteBtn
                  counter={article?.favoritesCount || 0}
                  favorited={article?.favorited || false}
                  text={`${article?.favorited ? 'Unfavorite' : 'Favorite'} Article`}
                  onPress={pressFavorite}
                />
              </div>
            </div>
          </div>
          <div className={styles.body}>
            {article?.body?.split('\\n').map((item: string) => (
              <p key={uuid()}>{item}</p>
            ))}
            <div className={styles.tags}>
              {article?.tagList.map((tag: string) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
            <hr className={styles.hr} />
            <div className={styles.flex} style={{ justifyContent: 'center', margin: '2rem 0' }}>
              <Author article={article} />
              <FollowBtn
                followed={article?.author.following}
                text={article?.author.username}
                onPress={pressFollow}
              />
              <FavoriteBtn
                counter={article?.favoritesCount || 0}
                favorited={article?.favorited || false}
                text={`${article?.favorited ? 'Unfavorite' : 'Favorite'} Article`}
                onPress={pressFavorite}
              />
            </div>
            {comments?.map((item: CommentType) => (
              <Comment data={item} key={item.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
