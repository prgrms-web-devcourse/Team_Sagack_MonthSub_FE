import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { UserProfile } from '@mocules';
import { Icon } from '@atom';
import replaceEnter from '@utils/replaceEnter';
import CommentForm from './CommentForm';

const CommentItem = ({
  useType,
  commentObj,
  userObj,
  childLength,
  onDelete,
  onUpdate,
  postMoreTarget,
  setPostMoreTarget,
  postUpdateTarget,
  setPostUpdateTarget,
  callbackCount,
  onCommentMoreClick,
}) => {
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [updateData, setUpdateData] = useState(commentObj.comment);

  const handlePostMoreClick = () => {
    if (postMoreTarget['target'] === commentObj.commentId) {
      setPostMoreTarget(current => ({
        ...current,
        state: !current['state'],
      }));
    } else {
      setPostMoreTarget({
        target: commentObj.commentId,
        state: true,
      });
    }
  };

  const handleUpdateClick = () => {
    setPostUpdateTarget({
      target: commentObj.commentId,
      state: true,
    });
  };

  const handleUpdateCancel = () => {
    setPostUpdateTarget({
      target: commentObj.commentId,
      state: false,
    });
  };

  const handleUpdateConfirm = e => {
    e.preventDefault();

    const { value } = e.target.comment;

    onUpdate({
      comment: value,
      id: commentObj.commentId,
    }).then(result => {
      if (result) {
        setUpdateData(value);
        setUpdateDisplay(false);
      }
    });
  };

  const handleDeletePost = () => {
    onDelete(commentObj.commentId).then(result => {
      if (result) {
        callbackCount();
        setIsDelete(true);
      }
    });
  };

  const handleCommentMoreClick = () => {
    onCommentMoreClick(commentObj.commentId);
  };

  useEffect(() => {
    if (postUpdateTarget['target'] === commentObj.commentId) {
      setPostMoreTarget(current => ({
        ...current,
        state: false,
      }));
      postUpdateTarget['state']
        ? setUpdateDisplay(true)
        : setUpdateDisplay(false);
    } else {
      setUpdateDisplay(false);
    }
  }, [postUpdateTarget]);

  useEffect(() => {}, [isDelete]);

  const data = (
    <CommentWrapper key={commentObj.commentId}>
      {updateDisplay ? (
        <div className="comment-inner">
          <CommentForm
            useType="update"
            onSubmit={handleUpdateConfirm}
            onCancel={handleUpdateCancel}
            defaultValue={updateData}
          />
        </div>
      ) : (
        <div className="comment-inner">
          {commentObj.commentStatus !== 'DELETED' && (
            <div className="comment-header">
              <div className="comment-profile">
                <UserProfile
                  userId={userObj.userId}
                  src={userObj.profileImage}
                  nickname={userObj.nickname}
                  size={2.25}
                  useType="profile"
                />
                {commentObj.isMine && <MyCommentLabel>내댓글</MyCommentLabel>}
              </div>
              {commentObj.isMine && (
                <div className="comment-vert">
                  <PostMoreButton
                    id={`postMore-${commentObj.commentId}`}
                    onClick={handlePostMoreClick}
                  >
                    <Icon.MoreVert />
                  </PostMoreButton>
                  {postMoreTarget['target'] === commentObj.commentId &&
                  postMoreTarget['state'] ? (
                    <PostMoreModal>
                      <ul>
                        <li
                          id={`postUpadate-${commentObj.commentId}`}
                          onClick={handleUpdateClick}
                        >
                          수정
                        </li>
                        <li
                          id={`postDelete-${commentObj.commentId}`}
                          onClick={handleDeletePost}
                        >
                          삭제
                        </li>
                      </ul>
                    </PostMoreModal>
                  ) : null}
                </div>
              )}
            </div>
          )}
          <div className="comment-main">
            {commentObj.commentStatus === 'DELETED' ? (
              <CommentText>삭제된 댓글입니다.</CommentText>
            ) : (
              <CommentText
                dangerouslySetInnerHTML={{
                  __html: replaceEnter(updateData),
                }}
              />
            )}
          </div>
          <div className="comment-bottom">
            <div className="comment-date">
              {commentObj.createdDateTime}
              <span className="comment-date-label">
                {commentObj.commentStatus === 'MODIFIED' && ' (수정됨)'}
                {commentObj.commentStatus === 'DELETED' && ' (삭제됨)'}
              </span>
            </div>
            {useType === 'parent' && (
              <div className="comment-button">
                <StyledButton onClick={handleCommentMoreClick}>
                  답글 {childLength}
                </StyledButton>
              </div>
            )}
          </div>
        </div>
      )}
    </CommentWrapper>
  );

  if (isDelete) {
    return childLength ? data : null;
  }
  return data;
};

CommentItem.defaultProps = {
  useType: 'parent',
  commentObj: {},
  userObj: {},
  childLength: 0,
  onDelete: () => {},
  onUpdate: () => {},
  postMoreTarget: null,
  setPostMoreTarget: () => {},
  postUpdateTarget: null,
  setPostUpdateTarget: () => {},
  callbackCount: () => {},
  onCommentMoreClick: () => {},
};

CommentItem.propTypes = {
  useType: PropTypes.string,
  commentObj: PropTypes.object,
  userObj: PropTypes.object,
  childLength: PropTypes.number,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  postMoreTarget: PropTypes.object,
  setPostMoreTarget: PropTypes.func,
  postUpdateTarget: PropTypes.object,
  setPostUpdateTarget: PropTypes.func,
  callbackCount: PropTypes.func,
  onCommentMoreClick: PropTypes.func,
};

export default CommentItem;

const CommentWrapper = styled.div`
  border-bottom: 1px solid ${theme.color.grey};
  padding: 1.25rem 0;

  .comment {
    &-inner {
      /* > * {
        border: 1px solid red;
      } */
    }

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-main {
    }

    &-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-profile {
      display: flex;
      align-items: center;
    }

    &-vert {
      position: relative;
    }

    &-date {
      font-size: ${theme.font.small};
      color: ${theme.color.greyDark};
    }

    &-date-label {
    }

    &-button {
    }
  }
`;

const CommentText = styled.div`
  padding: 1rem 0;
`;

const MyCommentLabel = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 1.25rem;
  background-color: ${theme.color.red};
  color: #ffffff;
  border-radius: 1.5rem;
  font-size: 0.75rem;
  padding: 0 0.5rem;
  margin-left: 0.5rem;
`;

const StyledButton = styled.button`
  background-color: ${theme.color.main};
  color: #ffffff;
  min-width: 5rem;
  height: 2.5rem;
  font-size: 14px;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const PostMoreButton = styled.button`
  background-color: transparent;
  color: ${theme.color.greyDark};
`;

// eslint-disable-next-line no-unused-vars
const PostMoreModal = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-10%, 100%);
  display: block;
  z-index: 1;

  > ul {
    background-color: #ffffff;
    border-radius: 0.25rem;
    box-shadow: ${theme.style.boxShadow};
    padding: 0.5rem 0;

    > li {
      box-sizing: content-box;
      width: 4rem;
      padding: 0.625rem 1rem;
      cursor: pointer;

      &:hover {
        background-color: ${theme.color.greyLight};
      }
    }
  }
`;
