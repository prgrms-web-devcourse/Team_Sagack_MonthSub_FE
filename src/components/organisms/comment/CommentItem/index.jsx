import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { UserProfile } from '@mocules';
import { Icon } from '@atom';
import replaceEnter from '@utils/replaceEnter';
import CommentForm from '../CommentForm';

const CommentItem = ({
  requestForm,
  commentObj,
  userObj,
  childLength,
  parentId,
  postMoreTarget,
  setPostMoreTarget,
  postUpdateTarget,
  setPostUpdateTarget,
  callbackCount,
  onDelete,
  onUpdate,
  onToggle,
}) => {
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [updateData, setUpdateData] = useState(commentObj.comment);

  const handleClickPostMore = () => {
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

  const handleClickUpdate = () => {
    setPostUpdateTarget({
      target: commentObj.commentId,
      state: true,
    });
  };

  const handleCancelUpdate = () => {
    setUpdateDisplay(false);

    setPostUpdateTarget({
      target: commentObj.commentId,
      state: false,
    });
  };

  const handleDeletePost = async () => {
    const result = await onDelete(commentObj.commentId);

    if (result) {
      setIsDelete(true);
    }
  };

  const onSubmitComment = async comment => {
    const result = await onUpdate({
      comment,
      id: commentObj.commentId,
    });

    if (result) {
      setUpdateData(comment);
      setUpdateDisplay(false);
    }
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

  useEffect(() => {
    if (isDelete) callbackCount(parentId);
  }, [isDelete]);

  return (
    <CommentWrapper
      key={commentObj.commentId}
      isDelete={!!(isDelete && childLength === 0)}
    >
      {updateDisplay ? (
        <div>
          <CommentForm
            requestForm="update"
            onSubmit={onSubmitComment}
            handleCancelUpdate={handleCancelUpdate}
            defaultValue={updateData}
            isLogin
          />
        </div>
      ) : (
        <div>
          {commentObj.commentStatus !== 'DELETED' && !isDelete && (
            <CommentHeader>
              <CommentProfile>
                <UserProfile
                  userId={userObj.userId}
                  src={userObj.profileImage}
                  nickname={userObj.nickname}
                  size={2.25}
                  requestForm="profile"
                />
                {commentObj.isMine && <MyCommentLabel>내댓글</MyCommentLabel>}
              </CommentProfile>
              {commentObj.isMine && (
                <CommentVert>
                  <PostMoreButton
                    id={`postMore-${commentObj.commentId}`}
                    onClick={handleClickPostMore}
                  >
                    <Icon.MoreVert />
                  </PostMoreButton>
                  {postMoreTarget['target'] === commentObj.commentId &&
                  postMoreTarget['state'] ? (
                    <PostMoreModal>
                      <ul>
                        <li
                          id={`postUpadate-${commentObj.commentId}`}
                          onClick={handleClickUpdate}
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
                </CommentVert>
              )}
            </CommentHeader>
          )}
          <div>
            {commentObj.commentStatus === 'DELETED' ? (
              <CommentText>삭제된 댓글입니다.</CommentText>
            ) : isDelete ? (
              <CommentText>삭제된 댓글입니다.</CommentText>
            ) : (
              <CommentText
                dangerouslySetInnerHTML={{
                  __html: replaceEnter(updateData),
                }}
              />
            )}
          </div>
          <CommentBottom>
            <CommentDate>
              {commentObj.createdDateTime}
              <span>
                {commentObj.commentStatus === 'MODIFIED' && ' (수정됨)'}
                {commentObj.commentStatus === 'DELETED' && ' (삭제됨)'}
              </span>
            </CommentDate>
            {requestForm === 'parent' && (
              <div>
                <StyledButton onClick={() => onToggle(commentObj.commentId)}>
                  답글 {childLength}
                </StyledButton>
              </div>
            )}
          </CommentBottom>
        </div>
      )}
    </CommentWrapper>
  );
};

CommentItem.defaultProps = {
  requestForm: 'parent',
  commentObj: {},
  userObj: {},
  childLength: 0,
  parentId: null,
  postMoreTarget: null,
  setPostMoreTarget: () => {},
  postUpdateTarget: null,
  setPostUpdateTarget: () => {},
  callbackCount: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  onToggle: () => {},
};

CommentItem.propTypes = {
  requestForm: PropTypes.string,
  commentObj: PropTypes.object,
  userObj: PropTypes.object,
  childLength: PropTypes.number,
  parentId: PropTypes.number,
  postMoreTarget: PropTypes.object,
  setPostMoreTarget: PropTypes.func,
  postUpdateTarget: PropTypes.object,
  setPostUpdateTarget: PropTypes.func,
  callbackCount: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onToggle: PropTypes.func,
};

export default CommentItem;

const CommentWrapper = styled.div`
  border-bottom: 1px solid ${theme.color.grey};
  padding: 1.25rem 0;

  display: ${({ isDelete }) => (isDelete ? 'none' : 'block')};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CommentProfile = styled.div`
  display: flex;
  align-items: center;
`;
const CommentVert = styled.div`
  position: relative;
`;
const CommentDate = styled.div`
  font-size: ${theme.font.small};
  color: ${theme.color.greyDark};
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
