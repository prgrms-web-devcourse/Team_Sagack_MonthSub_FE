import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
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
import createEmptyValueMessage from '@utils/createEmptyValueMessage';
import { postSeries, putSeries } from '@apis/series';
import { useHistory } from 'react-router-dom';
import PeriodInput from './PeriodInput';
import SeriesEditor from './SeriesEditor';

const SeriesForm = ({ edit, param, seriesData, ...props }) => {
  const history = useHistory();
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
        uploadDate: [],
        thumbnailUrl: '',
      },

      onSubmit: async values => {
        try {
          const postSeriesForm = async values => {
            const postRequest = {
              ...values,
              uploadDate: values.uploadDate,
              articleCount: Number(values.articleCount),
              price: Number(values.price),
            };
            const putRequest = {
              writeId: values.writeId,
              title: values.title,
              introduceText: values.introduceText,
              introduceSentence: values.introduceSentence,
              uploadDate: values.uploadDate,
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
          if (!values[key] || values[key].length === 0) {
            newErrors.empty = createEmptyValueMessage(key);
            alert(newErrors.empty);

            break;
          }
        }

        if (edit && seriesData.uploadDate.length !== values.uploadDate.length) {
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
            disabled={edit}
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
            disabled={edit}
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
              disabled={edit}
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
          disabled={edit}
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
          checkedInputs={values.uploadDate}
          onChange={handleChange}
        />
      </Section>
      <ConfirmCancleButtons confirmName="제출" />
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

const StyledImageUpload = styled(ImageUpload)`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
`;

const StyledList = styled(List)`
  & > div {
    margin-right: 1.5rem;
  }
`;
