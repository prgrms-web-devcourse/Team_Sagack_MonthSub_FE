import React, { useEffect, useState } from 'react';
import { Wrapper, SeriesDetail } from '@components';
import { useParams } from 'react-router-dom';
import { getSeriesDetail } from '@apis/series';

const initialDate = {
  series: {
    id: 0,
    thumbnail: '',
    title: '',
    introduceText: '',
    introduceSentence: '',
    price: 0,
    startDate: '',
    endDate: '',
    articleCount: 0,
    likes: 0,
  },
  upload: {
    date: [],
    time: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
  },
  subscribe: {
    startDate: '',
    endDate: '',
    status: '',
  },
  category: '',
  writer: {
    id: 0,
    userId: 0,
    followCount: 0,
    email: '',
    profileImage: '',
    profileIntroduce: '',
    nickname: '',
  },
  articleList: [
    {
      articleId: 0,
      title: '',
      round: 0,
      date: '',
    },
  ],
};

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(initialDate);

  const getInitialData = async () => {
    const { data } = await getSeriesDetail({ id });
    setDetails(data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return <Wrapper>{details && <SeriesDetail detail={details} />}</Wrapper>;
};

export default SeriesDetailPage;
