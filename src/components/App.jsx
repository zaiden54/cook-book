import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import RecipePage from './Pages/RecipePage';
import AppNav from './UI/AppNav';

export default function App({ recipe }) {
  return (
    <div className="container">
      <AppNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
}
