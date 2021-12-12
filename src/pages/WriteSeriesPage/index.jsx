import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  Wrapper,
  SeriesEditor,
  ImageUpload,
  ConfirmCancleButtons,
  Radio,
  CheckBox,
  Input,
  Period,
} from '@components';
import { useForm } from '@hooks';
import calculateLaterDate from '@utils/calculateLaterDate ';
import jsonBlob from '../../utils/createJsonBlob';
import { postSeries } from '../../apis/series';

const WriteSeriesPage = ({ history }) => {
  const [file, setFile] = useState(null);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
      title: '',
      introduceText: '',
      introduceSentence: '',
      price: '',
      subscribeStartDate: '',
      subscribeEndDate: '',
      seriesStartDate: '',
      seriesEndDate: '',
      category: '',
      uploadTime: '',
      articleCount: '',
    },

    onSubmit: async values => {
      try {
        const requestData = {
          ...values,
          uploadDate: checkedInputs,
          articleCount: Number(values.articleCount),
          price: Number(values.price),
        };

        const formData = new FormData();
        formData.append('thumbnail', file);
        formData.append('request', jsonBlob(requestData));

        const response = await postSeries(formData);
        const { seriesId } = response.data;
        seriesId && history.push(`/series/${seriesId}`);
      } catch (error) {
        alert(error);
      }
    },
    validate: values => {
      const newErrors = {};
      for (const key in values) {
        if (!values[key]) {
          newErrors.empty = `${key}의 값을 입력해주세요!`;
        }
      }
      if (checkedInputs.length === 0) {
        newErrors.day = '요일을 선택해주세요!';
      }
      if (!file) {
        newErrors.file = '이미지를 업로드 해주세요!';
      }
      return newErrors;
    },
  });

  useEffect(() => {
    const isLogin = sessionStorage.getItem('authorization');
    if (!isLogin) {
      alert('로그인이 필요한 서비스 입니다!');
      history.push('/login');
    }
  }, []);

  const handleChangefile = file => {
    file && setFile(file);
  };

  const handleSelectDays = (checked, value) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, value]);
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== value));
    }
  };

  return (
    <StyledWrapper styled={{ padding: '2rem 0' }}>
      <ErrorMessage>{errors.empty}</ErrorMessage>
      <form onSubmit={handleSubmit}>
        <Section>
          <Radio
            names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
            onChange={handleChange}
            checkedButton={values.category}
            title="카테고리"
          />
        </Section>

        <Section>
          <SeriesEditor
            onChange={handleChange}
            value={values}
            title="시리즈 소개"
          />
        </Section>

        <Section>
          <ImageUpload onChange={handleChangefile} title="이미지 업로드" />
          <ErrorMessage>{errors.file}</ErrorMessage>
        </Section>

        <Section>
          <Input
            title="구독료"
            type="number"
            value={values.price}
            name="price"
            onChange={handleChange}
            min={0}
          />
        </Section>

        <Section>
          <Period
            title="모집기간"
            startName="subscribeStartDate"
            startValue={values.subscribeStartDate}
            startMin=""
            endName="subscribeEndDate"
            endValue={values.subscribeEndDate}
            endMin={calculateLaterDate(values.subscribeStartDate, 1)}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Period
            title="연재기간"
            startName="seriesStartDate"
            startValue={values.seriesStartDate}
            startMin={calculateLaterDate(values.subscribeEndDate, 1)}
            endName="seriesEndDate"
            endValue={values.seriesEndDate}
            endMin={calculateLaterDate(values.seriesStartDate, 1)}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Input
            title="연재 시간"
            type="time"
            name="uploadTime"
            value={values.uploadTime}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Input
            title="총 회차"
            type="number"
            name="articleCount"
            value={values.articleCount}
            onChange={handleChange}
            min={1}
          />
        </Section>

        <Section>
          <CheckBox
            title="연재 요일"
            labels={[
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ]}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
          <ErrorMessage>{errors.day}</ErrorMessage>
          <ErrorMessage>{errors.dayLength}</ErrorMessage>
        </Section>

        <ConfirmCancleButtons confirmName="제출" />
      </form>
    </StyledWrapper>
  );
};

WriteSeriesPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default WriteSeriesPage;

const StyledWrapper = styled(Wrapper)`
  padding: 9rem 0 4rem 0;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: #ffb15c;
`;
