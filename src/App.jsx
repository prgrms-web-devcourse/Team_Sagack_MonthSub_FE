import React from 'react';
import { Header } from '@components';
import { Route, Switch } from 'react-router-dom';
import {
  ArticleDetailPage,
  ChannelPage,
  EditMyInfoPage,
  FollowListPage,
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
  ServerErrorPage,
} from '@pages';

import PrivateRoute from './utils/privateRoute';
import PublicRoute from './utils/publicRoute';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <PublicRoute exact from="/signup" to="/" component={SignUpPage} />
      <PublicRoute exact from="/signin" to="/my/info" component={SignInPage} />
      <PrivateRoute exact from="/my/info" component={MyInfoPage} />
      <PrivateRoute exact from="/my/edit" component={EditMyInfoPage} />
      <PrivateRoute exact from="/channel/my" component={ChannelPage} />
      <Route path="/channel/:id" exact component={ChannelPage} />
      <PrivateRoute
        exact
        from="/purchase/info"
        component={PurchaseHistoryPage}
      />
      <Route path="/follow/my" exact component={FollowListPage} />
      <Route path="/follow/:id" exact component={FollowListPage} />
      <PrivateRoute exact from="/purchase/:id" component={PurchasePage} />
      <PrivateRoute exact from="/my/likes" component={MyLikeSeriesPage} />
      <Route path="/search" exact component={SearchPage} />
      <PrivateRoute exact from="/writes" component={WriteListPage} />
      <Route path="/series" exact component={SeriesListPage} />
      <PrivateRoute exact from="/series/write" component={WriteSeriesPage} />
      <PrivateRoute exact from="/series/edit/:id" component={EditSeriesPage} />
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
      <Route path="/server-error" component={ServerErrorPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </>
);

export default App;
