import React from 'react';
import { Button } from '@components';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConfirmCancleButtons = ({ cancleName, confirmName, ...props }) => {
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
