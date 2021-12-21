import React, { useState, useEffect, useRef } from 'react';
import { getFollowList } from '@apis/follow';
import { Wrapper, FollowListItem } from '@components';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useParams, useHistory } from 'react-router-dom';

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
        lastId: lastId.current,
        size: 10,
      },
    });
    if (!data) {
      history.push('/server-error');
      return;
    }

    setValues(prev => [...prev, ...data.writerLikesList]);

    lastId.current =
      data.writerLikesList[data.writerLikesList.length - 1].writerId;
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
    <Wrapper whole>
      <FollowListContainer>
        {values.map(element => (
          <FollowListItem
            key={element.writerId}
            src={element.profileImage}
            nickname={element.nickname}
            intro={element.profileIntroduce}
            followCount={element.followCount}
            writerId={element.writerId}
          />
        ))}
      </FollowListContainer>
      <div ref={setTarget} />
    </Wrapper>
  );
};

export default FollowListPage;

const FollowListContainer = styled.div`
  background-color: #ffffff;
  width: 80%;
  height: 90%;
  border-radius: 20px;
  margin: 0 auto;
  overflow-y: scroll;
  box-shadow: ${theme.style.boxShadow};
`;
