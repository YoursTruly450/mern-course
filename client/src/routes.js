import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import {CreatePage} from './pages/CreatePage';
import {DetailPage} from './pages/DetailPage';
import {LinksPage} from './pages/LinksPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" exact element={<LinksPage />}>
        </Route>
        <Route path="/create" exact element={<CreatePage />}>
        </Route>
        <Route path="/detail/:id" element={<DetailPage />}>
        </Route>
        <Route path="*" element={<Navigate to ="/create" />}/>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" exact element={<AuthPage />}>
      </Route>
      <Route path="*" element={<Navigate to ="/" />}/>
    </Routes>
  )
}