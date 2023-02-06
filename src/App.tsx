import 'react-toastify/dist/ReactToastify.css';

import React, { useCallback, useEffect } from 'react';
import { Cookies, CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppRouters from './AppRoutes';
import Navbar from './commons/components/Navbar/Navbar';
import { selectUser, setUser } from './commons/redux/reducers/userReducer';
import { fetchCurrentUser } from './commons/utils/httpServices/loginServices';

export default function App() {
  const queryClient = new QueryClient();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const getCurrentUser = useCallback(
    async (token: string) => {
      const data = await fetchCurrentUser(token);
      dispatch(setUser(typeof data === 'string' ? null : data));
    },
    [dispatch],
  );

  useEffect(() => {
    const token = cookies.get('token');
    if (token && !user) {
      getCurrentUser(token);
    }

    return () => cookies.remove('token');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <BrowserRouter>
          <Navbar />
          <ToastContainer />
          <AppRouters />
        </BrowserRouter>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
