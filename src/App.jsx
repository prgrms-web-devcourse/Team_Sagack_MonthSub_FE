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
  UpdateArticlePage,
  WriteListPage,
  WriteSeriesPage,
  UpdateSeriesPage,
  NotFoundPage,
} from '@pages';

const App = () => {
  const isAuth = sessionStorage.getItem('authorization');
  return (
    // TODO: 생성 - write & 수정 - edit
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
        <Route path="/my/channel" exact component={MyChannelPage} />
        <Route path="/channel/:id" exact component={ChannelPage} />
        <Route path="/purchase" exact component={PurchasePage} />
        <Route path="/purchase/info" exact component={PurchaseHistoryPage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/writes" exact component={WriteListPage} />
        <Route path="/series" exact component={SeriesListPage} />
        <Route path="/series/write" exact component={WriteSeriesPage} />
        <Route path="/series/:id" exact component={SeriesDetailPage} />
        <Route path="/series/edit/:id" exact component={UpdateSeriesPage} />
        <Route path="/article/edit/:id" exact component={UpdateArticlePage} />
        <Route path="/article/write" exact component={WriteArticlePage} />
        <Route path="/article/:id" exact component={ArticleDetailPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Header>
  );
};

export default App;
