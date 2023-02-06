import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import ArticleView from './commons/modules/ArticleView/ArticleView';
import Homepage from './commons/modules/Homepage/Homepage';
import NewArticle from './commons/modules/NewArticle/NewArticle';
import Personal from './commons/modules/Personal/Personal';
import Settings from './commons/modules/Settings/Settings';
import SignIn from './commons/modules/SignIn/SignIn';
import SignUp from './commons/modules/SignUp/SignUp';
import { selectUser } from './commons/redux/reducers/userReducer';

export default function AppRouters() {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route path="/editor" element={<NewArticle />} />
      <Route path="/editor/:slug" element={<NewArticle />} />
      <Route path="/article/:slug" element={<ArticleView />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/settings" element={<Settings />} />
      {user && <Route path={`/@${user.username}`} element={<Personal />} />}
      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}
