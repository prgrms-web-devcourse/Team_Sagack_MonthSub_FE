import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  ImageUpload,
  ConfirmCancleButtons,
  Radio,
  CheckBox,
  Input,
  Title,
  List,
} from '@components';
import { useForm } from '@hooks';
import calculateLaterDate from '@utils/calculateLaterDate ';
import getToday from '@utils/getToday';
import jsonBlob from '@utils/createJsonBlob';
import convertSeriesInputName from '@utils/convertSeriesInputName';
import { postSeries } from '@apis/series';
import { useHistory } from 'react-router-dom';
import PeriodInput from './PeriodInput';
import SeriesEditor from './SeriesEditor';

const SeriesCreateForm = () => {
  const history = useHistory();
  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, handleChange, handleSubmit, handleImageUpload } = useForm({
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
      thumbnailFile: '',
      thumbnailUrl: '',
    },

    onSubmit: async values => {
      if (checkedInputs.length === 0) {
        alert('요일을 선택해주세요!');
        return;
      }

      try {
        const request = {
          ...values,
          uploadDate: checkedInputs,
          articleCount: Number(values.articleCount),
          price: Number(values.price),
        };

        const formData = new FormData();
        formData.append('file', values.thumbnailFile);
        formData.append('request', jsonBlob(request));

        const response = await postSeries({
          data: formData,
        });
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
          newErrors.empty = `${convertSeriesInputName(key)}을 입력해주세요!`;
          alert(`${convertSeriesInputName(key)}을 입력해주세요!`);
          break;
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
    <form onSubmit={handleSubmit}>
      <Section>
        <StyledImageUpload
          onChange={handleImageUpload}
          name="thumbnail"
          src={values.thumbnailUrl}
          wide={+true}
        />
      </Section>
      <Section>
        <Radio
          labels={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
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
        <StyledList horizen>
          <PeriodInput
            title="모집기간"
            startName="subscribeStartDate"
            startValue={values.subscribeStartDate}
            startMin={getToday()}
            endName="subscribeEndDate"
            endValue={values.subscribeEndDate}
            endMin={calculateLaterDate(values.subscribeStartDate, 1)}
            onChange={handleChange}
          />
          <PeriodInput
            title="연재기간"
            startName="seriesStartDate"
            startValue={values.seriesStartDate}
            startMin={calculateLaterDate(values.subscribeEndDate, 1)}
            endName="seriesEndDate"
            endValue={values.seriesEndDate}
            endMin={calculateLaterDate(values.seriesStartDate, 1)}
            onChange={handleChange}
          />
        </StyledList>
      </Section>
      <Section>
        <StyledList horizen>
          <div>
            <Title name="연재 시간" />
            <Input
              width="22rem"
              type="time"
              name="uploadTime"
              value={values.uploadTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <Title name="총 회차" />
            <Input
              width="22rem"
              type="number"
              name="articleCount"
              value={values.articleCount}
              onChange={handleChange}
              min={1}
            />
          </div>
        </StyledList>
      </Section>

      <Section>
        <Title name="구독료" />
        <Input
          width="22rem"
          type="number"
          value={values.price}
          name="price"
          onChange={handleChange}
          min={0}
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
      </Section>
      <ConfirmCancleButtons confirmName="제출" />
    </form>
  );
};

export default SeriesCreateForm;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const StyledImageUpload = styled(ImageUpload)`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
`;

const StyledList = styled(List)`
  & > div {
    margin-right: 1.5rem;
  }
`;
