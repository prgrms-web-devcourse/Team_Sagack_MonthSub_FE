import React from 'react';
import { Header } from '@components';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
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
import UserProvider from './contexts/UserProvider';
import PrivateRoute from './utils/privateRoute';

const App = () => {
  const hasAuth = sessionStorage.getItem('authorization');
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signup" exact component={SignUpPage}>
            {hasAuth ? (
              <Redirect
                to={{
                  pathname: '/',
                  state: {
                    from: '/signup',
                  },
                }}
              />
            ) : (
              <SignUpPage />
            )}
          </Route>
          <Route path="/signin">
            {hasAuth ? (
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
          <PrivateRoute exact from="/my/info" component={MyInfoPage} />
          <PrivateRoute exact from="/my/edit" component={EditMyInfoPage} />
          <PrivateRoute exact from="/channel/my" component={ChannelPage} />
          <Route path="/channel/:id" exact component={ChannelPage} />
          <PrivateRoute exact from="/purchase/:id" component={PurchasePage} />
          <PrivateRoute
            exact
            from="/purchase/info"
            component={PurchaseHistoryPage}
          />
          <Route path="/search" exact component={SearchPage} />
          <PrivateRoute exact from="/writes" component={WriteListPage} />
          <Route path="/series" exact component={SeriesListPage} />
          <PrivateRoute
            exact
            from="/series/write"
            component={WriteSeriesPage}
          />
          <PrivateRoute
            exact
            from="/series/edit/:id"
            component={EditSeriesPage}
          />
          <Route path="/series/:id" exact component={SeriesDetailPage} />
          <PrivateRoute
            exact
            from="/series/:seriesId/article/write"
            component={WriteArticlePage}
          />
          <PrivateRoute
            exact
            from="/series/:seriesId/article/edit/:articleId"
            component={EditArticlePage}
          />
          <PrivateRoute
            exact
            from="/series/:seriesId/article/:articleId"
            component={ArticleDetailPage}
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
