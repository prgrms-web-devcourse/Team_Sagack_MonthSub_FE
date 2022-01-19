import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, Title } from '@atom';
import { ImageUpload, ConfirmButtons } from '@mocules';
import { Flex } from '@templates';
import theme from '@styles/theme';
import { useForm } from '@hooks';
import calculateLaterDate from '@utils/calculateLaterDate ';
import getToday from '@utils/getToday';
import jsonBlob from '@utils/createJsonBlob';
import createEmptyValueMessage from '@utils/createEmptyValueMessage';
import { postSeries, putSeries } from '@apis/series';
import { useHistory } from 'react-router-dom';
import PeriodInput from './PeriodInput';
import SeriesEditor from './SeriesEditor';
import RadioButton from './RadioButton';
import CheckBox from './CheckBox';

const SeriesForm = ({ edit, param, seriesData, ...props }) => {
  const history = useHistory();
  const [dayValues, setDayValues] = useState([]);
  const { values, setValues, handleChange, handleSubmit, handleImageUpload } =
    useForm({
      initialValues: {
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
        articleCount: '',
        price: '',
        thumbnailUrl: '',
      },

      onSubmit: async values => {
        try {
          const postSeriesForm = async values => {
            const postRequest = {
              ...values,
              uploadDate: dayValues,
              articleCount: Number(values.articleCount),
              price: Number(values.price),
            };
            const putRequest = {
              writeId: values.writeId,
              title: values.title,
              introduceText: values.introduceText,
              introduceSentence: values.introduceSentence,
              uploadDate: dayValues,
              uploadTime: values.uploadTime,
            };

            const formData = new FormData();
            formData.append('file', values.thumbnailFile);
            formData.append(
              'request',
              jsonBlob(edit ? putRequest : postRequest),
            );
            const response = edit
              ? await putSeries({
                  id: param,
                  data: formData,
                })
              : await postSeries({
                  data: formData,
                });

            const { seriesId } = response.data;
            seriesId && history.push(`/series/${seriesId}`);
          };

          postSeriesForm(values);
        } catch (error) {
          alert(error);
        }
      },
      validate: values => {
        const newErrors = {};

        for (const key in values) {
          if (!values[key]) {
            if (edit && key === 'thumbnailFile') {
              return;
            }
            newErrors.empty = createEmptyValueMessage(key);
            alert(newErrors.empty);

            break;
          }
        }

        if (dayValues.length === 0) {
          newErrors.dayLength = '요일을 선택해주세요!';
          alert(newErrors.dayLength);
        }
        if (edit && seriesData.uploadDate.length !== dayValues.length) {
          newErrors.dayLength = '요일 수가 일치하지 않습니다!';
          alert(newErrors.dayLength);
        }

        return newErrors;
      },
    });

  useEffect(() => {
    if (edit) {
      setValues(seriesData);
    }
  }, [seriesData, edit]);

  return (
    <form onSubmit={handleSubmit} {...props}>
      <ImageUpload
        onChange={handleImageUpload}
        name="thumbnail"
        src={values.thumbnailUrl}
        wide={+true}
      />

      <Section>
        <Title size="medium">카테고리</Title>
        <RadioButton
          name="category"
          labels={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
          onChange={handleChange}
          checkedItem={values.category}
          disabled={edit}
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
        <StyledFlex horizen justifyContent="space-between">
          <div>
            <Title size="medium">모집 기간</Title>
            <PeriodInput
              startName="subscribeStartDate"
              startValue={values.subscribeStartDate}
              startMin={getToday()}
              endName="subscribeEndDate"
              endValue={values.subscribeEndDate}
              endMin={calculateLaterDate(values.subscribeStartDate, 1)}
              onChange={handleChange}
              disabled={edit}
            />
          </div>
          <div>
            <Title size="medium">연재 기간</Title>
            <PeriodInput
              startName="seriesStartDate"
              startValue={values.seriesStartDate}
              startMin={calculateLaterDate(values.subscribeEndDate, 1)}
              endName="seriesEndDate"
              endValue={values.seriesEndDate}
              endMin={calculateLaterDate(values.seriesStartDate, 1)}
              onChange={handleChange}
              disabled={edit}
            />
          </div>
        </StyledFlex>
      </Section>
      <Section>
        <StyledFlex horizen justifyContent="space-between">
          <div>
            <Title size="medium">연재 시간</Title>
            <Input
              width="100%"
              type="time"
              name="uploadTime"
              value={values.uploadTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <Title size="medium">총 회차</Title>
            <Input
              width="100%"
              type="number"
              name="articleCount"
              value={values.articleCount}
              onChange={handleChange}
              min={1}
              disabled={edit}
            />
          </div>
        </StyledFlex>
      </Section>

      <Section>
        <StyledFlex horizen>
          <div>
            <Title size="medium">구독료</Title>
            <PayInput
              width="50%"
              type="number"
              value={values.price}
              name="price"
              onChange={handleChange}
              min={0}
              disabled={edit}
            />
          </div>
        </StyledFlex>
      </Section>

      <Section>
        <Title size="medium">연재 요일</Title>
        <CheckBox
          initialData={seriesData.uploadDate || []}
          dataList={[
            { id: 1, value: 'monday' },
            { id: 2, value: 'tuesday' },
            { id: 3, value: 'wednesday' },
            { id: 4, value: 'thursday' },
            { id: 5, value: 'friday' },
            { id: 6, value: 'saturday' },
            { id: 7, value: 'sunday' },
          ]}
          onChange={checkedList => setDayValues(checkedList)}
        />
      </Section>
      <ConfirmButtons confirmName="제출" />
    </form>
  );
};

SeriesForm.defaultProps = {
  edit: false,
  seriesData: {},
  param: '',
};

SeriesForm.propTypes = {
  edit: PropTypes.bool,
  seriesData: PropTypes.object,
  param: PropTypes.string,
};

export default SeriesForm;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const StyledFlex = styled(Flex)`
  & > div {
    width: 100%;
  }
  @media ${theme.device.mobileS} {
    flex-direction: column;
    align-items: flex-start;
  }

  & > div:first-of-type {
    margin-right: 4rem;
    @media ${theme.device.mobileS} {
      margin-right: 0;
      margin-bottom: 3rem;
    }
  }
`;

const PayInput = styled(Input)`
  @media ${theme.device.mobileS} {
    width: 100%;
  }
`;
