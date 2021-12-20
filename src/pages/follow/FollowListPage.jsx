import React, { useState, useEffect, useRef } from 'react';
import { getFollowList } from '@apis/follow';
import { Wrapper, UserProfile } from '@components';
import { useParams } from 'react-router-dom';

const initialValues = [
  {
    writerId: 0,
    followCount: 0,
    nickname: '',
    profileKey: '',
    profileIntroduce: '',
  },
];

const FollowListPage = () => {
  let params = useRef();
  const { id } = useParams(); // writerId 받아와야함!
  const [target, setTarget] = useState(null); // observer가 인지할 값
  const [values, setValues] = useState(initialValues);

  const getData = async () => {
    params = {
      ...(id && { userId: id }),
      lastId: null,
      size: 10,
    };

    const { data } = await getFollowList({ params });
    setValues(data.writerLikesList);
    console.log(data.writerLikesList);

    setTarget;
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            // api 호출!
            console.log('intersectiono : ', id);
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
        <UserProfile src={element.profileKey} nickname={element.nickname} />
      ))}
      <div ref={setTarget} />
    </Wrapper>
  );
};

export default FollowListPage;

// const Div = styled.div`
//   height: 50vh;
//   border: #000000 1px solid;
// `;
