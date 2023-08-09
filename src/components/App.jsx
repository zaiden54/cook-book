import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AppNav from './UI/AppNav';

export default function App() {
  return (
    <div className="container">
      <AppNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}
