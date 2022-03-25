import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import theme from '@styles/theme';
import { Button, Image } from '@atom';
import { SeriesLikeToggle } from '@molecules';
import replaceEnter from '@utils/replaceEnter';

const DetailContent = ({
  previousRoot,
  previousRootText,
  parentId,
  title,
  writerId,
  writerProfileImage,
  writerNickname,
  postDate,
  likes,
  isLiked,
  bodyText,
  isMine,
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
          <SeriesLikeToggle
            id={parentId}
            initialCount={likes}
            isLiked={isLiked}
          />
        </div>
      )}
    </DetailInfo>
    <DetailMain>
      <InnerText
        dangerouslySetInnerHTML={{
          __html: replaceEnter(bodyText),
        }}
      />
      <div>
        {isMine ? (
          <Link to={`/series/edit/${parentId}`}>
            <Button width="6.25rem" height="2.8125rem" margin={0}>
              수정하기
            </Button>
          </Link>
        ) : null}
      </div>
    </DetailMain>
  </div>
);

DetailContent.defaultProps = {
  previousRoot: '',
  previousRootText: '',
  parentId: -1,
  title: '',
  writerId: -1,
  writerProfileImage: '',
  writerNickname: '',
  postDate: '',
  likes: null,
  bodyText: '',
  isMine: null,
  isLiked: false,
};

DetailContent.propTypes = {
  previousRoot: PropTypes.string,
  previousRootText: PropTypes.string,
  parentId: PropTypes.number,
  title: PropTypes.string,
  writerId: PropTypes.number,
  writerProfileImage: PropTypes.string,
  writerNickname: PropTypes.string,
  postDate: PropTypes.string,
  likes: PropTypes.number,
  bodyText: PropTypes.string,
  isMine: PropTypes.bool,
  isLiked: PropTypes.bool,
};

export default DetailContent;

const DetailRoot = styled.div`
  font-size: ${theme.font.small};
  color: ${theme.color.main};
  font-weight: bold;
`;

const DetailTitle = styled.div`
  font-size: ${theme.font.xLarge};
  padding: 1rem 0 1.7rem 0;
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

const DetailMain = styled.div`
  border-top: 0.0625rem solid ${theme.color.grey};
  min-height: 12.6rem;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 1rem;
  }

  > div:nth-of-type(1) {
    flex-grow: 1;
    padding: 1.5625rem 0;
    border-bottom: 0.0625rem solid ${theme.color.grey};
  }

  > div:nth-of-type(2) {
    height: auto;
    text-align: right;
  }
`;

const InnerText = styled.div``;
