import React from 'react';
import { Cookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { Spinner } from '../../components/Spinner/Spinner';
import { options } from '../../utils/constants';
import { fetchArticle } from '../../utils/httpServices/feedServices';
import styles from './ArticleView.module.css';

export default function ArticleView() {
  const { slug } = useParams();
  const cookies = new Cookies();
  const token: string = cookies.get('token');

  const { data, isLoading } = useQuery(
    `getArticle-${slug}`,
    () => fetchArticle(slug, token),
    options,
  );

  const article = typeof data !== 'string' ? data : null;

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
            <h1 className={styles.title}>{article?.title}</h1>
          </div>
          <div className={styles.body}>
            {article?.body?.split('\\n').map((item) => (
              <p key={uuid()}>{item}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
