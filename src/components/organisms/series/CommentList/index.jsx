import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { NoData, UserProfile } from '@mocules';
import theme from '@styles/theme';

const CommentList = ({ list, ...props }) => (
  <CommentListContainer {...props}>
    {list.length ? (
      list.map(item => (
        <Comment key={item.commentId}>
          <UserProfile nickname={item.nickname} />
          <div className="commentUnder">
            <div>{item.text}</div>
            {item.date}
          </div>
        </Comment>
      ))
    ) : (
      <NoData>작성된 댓글이 없습니다.</NoData>
    )}
  </CommentListContainer>
);

CommentList.defaultProps = {
  list: [],
};

CommentList.propTypes = {
  list: PropTypes.array,
};

export default CommentList;

const CommentListContainer = styled.div`
  min-height: 20rem;
`;

const Comment = styled.div`
  border-bottom: 0.0625rem solid ${theme.color.grey};
  padding: 1.25rem 0;

  .commentUnder {
    padding-left: 0.9375rem;
  }
`;
