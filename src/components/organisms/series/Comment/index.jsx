import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { SectionContainer } from '@templates';
import { theme, constants } from '@styles';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Comment = ({ API, pageId }) => {
  const [commentList, setCommentList] = useState([]);
  const [postMoreTarget, setPostMoreTarget] = useState({
    target: null,
    state: false,
  });
  const [postUpdateTarget, setPostUpdateTarget] = useState({
    target: null,
    state: false,
  });
  const [commentLength, setCommentLength] = useState();
  const commentMoreParentRef = useRef([]);
  const commentMoreChildRef = useRef([]);

  const readCommentList = async () => {
    const { data } = await API.read({
      seriesId: pageId,
      size: 100,
      lastId: null,
    });

    if (data) {
      let linkedLength = 0;

      const processedData = data.commentObjects
        .map(obj => {
          const rObj = {};
          rObj['commentMetaInfoObject'] = obj.commentMetaInfoObject;
          rObj['userInfoObject'] = obj.userInfoObject;
          rObj['replyCommentObjects'] = obj.replyCommentObjects.filter(
            comment =>
              comment.commentMetaInfoObject.commentStatus !== 'DELETED',
          );

          linkedLength += rObj.replyCommentObjects.length;
          return rObj;
        })
        .filter(comment => {
          if (comment.commentMetaInfoObject.commentStatus === 'DELETED') {
            if (!comment.replyCommentObjects.length) return false;
          }
          return true;
        });

      setCommentList(processedData);
      setCommentLength(processedData.length + linkedLength);
    }
  };

  const createComment = async createParams => {
    const { data } = await API.create(createParams);

    if (data.id) {
      readCommentList();
    }
  };

  const deleteComment = async id => {
    const { status } = await API.delete(id);

    if (status === 200) {
      return true;
    }
    return false;
  };

  const updateComment = async updateParams => {
    const { data } = await API.update(updateParams);

    if (data) {
      return true;
    }
    return false;
  };

  const handleCommentSubmit = e => {
    e.preventDefault();

    const { value } = e.target.comment;
    const parentId = Number(e.target.name);

    if (!value.replace(constants.text.blank, '')) {
      alert('댓글 내용을 입력해주세요.');
      return false;
    }

    if (parentId) {
      createComment({
        comment: value,
        seriesId: pageId,
        parentId,
      });
    } else {
      createComment({
        comment: value,
        seriesId: pageId,
      });
    }
  };

  const handleCommentMoreClick = id => {
    let outterTarget;
    let innerTarget;

    for (const obj of commentMoreParentRef.current) {
      if (obj['id'] === id) {
        outterTarget = obj;
        break;
      }
    }

    for (const obj of commentMoreChildRef.current) {
      if (obj['id'] === id) {
        innerTarget = obj;
        break;
      }
    }

    outterTarget['state'] = !outterTarget['state'];

    outterTarget['state']
      ? (outterTarget[
          'el'
        ].style.height = `${innerTarget['el'].clientHeight}px`)
      : (outterTarget['el'].style.height = '0');
  };

  useEffect(() => {
    readCommentList();
  }, []);

  useEffect(() => {
    for (const obj of commentMoreParentRef.current) {
      if (obj['state']) {
        obj['el'].style.height = 'auto';
      }
    }
  }, [commentList]);

  useEffect(() => {
    for (const obj of commentMoreParentRef.current) {
      if (obj['state']) {
        obj['el'].style.height = 'auto';
      }
    }
  }, [commentLength]);

  const callbackCount = useCallback(() => {
    setCommentLength(current => current - 1);
  }, []);

  return (
    <SectionContainer title={`댓글 ${commentLength}개`}>
      <CommentContainer>
        <CommentForm useType="create" onSubmit={handleCommentSubmit} />
        {commentList.map(comment => (
          <CommentContainerInner key={comment.commentMetaInfoObject.commentId}>
            <CommentItem
              useType="parent"
              commentObj={comment.commentMetaInfoObject}
              userObj={comment.userInfoObject}
              childLength={comment.replyCommentObjects.length}
              onDelete={deleteComment}
              onUpdate={updateComment}
              postMoreTarget={postMoreTarget}
              setPostMoreTarget={setPostMoreTarget}
              postUpdateTarget={postUpdateTarget}
              setPostUpdateTarget={setPostUpdateTarget}
              callbackCount={callbackCount}
              onCommentMoreClick={handleCommentMoreClick}
            />
            <LinkedCommentContainer
              ref={el => {
                commentMoreParentRef.current.push({
                  id: comment.commentMetaInfoObject.commentId,
                  el,
                  state: false,
                });
              }}
            >
              <LinkedCommentInner
                className="outter"
                ref={el => {
                  commentMoreChildRef.current.push({
                    id: comment.commentMetaInfoObject.commentId,
                    el,
                  });
                }}
              >
                {comment.replyCommentObjects.map(linkedComment => (
                  <CommentItem
                    key={linkedComment.commentMetaInfoObject.commentId}
                    useType="child"
                    parentId={comment.commentMetaInfoObject.commentId}
                    commentObj={linkedComment.commentMetaInfoObject}
                    userObj={linkedComment.userInfoObject}
                    onDelete={deleteComment}
                    onUpdate={updateComment}
                    postMoreTarget={postMoreTarget}
                    setPostMoreTarget={setPostMoreTarget}
                    postUpdateTarget={postUpdateTarget}
                    setPostUpdateTarget={setPostUpdateTarget}
                    callbackCount={callbackCount}
                  />
                ))}
                <CommentForm
                  useType="create"
                  onSubmit={handleCommentSubmit}
                  identifier={comment.commentMetaInfoObject.commentId}
                />
              </LinkedCommentInner>
            </LinkedCommentContainer>
          </CommentContainerInner>
        ))}
      </CommentContainer>
    </SectionContainer>
  );
};

Comment.defaultProps = {
  API: {},
  pageId: null,
};

Comment.propTypes = {
  API: PropTypes.objectOf(PropTypes.func),
  pageId: PropTypes.string,
};

export default Comment;

const CommentContainer = styled.div`
  border: 1px solid ${theme.color.greyMedium};
  padding: 1.875rem;
  // padding-top: 0;
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
  // padding-top: 0;

  > div:first-of-type {
    padding-top: 0;
  }
`;
