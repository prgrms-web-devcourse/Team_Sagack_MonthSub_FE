import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { Link } from 'react-router-dom';
import { useUser } from '@contexts/UserProvider';

const CommentForm = ({
  useType,
  onSubmit,
  onCancel,
  defaultValue,
  identifier,
}) => {
  const { userInfo } = useUser();
  const textRef = useRef();

  const handleSubmit = e => {
    onSubmit(e);

    textRef.current.value = '';
  };

  return (
    <StyledForm>
      {userInfo.userId ? (
        <form onSubmit={handleSubmit} name={identifier}>
          <div className="main">
            <textarea
              name="comment"
              placeholder="댓글을 입력해주세요."
              defaultValue={defaultValue}
              ref={textRef}
            />
          </div>
          <div className="aside">
            {useType === 'update' && (
              <StyledButton onClick={onCancel}>취소</StyledButton>
            )}
            <StyledButton type="submit">등록</StyledButton>
          </div>
        </form>
      ) : (
        <div className="noUser">
          댓글을 작성하려면&nbsp;<Link to="/signin">로그인</Link>을
          진행해주세요.
        </div>
      )}
    </StyledForm>
  );
};

CommentForm.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  defaultValue: null,
  useType: 'create',
  identifier: null,
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  defaultValue: PropTypes.string,
  useType: PropTypes.string,
  identifier: PropTypes.number,
};

export default CommentForm;

const StyledForm = styled.div`
  // padding-top: 1.875rem;

  form {
    position: relative;
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border: 1px solid ${theme.color.main};
    border-radius: ${theme.style.borderRadius};
  }

  .main {
    flex-grow: 1;
    display: flex;
  }

  .aside {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid ${theme.color.main};
  }

  .noUser {
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
  }

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
