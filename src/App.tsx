import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './commons/components/Navbar/Navbar';
import Homepage from './commons/modules/Homepage/Homepage';
import SignIn from './commons/modules/SignIn/SignIn';
import SignUp from './commons/modules/SignUp/SignUp';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
