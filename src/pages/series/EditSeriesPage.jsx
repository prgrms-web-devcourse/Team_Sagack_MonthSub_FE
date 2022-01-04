import React, { useEffect, useState } from 'react';
import { Wrapper, SeriesForm, Loading } from '@components';
import { getSeriesDetail } from '@apis/series';
import { useHistory, useParams } from 'react-router-dom';

const EditSeriesPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [seriesData, setSeriesData] = useState({
    writeId: '',
    title: '',
    introduceText: '',
    introduceSentence: '',
    price: 0,
    subscribeStartDate: '',
    subscribeEndDate: '',
    seriesStartDate: '',
    seriesEndDate: '',
    category: '',
    uploadTime: '',
    articleCount: 0,
    thumbnailFile: '',
    thumbnailUrl: '',
  });

  const getInitialData = async id => {
    const { data } = await getSeriesDetail({
      id,
    });

    if (!data) {
      history.push('/server-error');
    }

    const { series, upload, subscribe, category, writer } = data;
    setSeriesData({
      writeId: writer.id,
      title: series.title,
      introduceText: series.introduceText,
      introduceSentence: series.introduceSentence,
      price: series.price,
      subscribeStartDate: subscribe.startDate,
      subscribeEndDate: subscribe.endDate,
      seriesStartDate: series.startDate,
      seriesEndDate: series.endDate,
      category,
      uploadTime: upload.time,
      articleCount: series.articleCount,
      uploadDate: upload.date,
      thumbnailUrl: series.thumbnail,
    });

    setLoading(false);
  };

  useEffect(() => {
    id && getInitialData(id);
  }, [id]);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <SeriesForm edit param={id} seriesData={seriesData} />
      )}
    </Wrapper>
  );
};

export default EditSeriesPage;
