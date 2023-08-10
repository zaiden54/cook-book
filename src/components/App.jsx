import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AppNav from './UI/AppNav';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';

export default function App({ user }) {
  return (
    <div className="container">
      <AppNav user={user} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}
