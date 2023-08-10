import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import RecipePage from './Pages/RecipePage';
import AppNav from './UI/AppNav';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';

export default function App({ recipe, user, myrecipes }) {
  return (
    <div className="container">
      <AppNav user={user} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage myrecipes={myrecipes}  />} />
      </Routes>
    </div>
  );
}
