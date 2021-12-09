import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import {
  Wrapper,
  SeriesEditor,
  Input,
  Upload,
  ConfirmCancleButtons,
  Radio,
  CheckBox,
} from '@components';
import { useForm } from '@hooks';
import calculateLaterDate from '@utils/calculateLaterDate ';
import { POST } from '../../apis/axios';

const WriteSeriesPage = () => {
  const history = useHistory();
  const [file, setFile] = useState();
  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
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
    },
    onSubmit: async values => {
      const request = {
        ...values,
        nickname: 'yoon',
        uploadDate: checkedInputs,
        articleCount: Number(values.articleCount),
        price: Number(values.price),
      };

      function jsonBlob(obj) {
        return new Blob([JSON.stringify(obj)], {
          type: 'application/json',
        });
      }

      const formData = new FormData();
      formData.append('thumbnail', file);
      formData.append('request', jsonBlob(request));

      const response = await POST({
        url: '/series',
        isAuth: true,
        data: formData,
      });

      const { seriesId } = response.data.data;
      history.push(`/series/${seriesId}`);
    },
    validate: values => {
      const newErrors = {};
      for (const key in values) {
        if (!values[key]) {
          newErrors.empty = `${key}의 값을 입력해주세요!`;
        } else if (!file) {
          newErrors.thumbnail = '이미지를 업로드해주세요!';
        } else if (checkedInputs.length === 0) {
          newErrors.day = '요일을 선택해주세요!';
        }
      }
      return newErrors;
    },
  });

  const handleSelectDays = (checked, value) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, value]);
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== value));
    }
  };

  const handleChangefile = file => {
    file && setFile(file);
  };

  return (
    <Wrapper>
      <ErrorMessage>{errors.empty}</ErrorMessage>
      <form onSubmit={handleSubmit}>
        <Radio
          names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
          onChange={handleChange}
          checkedButton={values.category}
          title="카테고리"
        />
        <SeriesEditor onChange={handleChange} value={values} />
        <StyledSection>
          <Title>이미지 업로드</Title>
          <StyledUpload
            name="thumbnail"
            onChange={handleChangefile}
            isFile={!!file}
          >
            <button type="button">File Select</button>
            <span>{file ? file.name : ''}</span>
          </StyledUpload>
          <ErrorMessage>{errors.thumbnail}</ErrorMessage>
        </StyledSection>
        <StyledSection>
          <Title>구독료</Title>
          <StyledInput
            type="number"
            value={values.price}
            name="price"
            onChange={handleChange}
            min={0}
          />
        </StyledSection>
        <StyledSection>
          <Title> 모집 기간</Title>
          <StyledInput
            type="date"
            value={values.subscribeStartDate}
            name="subscribeStartDate"
            onChange={handleChange}
          />
          <Line>-</Line>
          <StyledInput
            type="date"
            value={values.subscribeEndDate}
            name="subscribeEndDate"
            onChange={handleChange}
            disabled={!values.subscribeStartDate}
            min={calculateLaterDate(values.subscribeStartDate, 1)}
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 기간</Title>
          <StyledInput
            type="date"
            name="seriesStartDate"
            value={values.seriesStartDate}
            onChange={handleChange}
            disabled={!values.subscribeEndDate}
            min={calculateLaterDate(values.subscribeEndDate, 1)}
          />
          <Line>-</Line>
          <StyledInput
            type="date"
            name="seriesEndDate"
            value={values.seriesEndDate}
            onChange={handleChange}
            disabled={!values.seriesStartDate}
            min={calculateLaterDate(values.seriesStartDate, 1)}
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 시간</Title>
          <StyledInput
            type="time"
            name="uploadTime"
            value={values.uploadTime}
            onChange={handleChange}
          />
        </StyledSection>
        <StyledSection>
          <Title>총 회차 </Title>
          <StyledInput
            type="number"
            name="articleCount"
            value={values.articleCount}
            onChange={handleChange}
            min={1}
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 요일</Title>
          <CheckBox
            labels={['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun']}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
          <ErrorMessage>{errors.day}</ErrorMessage>
        </StyledSection>
        <ConfirmCancleButtons confirmName="제출" />
      </form>
    </Wrapper>
  );
};

export default WriteSeriesPage;

const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: #ffb15c;
`;

const Line = styled.span`
  padding: 0 0.3rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-weight: 700;
`;

const StyledInput = styled(Input)`
  margin-top: 0;
`;

const StyledSection = styled.section`
  margin-bottom: 3rem;
`;

const StyledUpload = styled(Upload)`
  display: flex;
  align-items: center;
  button {
    width: 6.25rem;
    padding: 0.3rem;
    cursor: pointer;
    user-select: none;
    border-radius: 50px;
    border: none;
    margin-right: 0.5rem;
    color: ${({ isFile }) => (isFile ? '#ffb15c' : '#4b4b4b')};
    box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
      0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
    background-color: #fff;
    text-align: center;
    &:hover {
      color: #ffb15c;
    }
  }
`;
