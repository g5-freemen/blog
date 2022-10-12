import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Cookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import Navbar from './commons/components/Navbar/Navbar';
import Homepage from './commons/modules/Homepage/Homepage';
import SignIn from './commons/modules/SignIn/SignIn';
import SignUp from './commons/modules/SignUp/SignUp';
import NewArticle from './commons/modules/NewArticle/NewArticle';
import Settings from './commons/modules/Settings/Settings';
import Personal from './commons/modules/Personal/Personal';
import { fetchCurrentUser } from './commons/utils/httpServices/loginServices';
import { selectUser, setUser } from './commons/redux/reducers/userReducer';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const queryClient = new QueryClient();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  async function getCurrentUser(token: string) {
    const data = await fetchCurrentUser(token);
    if (typeof data !== 'string') {
      dispatch(setUser(data));
    } else {
      dispatch(setUser(null));
    }
  }

  useEffect(() => {
    const token = cookies.get('token');
    if (token && !user) {
      getCurrentUser(token);
    }

    return () => cookies.remove('token');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar user={user} />
        <ToastContainer />
        <Routes>
          <Route path="/editor" element={<NewArticle />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/settings" element={<Settings />} />
          {user && <Route path={`/@${user.username}`} element={<Personal />} />}
          <Route path="*" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
