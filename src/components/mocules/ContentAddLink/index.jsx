import React from 'react';
import { IconWrapper, Icon } from '@atom';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import theme from '@styles/theme';
import PropTypes from 'prop-types';

const ContentAddLink = ({ children, url }) => (
  <StyledLink to={url}>
    <IconWrapper color={theme.color.main} fontSize="2rem">
      <Icon.AddCircle />
    </IconWrapper>
    <Text>{children}</Text>
  </StyledLink>
);

ContentAddLink.defaultProps = {
  children: '',
  url: '',
};

ContentAddLink.propTypes = {
  children: PropTypes.string,
  url: PropTypes.string,
};

export default ContentAddLink;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  span:hover {
    color: ${theme.color.main};
    transition: all 200ms ease-out;
  }
`;

const Text = styled.span`
  margin-left: 0.3rem;
`;
