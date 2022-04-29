import React, { useCallback, useEffect } from 'react';
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
import {
  selectLimit,
  selectLoading,
  setLoading,
} from '../../redux/reducers/globalReducer';
import { fetchArticles } from '../../utils/httpServices/feedServices';
import styles from './Personal.module.css';
import Loader from '../../components/Loader/Loader';
import ArticlesLimiter from '../../components/ArticlesLimiter/ArticlesLimiter';
import Pagination from '../../components/Pagination/Pagination';

export default function Personal() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activePill: string = useSelector(selectActivePill);
  const loading: boolean = useSelector(selectLoading);
  const limit: number = useSelector(selectLimit);
  const articles = useSelector(selectArticles);
  const articlesCount: number = useSelector(selectArticlesCount);
  const currentPage: number = useSelector(selectPage);
  const { image, username, bio } = user;

  const toSettings = () => navigate('/settings');

  const getArticles = useCallback(async () => {
    dispatch(setArticlesCount(0));
    let str = `&offset=${(currentPage - 1) * limit}`;
    if (activePill === 'My') {
      str += `&author=${username}`;
    } else if (activePill === 'Favorited') {
      str += `&favorited=${username}`;
    }

    const articlesList = await fetchArticles(limit, token, str);
    if (typeof articlesList === 'string') {
      dispatch(setArticles(articlesList));
    } else {
      dispatch(setArticles(articlesList.articles));
      dispatch(setArticlesCount(articlesList.articlesCount));
    }
  }, [activePill, limit, user, currentPage]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [activePill]);

  useEffect(() => {
    if (user && (activePill === 'My' || activePill === 'Favorited')) {
      dispatch(setLoading(true));
      getArticles().then(() => dispatch(setLoading(false)));
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
          <Img src={`${image}`} alt="avatar" size="100px" />
          <p className={styles.username}>{username}</p>
          {bio && <p className={styles.bio}>{bio}</p>}
          <Button grey small className={styles.right} onClick={toSettings}>
            <IoSettingsSharp />
            &nbsp;Edit Profile Settings
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <Navpills />
          <ArticlesLimiter limits={[5, 10, 20]} defaultValue={5} />
        </div>
        {loading ? <Loader /> : showArticles()}
      </div>
    </main>
  );
}
