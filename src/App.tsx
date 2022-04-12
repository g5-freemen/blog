import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from './commons/redux/rootReducer';
import Navbar from './commons/components/Navbar/Navbar';
import Homepage from './commons/modules/Homepage/Homepage';
import SignIn from './commons/modules/SignIn/SignIn';
import SignUp from './commons/modules/SignUp/SignUp';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const cookies = new Cookies();
  const user = useSelector(selectUser);

  useEffect(() => () => cookies.remove('token'), []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
