import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { SectionContainer } from '@templates';
import { theme } from '@styles';
import { useParams } from 'react-router-dom';
import { useUser } from '@contexts/UserProvider';
import Swal from 'sweetalert2';
import {
  postSeriesComment,
  getSeriesComment,
  putSeriesComment,
  deleteSeriesComment,
} from '@apis/series';
import CommentItem from '../CommentItem';
import CommentForm from '../CommentForm';

const CommentList = () => {
  const { id } = useParams();
  const [commentList, setCommentList] = useState([]);
  const [postMoreTarget, setPostMoreTarget] = useState({
    target: null,
    state: false,
  });
  const [postUpdateTarget, setPostUpdateTarget] = useState({
    target: null,
    state: false,
  });
  const commentMoreParentRef = useRef([]);
  const commentMoreChildRef = useRef([]);
  const [commentCount, setCommentCount] = useState({
    event: '',
    length: null,
  });
  const { userInfo } = useUser();

  const getError = message => {
    Swal.fire({
      title: message,
      icon: 'question',
      confirmButtonText: '확인',
      confirmButtonColor: '#ffb15c',
    });

    return false;
  };

  const getCommentList = async () => {
    const { data } = await getSeriesComment({
      seriesId: id,
      size: 100,
      lastId: null,
    });

    if (!data) {
      getError('댓글 조회에 실패했습니다.');
      return;
    }

    let linkedLength = 0;
    let deletedParentLength = 0;

    const processedData = data.commentObjects
      .map(obj => {
        const rObj = {};
        rObj['commentMetaInfoObject'] = obj.commentMetaInfoObject;
        rObj['userInfoObject'] = obj.userInfoObject;
        rObj['replyCommentObjects'] = obj.replyCommentObjects.filter(
          comment => comment.commentMetaInfoObject.commentStatus !== 'DELETED',
        );

        linkedLength += rObj.replyCommentObjects.length;
        return rObj;
      })
      .filter(comment => {
        if (comment.commentMetaInfoObject.commentStatus === 'DELETED') {
          if (!comment.replyCommentObjects.length) return false;
          deletedParentLength += 1;
        }
        return true;
      });

    setCommentCount({
      event: 'create',
      length: processedData.length - deletedParentLength + linkedLength,
    });
    setCommentList(processedData);
  };

  const createComment = async (comment, parentId) => {
    const { data } = await postSeriesComment({
      comment,
      seriesId: id,
      parentId,
    });

    if (data.id) {
      getCommentList();
      return true;
    }
    getError('댓글 입력에 실패했습니다.');
  };

  const updateComment = async updateParams => {
    const { data } = await putSeriesComment(updateParams);

    if (data) {
      return true;
    }
    getError('댓글 업데이트에 실패했습니다.');
  };

  const deleteComment = async commentId => {
    const { status } = await deleteSeriesComment(commentId);

    if (status === 200) {
      return true;
    }
    getError('댓글 삭제에 실패했습니다.');
  };

  const callbackCount = () => {
    setCommentCount(current => ({
      event: 'delete',
      length: current.length - 1,
    }));
  };

  const resizeCommentMoreHeight = targetScope => {
    const target = commentMoreParentRef.current;

    target.forEach((obj, index) => {
      if (obj.el.clientHeight !== 0) {
        target[index].el.style.height = 'auto';
      }
      if (targetScope === 'this') return false;
    });
  };

  const handleToggleCommentMore = commentId => {
    let outerTarget;
    let thisIndex;

    commentMoreParentRef.current.forEach((obj, index) => {
      if (obj.id === commentId) {
        outerTarget = commentMoreParentRef.current[index];
        thisIndex = index;
        return false;
      }
    });

    if (outerTarget.el.style.height === 'auto') {
      outerTarget.el.style.height = `${commentMoreChildRef.current[thisIndex].el.clientHeight}px`;
    }

    if (outerTarget.el.clientHeight !== 0) {
      outerTarget.el.style.height = '0';
    } else {
      outerTarget.el.style.height = `${commentMoreChildRef.current[thisIndex].el.clientHeight}px`;
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  useEffect(() => {
    commentMoreParentRef.current = commentMoreParentRef.current.filter(
      obj => obj.el !== null,
    );

    if (commentList.length > 0) {
      resizeCommentMoreHeight('all');
    }
  }, [commentList]);

  useEffect(() => {
    if (commentCount.length) {
      if (commentCount.event === 'delete') {
        resizeCommentMoreHeight('this');
      }
    }
  }, [commentCount]);

  useEffect(() => {
    if (postUpdateTarget.target) {
      resizeCommentMoreHeight('this');
    }
  }, [postUpdateTarget]);

  return (
    <SectionContainer title={`댓글 ${commentCount.length}개`}>
      <CommentContainer>
        <CommentForm
          requestForm="create"
          onSubmit={createComment}
          isLogin={userInfo.userId}
        />
        {commentList.map((comment, index) => (
          <CommentContainerInner key={comment.commentMetaInfoObject.commentId}>
            <CommentItem
              requestForm="parent"
              commentObj={comment.commentMetaInfoObject}
              userObj={comment.userInfoObject}
              childLength={comment.replyCommentObjects.length}
              postMoreTarget={postMoreTarget}
              setPostMoreTarget={setPostMoreTarget}
              postUpdateTarget={postUpdateTarget}
              setPostUpdateTarget={setPostUpdateTarget}
              callbackCount={callbackCount}
              onDelete={deleteComment}
              onUpdate={updateComment}
              onToggle={handleToggleCommentMore}
            />
            <LinkedCommentContainer
              ref={el => {
                commentMoreParentRef.current[index] = {
                  id: comment.commentMetaInfoObject.commentId,
                  el,
                };
              }}
            >
              <LinkedCommentInner
                ref={el => {
                  commentMoreChildRef.current[index] = {
                    id: comment.commentMetaInfoObject.commentId,
                    el,
                  };
                }}
              >
                {comment.replyCommentObjects.map(linkedComment => (
                  <CommentItem
                    key={linkedComment.commentMetaInfoObject.commentId}
                    parentId={comment.commentMetaInfoObject.commentId}
                    requestForm="child"
                    commentObj={linkedComment.commentMetaInfoObject}
                    userObj={linkedComment.userInfoObject}
                    postMoreTarget={postMoreTarget}
                    setPostMoreTarget={setPostMoreTarget}
                    postUpdateTarget={postUpdateTarget}
                    setPostUpdateTarget={setPostUpdateTarget}
                    callbackCount={callbackCount}
                    onDelete={deleteComment}
                    onUpdate={updateComment}
                  />
                ))}
                <CommentForm
                  requestForm="create"
                  onSubmit={createComment}
                  identifier={comment.commentMetaInfoObject.commentId}
                  isLogin={userInfo.userId}
                />
              </LinkedCommentInner>
            </LinkedCommentContainer>
          </CommentContainerInner>
        ))}
      </CommentContainer>
    </SectionContainer>
  );
};

export default CommentList;

const CommentContainer = styled.div`
  border: 1px solid ${theme.color.greyMedium};
  padding: 1.875rem;
`;

const CommentContainerInner = styled.div``;

const LinkedCommentContainer = styled.div`
  background-color: #eaeaea;
  height: 0;
  overflow: hidden;
  transition: height 0.2s ease;
`;

const LinkedCommentInner = styled.div`
  padding: 1.875rem;

  > div:first-of-type {
    padding-top: 0;
  }
`;
