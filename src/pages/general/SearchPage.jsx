import React from 'react';
import styled from '@emotion/styled';
import { Container, Input, Button, CardList } from '@components';
import { getSearchWithTitle } from '@apis/search';
import { useForm } from '@hooks';
import { useHistory } from 'react-router-dom';

const SearchPage = () => {
  const history = useHistory();
  const { values, setValues, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      keyword: '',
      check: '',
      seriesList: [],
    },
    onSubmit: async values => {
      const { data } = await getSearchWithTitle({
        check: values.check,
        keyword: values.keyword,
      });

      if (!data) {
        history.push('/server-error');
        return;
      }

      setValues({
        ...values,
        keyword: '',
        seriesList: data.seriesList,
      });
    },
    validate: ({ check, keyword }) => {
      const newErrors = {};
      if (!check) newErrors.error = '검색할 항목을 체크해주세요.';
      else if (!keyword) newErrors.error = '검색어를 입력해주세요.';
      return newErrors;
    },
  });

  return (
    <Container title="리스트 검색">
      <SearchForm onSubmit={handleSubmit}>
        <span>
          <Input
            type="radio"
            name="check"
            value="title"
            onChange={handleChange}
          />
          제목
        </span>
        <span>
          <Input
            type="radio"
            name="check"
            value="nickname"
            onChange={handleChange}
          />
          작가
        </span>
        <StyledInput
          width="90%"
          name="keyword"
          value={values.keyword || ''}
          onChange={handleChange}
          placeholder="검색어를 입력하세요."
        />
        <StyledButton type="submit">검색</StyledButton>
        <ErrorMessage>{errors.error}&nbsp;</ErrorMessage>
      </SearchForm>
      {values.seriesList.length ? (
        <CardList list={values.seriesList} />
      ) : (
        <div>검색결과가 없습니다.</div>
      )}
    </Container>
  );
};

export default SearchPage;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 0.75rem;
`;

const StyledInput = styled(Input)`
  border-bottom: #000000 0.063rem solid;
`;

const SearchForm = styled.form`
  position: relative;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 0;
  border: 0;
`;
