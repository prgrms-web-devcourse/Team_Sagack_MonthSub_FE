import React from 'react';
import { Wrapper } from '@templates';
import { SeriesForm } from '@organisms';
import { useHistory } from 'react-router-dom';
import jsonBlob from '@utils/createJsonBlob';
import { postSeries } from '@apis/series';

const WriteSeriesPage = () => {
  const history = useHistory();
  const initialValues = {
    thumbnailFile: '',
    category: '',
    title: '',
    introduceText: '',
    introduceSentence: '',
    subscribeStartDate: '',
    subscribeEndDate: '',
    seriesStartDate: '',
    seriesEndDate: '',
    uploadTime: '',
    uploadDate: [],
    articleCount: '',
    price: '',
    thumbnailUrl: '',
  };

  const handleSubmit = async values => {
    try {
      const postSeriesForm = async values => {
        const postRequest = {
          ...values,
          articleCount: Number(values.articleCount),
          price: Number(values.price),
        };

        const formData = new FormData();
        formData.append('file', values.thumbnailFile);
        formData.append('request', jsonBlob(postRequest));
        const response = await postSeries({
          data: formData,
        });

        const { seriesId } = response.data;
        seriesId && history.push(`/series/${seriesId}`);
      };

      postSeriesForm(values);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrapper>
      <SeriesForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default WriteSeriesPage;
