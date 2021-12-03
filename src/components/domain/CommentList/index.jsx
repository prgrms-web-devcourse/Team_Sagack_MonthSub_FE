import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { UserInfo } from '@components';

const CommentList = ({ list, ...props }) => (
  <div { ...props }>
    {
      list.map(item => 
        <CommentWrapper key={ item.commentId }>
          <UserInfo nickname={ item.nickname } />
          <div className='commentUnder'>
            <div>
              { item.text }
            </div>
            { item.date }
          </div>
        </CommentWrapper>
      )
    }
  </div>
);

CommentList.defaultProps = {
  list: [],
}

CommentList.propTypes = {
  list: PropTypes.array,
}

export default CommentList;

const CommentWrapper = styled.div`
  border-bottom: 0.0625rem solid #bdbdbd;
  padding: 1.25rem 0;

  .commentUnder {
    padding-left: 0.9375rem;
  }
`;
