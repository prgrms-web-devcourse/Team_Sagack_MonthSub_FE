import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, EditArticleForm } from '@components';

const WriteArticlePage = ({ history, match }) => (
  <Wrapper>
    <EditArticleForm history={history} match={match} />
  </Wrapper>
);

WriteArticlePage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default WriteArticlePage;
