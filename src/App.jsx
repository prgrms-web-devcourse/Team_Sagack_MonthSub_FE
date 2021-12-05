import React from 'react';
import Header from '@components/domain/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
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
  UpdateSeriesPage,
  NotFoundPage,
} from '@pages';

const App = () => {
  const isAuth = sessionStorage.getItem('authorization');
  return (
    <Header>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/article/:id">
          <ArticleDetailPage />
        </Route>
        <Route exact path="/channel/:id">
          <ChannelPage />
        </Route>
        <Route exact path="/edit/article/:id">
          <EditArticlePage />
        </Route>
        <Route exact path="/edit/my">
          <EditMyInfoPage />
        </Route>
        <Route exact path="/channel/my">
          <MyChannelPage />
        </Route>
        <Route exact path="/info/my">
          <MyInfoPage />
        </Route>
        <Route exact path="/info/purchase">
          <PurchaseHistoryPage />
        </Route>
        <Route exact path="/purchase">
          <PurchasePage />
        </Route>
        <Route exact path="/search">
          <SearchPage />
        </Route>
        <Route exact path="/series/:id">
          <SeriesDetailPage />
        </Route>
        <Route exact path="/series">
          <SeriesListPage />
        </Route>
        <Route exact path="/signin">
          {isAuth ? (
            <Redirect
              to={{
                pathname: '/info/my',
                state: {
                  from: '/signin',
                },
              }}
            />
          ) : (
            <SignInPage />
          )}
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/article-write">
          <WriteArticlePage />
        </Route>
        <Route exact path="/writes">
          <WriteListPage />
        </Route>
        <Route exact path="/series-write">
          <WriteSeriesPage />
        </Route>
        <Route exact path="/series-update">
          <UpdateSeriesPage />
        </Route>
        <Route exact path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Header>
  );
};

export default App;
