import React from 'react';
import Header from '@components/domain/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  ArticleDetailPage,
  ChannelPage,
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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/article/:id" component={ArticleDetailPage} />
        <Route exact path="/channel/:id" component={ChannelPage} />
        <Route exact path="/my-edit" component={EditMyInfoPage} />
        <Route exact path="/my-channel" component={MyChannelPage} />
        <Route exact path="/my-info" component={MyInfoPage} />
        <Route exact path="/purchase-info" component={PurchaseHistoryPage} />
        <Route exact path="/purchase" component={PurchasePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/series/:id" component={SeriesDetailPage} />
        <Route exact path="/series" component={SeriesListPage} />
        <Route exact path="/signin">
          {isAuth ? (
            <Redirect
              to={{
                pathname: '/my-info',
                state: {
                  from: '/signin',
                },
              }}
            />
          ) : (
            <SignInPage />
          )}
        </Route>
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/article-write" component={WriteArticlePage} />
        <Route exact path="/article-write/:id" component={WriteArticlePage} />
        <Route exact path="/my-series" component={WriteListPage} />
        <Route exact path="/series-write" component={WriteSeriesPage} />
        <Route exact path="/series-write/:id" component={UpdateSeriesPage} />
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    </Header>
  );
};

export default App;
