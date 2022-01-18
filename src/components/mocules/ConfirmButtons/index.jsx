import React from 'react';
import { Button } from '@atom';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConfirmButtons = ({ cancleName, confirmName, ...props }) => {
  const history = useHistory();
  return (
    <ButtonWrapper {...props}>
      <Button width="8rem" onClick={() => history.goBack()}>
        {cancleName}
      </Button>
      <Button type="submit" width="8rem">
        {confirmName}
      </Button>
    </ButtonWrapper>
  );
};

ConfirmButtons.defaultProps = {
  cancleName: '취소',
  confirmName: '확인',
};

ConfirmButtons.propTypes = {
  cancleName: PropTypes.string,
  confirmName: PropTypes.string,
};

export default ConfirmButtons;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 19rem;
  justify-content: space-between;
  margin: 0 auto;
`;
