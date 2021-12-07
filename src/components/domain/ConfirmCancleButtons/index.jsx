import React from 'react';
import { Button } from '@components';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConfirmCancleButtons = ({ cancleName, confirmName, ...props }) => {
  const history = useHistory();
  return (
    <ButtonWrapper {...props}>
      <StyledButton width="8rem" onClick={() => history.goBack()}>
        {cancleName}
      </StyledButton>
      <StyledButton type="submit" width="8rem">
        {confirmName}
      </StyledButton>
    </ButtonWrapper>
  );
};

ConfirmCancleButtons.defaultProps = {
  cancleName: '취소',
  confirmName: '확인',
};

ConfirmCancleButtons.propTypes = {
  cancleName: PropTypes.string,
  confirmName: PropTypes.string,
};

export default ConfirmCancleButtons;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  margin: 0 1rem;
  background-color: #fff;
  color: #ffb15c;
  border: 0.0625rem solid #ffb15c;
  &:hover {
    color: #fff;
    background-color: #ffb15c;
  }
`;
