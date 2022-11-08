import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { IoSettingsSharp } from 'react-icons/io5';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Img } from '../../components/Navbar/Navbar';
import Articles from '../../components/Articles/Articles';
import Navpills from '../../components/Navpills/Navpills';
import {
  selectActivePill,
  selectArticles,
  selectArticlesCount,
  selectPage,
  setArticles,
  setArticlesCount,
  setPage,
} from '../../redux/reducers/feedReducer';
import { selectUser } from '../../redux/reducers/userReducer';
import { selectLimit, setLimit, setLoadingArticles } from '../../redux/reducers/globalReducer';
import { fetchArticles } from '../../utils/httpServices/feedServices';
import Loader from '../../components/Loader/Loader';
import ArticlesLimiter from '../../components/ArticlesLimiter/ArticlesLimiter';
import Pagination from '../../components/Pagination/Pagination';
import { DEFAULT_PERSONAL_ARTICLES_LIMIT, options } from '../../utils/constants';
import styles from './Personal.module.css';

const defaultLimit = DEFAULT_PERSONAL_ARTICLES_LIMIT;

export default function Personal() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activePill: string = useSelector(selectActivePill);
  const limit: number = useSelector(selectLimit);
  const articles = useSelector(selectArticles);
  const articlesCount: number = useSelector(selectArticlesCount);
  const currentPage: number = useSelector(selectPage);
  const { image, username, bio } = user;
  const [imageError, setImageError] = useState(false);
  const [searchStr, setSearchStr] = useState('');

  const onErrorImage = () => {
    if (!imageError) setImageError(true);
  };

  const toSettings = () => navigate('/settings');

  const { data: articlesData, isLoading: loadingArticles } = useQuery(
    `getArticles-${limit}-${searchStr}-${token}`,
    () => {
      if (!searchStr || !limit) return null;
      return fetchArticles(limit, token, searchStr);
    },
    options,
  );

  useEffect(() => {
    if (articlesData) {
      if (typeof articlesData === 'string') {
        dispatch(setArticles(articlesData));
        dispatch(setArticlesCount(0));
      } else {
        dispatch(setArticlesCount(articlesData.articlesCount));
        dispatch(setArticles(articlesData.articles));
      }
    }
  }, [articlesData]);

  useEffect(() => {
    if (limit && limit !== defaultLimit) {
      dispatch(setLimit(defaultLimit));
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentPage && currentPage !== 1) {
      dispatch(setPage(1));
    }
  }, [activePill, limit]);

  useEffect(() => {
    if (user && (activePill === 'My' || activePill === 'Favorited')) {
      dispatch(setLoadingArticles(true));
      dispatch(setArticlesCount(0));

      let str = `&offset=${(currentPage - 1) * limit}`;
      if (activePill === 'My') {
        str += `&author=${username}`;
      } else if (activePill === 'Favorited') {
        str += `&favorited=${username}`;
      }
      setSearchStr(str);
    }
  }, [activePill, currentPage, limit, user]);

  const showArticles = () => {
    if (Array.isArray(articles)) {
      if (articles.length > 0) {
        return (
          <>
            <Articles articlesList={articles} />
            {articlesCount > limit && <Pagination />}
          </>
        );
      }
      return <p className={styles.p}>No articles are here... yet.</p>;
    }

    return articles;
  };

  return (
    <main>
      <div className={styles.profile}>
        <div className={styles.container}>
          {image && !imageError && (
            <Img
              src={`${image}`}
              alt="avatar"
              size="100px"
              onError={onErrorImage}
              onLoad={() => {
                if (imageError) setImageError(false);
              }}
            />
          )}
          <h1 className={styles.username}>{username}</h1>
          {bio && <p className={styles.bio}>{bio}</p>}
          <Button grey small className={styles.right} onClick={toSettings}>
            <IoSettingsSharp />
            Edit Profile Settings
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <Navpills isLoading={loadingArticles} />
          <ArticlesLimiter limits={[5, 10, 20]} defaultValue={defaultLimit} />
        </div>
        {loadingArticles ? <Loader /> : showArticles()}
      </div>
    </main>
  );
}
