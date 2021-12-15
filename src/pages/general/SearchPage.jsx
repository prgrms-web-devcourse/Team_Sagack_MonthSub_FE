import React from 'react';
import styled from '@emotion/styled';
import { Container, Input, Button } from '@components';
import { getSearchWithTitle } from '@apis/search';
import { useForm } from '@hooks';

const SearchPage = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      keyword: '',
      check: '',
      searchList: []
    },
    onSubmit: values => {
      if (values.check === 'title')
        const response = getSearchWithTitle({
          title: values.keyword,
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
    <Container>
      <H1>리스트 검색</H1>
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
            value="writer"
            onChange={handleChange}
          />
          작가
        </span>
        <StyledInput
          width="90%"
          name="keyword"
          value={values.keyword}
          onChange={handleChange}
          placeholder="검색어를 입력하세요."
        />
        <StyledButton type="submit">검색</StyledButton>
        <ErrorMessage>{errors.error}&nbsp;</ErrorMessage>
      </SearchForm>
      <SearchResult />
    </Container>
  );
};

export default SearchPage;

const H1 = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0.5rem 0;
`;

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

const SearchResult = styled.div``;
