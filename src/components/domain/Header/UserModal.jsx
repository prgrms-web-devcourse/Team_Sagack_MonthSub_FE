import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';

const UserModal = ({ maxWidth, items, visible, ...props }) => (
  <StyledDiv maxwidth={maxWidth} visible={visible} {...props}>
    <List>
      <li>마이페이지</li>
      <li>관심 시리즈</li>
      <li>로그아웃</li>
    </List>
  </StyledDiv>
);

export default UserModal;

UserModal.defaultProps = {
  maxWidth: '200px',
  visible: false,
};

UserModal.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.array.isRequired,
  visible: PropTypes.bool,
};

const StyledDiv = styled.nav`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  width: 100%;
  max-width: ${({ maxwidth }) => maxwidth};
  background-color: aliceblue;
`;
