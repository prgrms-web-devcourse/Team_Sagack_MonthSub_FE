import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ArticleDetailPage,
  ChannelPage,
  EditArticlePage,
  EditMyInfoPage,
  HomePage,
  MyChannelPage,
  MyInfoPage,
  PurchaseHistoryPage,
  PurchasePage,
  SearchPage,
  SeriesDetailPage,
  SeriesListPage,
  SignInPage,
  SignUpPage,
  WriteArticlePage,
  WriteListPage,
  WriteSeriesPage,
  NotFoundPage,
} from '@pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:id" element={<ArticleDetailPage />} />
      <Route path="/channel/:id" element={<ChannelPage />} />
      <Route path="/edit/article/:id" element={<EditArticlePage />} />
      <Route path="/edit/my" element={<EditMyInfoPage />} />
      <Route path="/channel/my" element={<MyChannelPage />} />
      <Route path="/info/my" element={<MyInfoPage />} />
      <Route path="/info/purchase" element={<PurchaseHistoryPage />} />
      <Route path="/purchase" element={<PurchasePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/series/:id" element={<SeriesDetailPage />} />
      <Route path="/series" element={<SeriesListPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/article/write" element={<WriteArticlePage />} />
      <Route path="/writes" element={<WriteListPage />} />
      <Route path="/series/write" element={<WriteSeriesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
