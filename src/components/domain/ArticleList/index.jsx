import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';
import { Link } from 'react-router-dom';
import { NoData } from '@components';

const ArticleList = ({ seriesId, list, ...props }) => (
  <ArticleListContainer {...props}>
    {list.length ? (
      list.map(item => (
        <Link
          to={`/series/${seriesId}/article/${item.articleId}`}
          key={item.articleId}
        >
          <Article>
            <div>{item.round}</div>
            <div className="title">{item.title}</div>
            <div>{item.date}</div>
          </Article>
        </Link>
      ))
    ) : (
      <NoData>
        해당하는 연재 목록이 없습니다. 연재 시작일을 확인해주세요.
      </NoData>
    )}
  </ArticleListContainer>
);

ArticleList.defaultProps = {
  seriesId: 0,
  list: [],
};

ArticleList.propTypes = {
  seriesId: PropTypes.number,
  list: PropTypes.array,
};

export default ArticleList;

const ArticleListContainer = styled.div`
  min-height: 20vh;
`;

const Article = styled.div`
  width: 100%;
  height: 3.75rem;
  padding: 0 1.25rem;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  border-bottom: 0.0625rem solid ${theme.color.grey};

  &:hover {
    background-color: ${theme.color.main};
    color: #fff;
    border-bottom: 0.0625rem solid #fff;
    transition: all 200ms ease-out;
  }

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

// const NoArticle = styled.div`
//   background-color: ${theme.color.grey};
//   height: 10rem;
//   border-radius: 1rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: ${theme.color.greyDark};
// `;
