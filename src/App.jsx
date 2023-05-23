import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Global from './styles/Global';
import Header from './components/Header';
import Routes from './routes';

export default function App() {
  return (
    <>
      <Header />
      <Routes />
      <Global />
      <ToastContainer autoClose={3000} className="toast-container" />
    </>
  );
}
