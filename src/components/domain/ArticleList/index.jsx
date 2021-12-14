import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const ArticleList = ({ list, ...props }) => (
  <div {...props}>
    {list.map(item => (
      <ArticleContainer key={item.articleId}>
        <div>{item.round}</div>
        <div className="title">{item.title}</div>
        <div>날짜</div>
      </ArticleContainer>
    ))}
  </div>
);

ArticleList.defaultProps = {
  list: [],
};

ArticleList.propTypes = {
  list: PropTypes.array,
};

export default ArticleList;

const ArticleContainer = styled.div`
  width: 100%;
  height: 3.75rem;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  border-bottom: 0.0625rem solid ${theme.color.grey};

  > div {
    &:nth-of-type(1) {
      width: 5rem;
    }

    &:nth-of-type(2) {
      flex-grow: 1;
    }

    &:nth-of-type(3) {
      width: 7.5rem;
      text-align: right;
    }
  }
`;
