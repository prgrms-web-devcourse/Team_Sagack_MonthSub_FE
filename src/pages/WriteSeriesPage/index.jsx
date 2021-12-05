import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Wrapper,
  SeriesEditor,
  Input,
  Upload,
  Button,
  Radio,
  CheckBox,
} from '@components';
import { useForm } from '@hooks';
import axios from 'axios';

const WriteSeriesPage = () => {
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

      const formData = new FormData();
      formData.append('thumbnail', file);
      formData.append('request', JSON.stringify(request));

      try {
        for (const value of formData.values()) {
          console.log(value);
        }
        const response = await axios({
          method: 'post',
          url: `http://52.79.51.188:8080/series/users/4`,
          headers: {
            Authorization: '',
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });
        if (response.status >= 400) {
          throw new Error('API 호출에 실패 했습니다.');
        }
        console.log(response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    },
    validate: request => {
      const newErrors = {};
      for (const key in request) {
        if (!request[key]) {
          newErrors.empty = `${key}의 값을 입력해주세요!`;
        } else if (!file) {
          newErrors.thumbnail = '이미지를 업로드해주세요!';
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

  const createLaterDate = (currentDate, n) => {
    const arr = currentDate.split('-');
    const laterDate = new Date(
      Number(arr[0]),
      Number(arr[1]) - 1,
      Number(arr[2]),
    );
    laterDate.setDate(laterDate.getDate() + n);
    const year = laterDate.getFullYear();
    const month = laterDate.getMonth() + 1;
    const date = laterDate.getDate();
    return `${year}-${month >= 10 ? month : `0${month}`}-${
      date >= 10 ? date : `0${date}`
    }`;
  };

  return (
    <Wrapper>
      <ErrorMessage>{errors.empty}</ErrorMessage>
      <ErrorMessage>{errors.thumbnail}</ErrorMessage>
      <form onSubmit={handleSubmit}>
        <Radio
          names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
          onChange={handleChange}
        />
        <SeriesEditor onChange={handleChange} value={values} />
        <Upload name="thumbnail" onChange={handleChangefile}>
          <button type="button">Click me</button>
        </Upload>
        <div>
          <h1>구독료</h1>
          <Input
            type="number"
            value={values.price}
            name="price"
            onChange={handleChange}
            min={0}
          />
        </div>
        <div>
          <h1> 모집 기간</h1>
          <Input
            type="date"
            value={values.subscribeStartDate}
            name="subscribeStartDate"
            onChange={handleChange}
          />
          <Input
            type="date"
            value={values.subscribeEndDate}
            name="subscribeEndDate"
            onChange={handleChange}
            disabled={!values.subscribeStartDate}
            min={createLaterDate(values.subscribeStartDate, 1)}
          />
        </div>
        <div>
          <h1>연재 기간</h1>
          <Input
            type="date"
            name="seriesStartDate"
            value={values.seriesStartDate}
            onChange={handleChange}
            disabled={!values.subscribeEndDate}
            min={createLaterDate(values.subscribeEndDate, 1)}
          />
          <Input
            type="date"
            name="seriesEndDate"
            value={values.seriesEndDate}
            onChange={handleChange}
            disabled={!values.seriesStartDate}
            min={createLaterDate(values.seriesStartDate, 1)}
          />
        </div>
        <Input
          type="time"
          name="uploadTime"
          value={values.uploadTime}
          title="연재시간"
          onChange={handleChange}
        />
        <Input
          type="range"
          name="articleCount"
          value={values.articleCount}
          title="총 회차"
          onChange={handleChange}
          min={1}
          max={100}
        />
        {values.articleCount}
        <div>
          <h1>연재 요일</h1>
          <CheckBox
            labels={['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun']}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
        </div>
        <Button type="submit">제출</Button>
      </form>
    </Wrapper>
  );
};

export default WriteSeriesPage;

const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: red;
`;
