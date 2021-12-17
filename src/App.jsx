import React from 'react';
import { Header } from '@components';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import {
  ArticleDetailPage,
  ChannelPage,
  EditMyInfoPage,
  HomePage,
  MyInfoPage,
  MyLikeSeriesPage,
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
import { useUser } from './contexts/UserProvider';

const App = () => {
  const { userInfo } = useUser();
  const hasAuth = userInfo.token;
  return (
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
        <Route path="/my/info" exact component={MyInfoPage}>
          {hasAuth ? (
            <MyInfoPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/my/info',
                },
              }}
            />
          )}
        </Route>
        <Route path="/my/likes" exact component={MyLikeSeriesPage}>
          {hasAuth ? (
            <MyLikeSeriesPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/my/likes',
                },
              }}
            />
          )}
        </Route>
        <Route path="/my/edit" exact component={EditMyInfoPage}>
          {hasAuth ? (
            <EditMyInfoPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/my/edit',
                },
              }}
            />
          )}
        </Route>
        <Route path="/channel/my" exact component={ChannelPage}>
          {hasAuth ? (
            <ChannelPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/channel/my',
                },
              }}
            />
          )}
        </Route>
        <Route path="/channel/:id" exact component={ChannelPage} />
        <Route path="/purchase/info" exact component={PurchaseHistoryPage}>
          {hasAuth ? (
            <PurchaseHistoryPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/purchase/info',
                },
              }}
            />
          )}
        </Route>
        <Route path="/purchase/:id" exact component={PurchasePage}>
          {hasAuth ? (
            <PurchasePage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/purchase/:id',
                },
              }}
            />
          )}
        </Route>
        <Route path="/search" exact component={SearchPage} />
        <Route path="/writes" exact component={WriteListPage}>
          {hasAuth ? (
            <WriteListPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/writes',
                },
              }}
            />
          )}
        </Route>
        <Route path="/series" exact component={SeriesListPage} />
        <Route path="/series/write" exact component={WriteSeriesPage}>
          {hasAuth ? (
            <WriteSeriesPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/series/write',
                },
              }}
            />
          )}
        </Route>
        <Route path="/series/edit/:id" exact component={EditSeriesPage}>
          {hasAuth ? (
            <EditSeriesPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/series/edit/:id',
                },
              }}
            />
          )}
        </Route>
        <Route path="/series/:id" exact component={SeriesDetailPage} />
        <Route
          path="/series/:seriesId/article/write"
          exact
          component={WriteArticlePage}
        >
          {hasAuth ? (
            <WriteArticlePage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/series/:seriesId/article/write',
                },
              }}
            />
          )}
        </Route>
        <Route
          path="/series/:seriesId/article/edit/:articleId"
          exact
          component={EditArticlePage}
        >
          {hasAuth ? (
            <EditArticlePage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/series/:seriesId/article/edit/:articleId',
                },
              }}
            />
          )}
        </Route>
        <Route
          path="/series/:seriesId/article/:articleId"
          exact
          component={ArticleDetailPage}
        >
          {hasAuth ? (
            <ArticleDetailPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/series/:seriesId/article/:articleId',
                },
              }}
            />
          )}
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
