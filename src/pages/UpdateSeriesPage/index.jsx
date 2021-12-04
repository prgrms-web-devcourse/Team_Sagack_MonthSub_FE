import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Wrapper,
  SeriesEditor,
  Input,
  Upload,
  Button,
  Radio,
} from '@components';
import { useForm } from '@hooks';

const UpdateSeriesPage = () => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
      id: 1,
      thumbnail: 'adf.png',
      title: '일간이슬아',
      introduceText: '안녕안ㄴ연연연연ㅇ녕ㄴ연연',
      introduceSentence: 'ㄴㅇ랑ㄴ라ㅣㅁㅇ나린ㅁ라이날밍라민알밍나림낭ㄹㅇㄴ',
      price: 10000,
      subscribeStartDate: '2021-01-22',
      subscribeEndDate: '2021-02-23',
      seriesStartDate: '2021-03-23',
      seriesEndDate: '2021-04-23',
      articleCount: 10,
      category: 'poem',
      date: ['mon', 'fri'],
      uploadTime: '20:00',
    },
    onSubmit: async () => {
      console.log({ ...values, date: values.date.split(' ') });
    },
    validate: values => {
      const newErrors = {};
      for (const key in values) {
        if (!values[key]) {
          newErrors.empty = '값을 모두 입력해야합니다!';
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

  return (
    <Wrapper>
      <ErrorMessage>{errors.empty}</ErrorMessage>
      <form onSubmit={handleSubmit}>
        <Radio
          names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
          onChange={handleChange}
          disabled
        />
        <SeriesEditor onChange={handleChange} value={values} />
        <Upload name="thumbnail" onChange={handleChange}>
          {file => (
            <button type="button">{file ? file.name : 'Click me'}</button>
          )}
        </Upload>
        <div>
          <h1>구독료</h1>
          <Input
            type="number"
            value={values.price}
            name="price"
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <h1>연재 기간</h1>
          <Input
            type="date"
            value={values.subscribeStartDate}
            name="subscribeStartDate"
            onChange={handleChange}
            disabled
          />
          <Input
            type="date"
            value={values.subscribeEndDate}
            name="subscribeEndDate"
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <h1>연재 기간</h1>
          <Input
            type="date"
            name="seriesStartDate"
            value={values.seriesStartDate}
            onChange={handleChange}
            disabled
          />
          <Input
            type="date"
            name="seriesEndDate"
            value={values.seriesEndDate}
            onChange={handleChange}
            disabled
          />
        </div>
        <Input
          type="time"
          name="uploadTime"
          value={values.uploadTime}
          title="연재시간"
          onChange={handleChange}
          disabled
        />
        <Input
          type="range"
          name="articleCount"
          value={values.articleCount}
          title="총 회차"
          onChange={handleChange}
          disabled
        />
        {values.articleCount}
        <div>
          <h1>연재 요일</h1>
          <Input
            type="checkbox"
            name="date"
            id="mon"
            value={checkedInputs}
            onChange={e => {
              if (checkedInputs[0] === 'mon') e.target.checked === true;
              handleSelectDays(e.target.checked, e.target.id);
              handleChange(e);
            }}
          />
          월
          <Input
            type="checkbox"
            name="date"
            id="tue"
            value={checkedInputs}
            onChange={e => {
              handleSelectDays(e.target.checked, e.target.id);
              handleChange(e);
            }}
          />
          화
          <Input
            type="checkbox"
            name="date"
            id="wen"
            value={checkedInputs}
            onChange={e => {
              handleSelectDays(e.target.checked, e.target.id);
              handleChange(e);
            }}
          />
          수
          <Input
            type="checkbox"
            name="date"
            id="thu"
            value={checkedInputs}
            onChange={e => {
              handleSelectDays(e.target.checked, e.target.id);
              handleChange(e);
            }}
          />
          목
          <Input
            type="checkbox"
            name="date"
            id="fri"
            value={checkedInputs}
            onChange={e => {
              handleSelectDays(e.target.checked, e.target.id);
              handleChange(e);
            }}
          />
          금
          <Input
            type="checkbox"
            name="date"
            id="sat"
            value={checkedInputs}
            onChange={e => {
              handleSelectDays(e.target.checked, e.target.id);
              handleChange(e);
            }}
          />
          토
          <Input
            type="checkbox"
            name="date"
            id="sun"
            value={checkedInputs}
            onChange={e => {
              handleSelectDays(e.target.checked, e.target.id);
              handleChange(e);
            }}
          />
          일
        </div>
        <Button type="submit">제출</Button>
      </form>
    </Wrapper>
  );
};

export default UpdateSeriesPage;

const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: red;
`;
