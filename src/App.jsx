import React from 'react';
import Header from '@components/domain/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  ArticleDetailPage,
  ChannelPage,
  EditMyInfoPage,
  HomePage,
  MyInfoPage,
  PurchaseHistoryPage,
  PurchasePage,
  SearchPage,
  SeriesDetailPage,
  SeriesListPage,
  SignInPage,
  SignUpPage,
  WriteArticlePage,
  EditArticlePage,
  WriteListPage,
  WriteSeriesPage,
  EditSeriesPage,
  NotFoundPage,
} from '@pages';

const App = () => {
  const isAuth = sessionStorage.getItem('authorization');
  return (
    <Header>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/signin">
          {isAuth ? (
            <Redirect
              to={{
                pathname: '/my/info',
                state: {
                  from: '/signin',
                },
              }}
            />
          ) : (
            <SignInPage />
          )}
        </Route>
        <Route path="/my/info" exact component={MyInfoPage} />
        <Route path="/my/edit" exact component={EditMyInfoPage} />
        <Route path="/channel/:id" exact component={ChannelPage} />
        <Route path="/purchase" exact component={PurchasePage} />
        <Route path="/purchase/info" exact component={PurchaseHistoryPage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/writes" exact component={WriteListPage} />
        <Route path="/series" exact component={SeriesListPage} />
        <Route path="/series/write" exact component={WriteSeriesPage} />
        <Route path="/series/:id" exact component={SeriesDetailPage} />
        <Route path="/series/edit/:id" exact component={EditSeriesPage} />
        <Route path="/article/write/:id" exact component={WriteArticlePage} />
        <Route path="/article/edit/:id" exact component={EditArticlePage} />
        <Route
          path="/series/:seriesId/article/:articleId"
          exact
          component={ArticleDetailPage}
        />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Header>
  );
};

export default App;
