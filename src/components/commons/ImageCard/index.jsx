import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ImageCard = ({ nickname, title, introduceSentence, src, id }) => (
  <ImageWrapper to={`/series/${id}`}>
    <Image src={src} alt="미리보기" />
    <ImageInfo>
      <P>
        <Span>{nickname}</Span>
      </P>
      <P>{title}</P>
      <P>{introduceSentence}</P>
      <P>{id}</P>
    </ImageInfo>
  </ImageWrapper>
);
ImageCard.defaultProps = {
  nickname: '',
  title: '',
  introduceSentence: '',
  src: '',
  id: '',
};

ImageCard.propTypes = {
  nickname: PropTypes.string,
  title: PropTypes.string,
  introduceSentence: PropTypes.string,
  src: PropTypes.string,
  id: PropTypes.string,
};

export default ImageCard;

const ImageWrapper = styled(Link)`
  width: 15rem;
  height: 20rem;
  position: relative;
  border: 0.063rem 1px solid;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  filter: brightness(50%);
`;

const ImageInfo = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  top: calc(100% / 2);
  text-align: center;
`;

const P = styled.p`
  color: #ffffff;
`;

const Span = styled.span`
  font-weight: 900;
`;
