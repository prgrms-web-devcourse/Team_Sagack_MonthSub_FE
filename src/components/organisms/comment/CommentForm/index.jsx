import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { theme, constants } from '@styles';
import { Link } from 'react-router-dom';

const CommentForm = ({
  isLogin,
  requestForm,
  onSubmit,
  handleCancelUpdate,
  defaultValue,
  identifier,
}) => {
  const [textValue, setTextValue] = useState(defaultValue);

  const handleChangeText = e => {
    setTextValue(e.currentTarget.value);
  };

  const handleSubmitComment = async e => {
    e.preventDefault();

    const { comment, name } = e.target;

    if (!comment.value.replace(constants.text.blank, '')) {
      alert('댓글 내용을 입력해주세요.');
      setTextValue('');
      return false;
    }

    if (requestForm === 'create') {
      const result = await onSubmit(comment.value, name);
      if (result) setTextValue('');
    } else if (requestForm === 'update') {
      onSubmit(comment.value);
    }
  };

  return (
    <StyledForm>
      {isLogin ? (
        <form onSubmit={handleSubmitComment} name={identifier}>
          <FormMain>
            <textarea
              name="comment"
              placeholder="댓글을 입력해주세요."
              value={textValue}
              onChange={handleChangeText}
            />
          </FormMain>
          <FormAside>
            {requestForm === 'update' && (
              <StyledButton onClick={handleCancelUpdate}>취소</StyledButton>
            )}
            <StyledButton>등록</StyledButton>
          </FormAside>
        </form>
      ) : (
        <NoUser>
          댓글을 작성하려면&nbsp;<Link to="/signin">로그인</Link>을
          진행해주세요.
        </NoUser>
      )}
    </StyledForm>
  );
};

CommentForm.defaultProps = {
  onSubmit: () => {},
  handleCancelUpdate: () => {},
  defaultValue: '',
  requestForm: 'create',
  identifier: null,
  isLogin: null,
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
  handleCancelUpdate: PropTypes.func,
  defaultValue: PropTypes.string,
  requestForm: PropTypes.string,
  identifier: PropTypes.number,
  isLogin: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default CommentForm;

const StyledForm = styled.div`
  form {
    position: relative;
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border: 1px solid ${theme.color.main};
    border-radius: ${theme.style.borderRadius};
  }
`;

const FormMain = styled.div`
  flex-grow: 1;
  display: flex;

  textarea {
    border-radius: ${theme.style.borderRadius} ${theme.style.borderRadius} 0 0;
    flex-grow: 1;
    width: 100%;
    resize: none;
    cursor: auto;
    font-size: 1rem;
    padding: 1rem;
  }
`;

const FormAside = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${theme.color.main};
`;

const NoUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border: 2px solid ${theme.color.main};

  a {
    font-weight: bold;
    color: ${theme.color.main};
  }
`;

const StyledButton = styled.button`
  background-color: #ffffff;
  border: 2px solid ${theme.color.main};
  color: ${theme.color.main};
  min-width: 5rem;
  height: 2.5rem;
  font-size: 14px;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0.625rem;
  margin-left: 0;
  font-weight: bold;
`;
