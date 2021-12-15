import React from 'react';
import styled from '@emotion/styled';
import { Container, Icons, Input, IconWrapper } from '@components';
import { useForm } from '@hooks';

const SearchPage = () => {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      keyword: '',
    },
    onSubmit: () => {},
    validate: () => {},
  });

  return (
    <Container>
      <H1>검색</H1>
      <SearchForm onSubmit={handleSubmit}>
        <StyledIconWrapper>
          <Icons.Search />
        </StyledIconWrapper>
        <StyledInput
          width="100%"
          name="keyword"
          value={values.keyword}
          onChange={handleChange}
          placeholder="검색어를 입력하세요."
        />
      </SearchForm>
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

const StyledInput = styled(Input)`
  border-bottom: #000000 0.063rem solid;
`;

const SearchForm = styled.div`
  position: relative;
`;

const StyledIconWrapper = styled(IconWrapper)`
  position: absolute;
  right: 0;
`;
