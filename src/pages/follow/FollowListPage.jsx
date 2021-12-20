import React, { useState, useEffect, useRef } from 'react';
import { getFollowList } from '@apis/follow';
import { Wrapper, UserProfile } from '@components';
import { useParams } from 'react-router-dom';

const FollowListPage = () => {
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
    <Wrapper>
      {values.map(element => (
        <UserProfile
          src={element.profileKey}
          nickname={element.nickname}
          key={element.writerId}
        />
      ))}
      <div ref={setTarget} />
    </Wrapper>
  );
};

export default FollowListPage;
