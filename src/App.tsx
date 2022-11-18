import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Cookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import Navbar from './commons/components/Navbar/Navbar';
import AppRouters from './AppRoutes';
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
        <Navbar />
        <ToastContainer />
        <AppRouters />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
