import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import theme from '@styles/theme';
import { Button, Icons, IconWrapper, Image } from '@components';

const DetailForm = ({
  previousRoot,
  previousRootText,
  title,
  writerId,
  writerProfileImage,
  writerNickname,
  postDate,
  likes,
  bodyText,
}) => (
  <div>
    <DetailRoot>
      <Link to={previousRoot}>{previousRootText} &gt;</Link>
    </DetailRoot>
    <DetailTitle>{title}</DetailTitle>
    <DetailInfo>
      <DetailWriterInfo>
        <Link to={`/channel/${writerId}`} className="profileImageWrapper">
          <Image
            src={writerProfileImage}
            alt="userProfile"
            width="auto"
            height="100%"
          />
        </Link>
        <div>
          <div>
            <Link to={`/channel/${writerId}`}>{writerNickname}</Link>
          </div>
          <div>{postDate}</div>
        </div>
      </DetailWriterInfo>
      {likes === null ? null : (
        <div className="detailInfoLikes">
          <IconWrapper>
            <Icons.Like />
          </IconWrapper>
          {likes} Likes
        </div>
      )}
    </DetailInfo>
    <DetailBody>
      <div>{bodyText}</div>
      <div>
        <Button width="6.25rem" height="2.8125rem" margin={0}>
          수정하기
        </Button>
      </div>
    </DetailBody>
  </div>
);

DetailForm.defaultProps = {
  previousRoot: '',
  previousRootText: '',
  title: '',
  writerId: -1,
  writerProfileImage: '',
  writerNickname: '',
  postDate: '',
  likes: null,
  bodyText: '',
};

DetailForm.propTypes = {
  previousRoot: PropTypes.string,
  previousRootText: PropTypes.string,
  title: PropTypes.string,
  writerId: PropTypes.number,
  writerProfileImage: PropTypes.string,
  writerNickname: PropTypes.string,
  postDate: PropTypes.string,
  likes: PropTypes.number,
  bodyText: PropTypes.string,
};

export default DetailForm;

const DetailRoot = styled.div`
  font-size: ${theme.font.small};
  color: ${theme.color.main};
  font-weight: bold;
`;

const DetailTitle = styled.div`
  font-size: ${theme.font.xLarge};
  padding: 0.9375rem 0;
`;

const DetailInfo = styled.div`
  display: flex;

  .detailInfoLikes {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const DetailWriterInfo = styled.div`
  display: flex;
  padding-bottom: 1.5625rem;

  .profileImageWrapper {
    height: 2.5rem;
    width: 2.5rem;
    position: relative;
    overflow: hidden;
    border-radius: 2.5rem;
    margin-right: 0.3125rem;

    > * {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  > div {
    > * {
      display: flex;
      align-items: center;
      height: 50%;
    }

    > div:nth-of-type(1) {
      font-weight: bold;
    }

    > div:nth-of-type(2) {
      font-size: ${theme.font.small};
      color: ${theme.color.greyDark};
    }
  }
`;

const DetailBody = styled.div`
  border-top: 0.0625rem solid ${theme.color.grey};
  min-height: 13rem;
  display: flex;
  flex-direction: column;

  > div:nth-of-type(1) {
    flex-grow: 1;
    padding: 1.5625rem 0;
    border-bottom: 0.0625rem solid ${theme.color.grey};
  }

  > div:nth-of-type(2) {
    height: auto;
    text-align: right;
    padding-top: 1.25rem;
  }
`;
