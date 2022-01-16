import React, { useState, useEffect, useRef } from 'react';
import { getFollowList } from '@apis/follow';
import { Wrapper, FollowListItem, NoData } from '@components';
import { useParams, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@styles/theme';

const FollowListPage = () => {
  const history = useHistory();
  const lastId = useRef(null);
  const { id } = useParams();
  const [target, setTarget] = useState(null);
  const [values, setValues] = useState([]);

  const getData = async () => {
    const { data } = await getFollowList({
      params: {
        ...(id && { userId: id }),
        writerLikesLastId: lastId.current,
        size: 10,
      },
    });
    if (!data) {
      history.push('/server-error');
      return;
    }

    setValues(prev => [...prev, ...data.writerLikesList]);

    if (data.writerLikesList.length) {
      lastId.current =
        data.writerLikesList[data.writerLikesList.length - 1].writerLikesId;
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            getData();
          }
        },
        {
          threshold: 1,
        },
      );
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <Wrapper>
      <FollowListContainer>
        {values.length ? (
          values.map(element => (
            <FollowListItem
              key={element.writerId}
              src={element.profileImage}
              nickname={element.nickname}
              intro={element.profileIntroduce}
              followCount={element.followCount}
              writerId={element.writerId}
            />
          ))
        ) : (
          <NoData height="50vh">팔로우 유저 데이터가 존재하지 않습니다.</NoData>
        )}
      </FollowListContainer>
      <div ref={setTarget} />
    </Wrapper>
  );
};

export default FollowListPage;

const FollowListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 90%;
  min-height: 50vh;
  border-radius: 20px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: ${theme.style.boxShadow};
`;
