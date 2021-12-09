import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from '@hooks';
import { Input, Image, Wrapper } from '@components';
import { useHistory } from 'react-router-dom';
import { getMyInfo } from '@apis/user';

const EditMyInfoPage = () => {
  const history = useHistory();
  const { values, errors, handleChange, handleSubmit, handleImageUpload } =
    useForm({
      initialValues: {},
      onSubmit: requestData => {
        alert(requestData);
      },
      validate: ({ nickname }) => {
        const newErrors = {};
        if (!nickname) newErrors.nickname = '닉네임을 입력해주세요.';
        return newErrors;
      },
    });

  const getInitialData = async () => {
    const response = await getMyInfo();
    alert(response);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <H1>내 정보 수정</H1>
        <ProfileImage src="" alt="미리보기" width="30%" height="30%" />
        <Input
          name="profileImage"
          width="100%"
          height="2.5rem%"
          type="file"
          onChange={handleImageUpload}
        />
        <Label htmlFor="name">이름</Label>
        <Input
          width="100%"
          height="2.5rem"
          type="text"
          id="nickname"
          value={values.userName}
          disabled
        />
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          id="nickname"
          width="100%"
          height="2.5rem"
          name="nickName"
          value={values.nickName}
          onChange={handleChange}
        />
        <ErrorMessage>{errors.nickname}&nbsp;</ErrorMessage>
        <Label htmlFor="introduce">소개글</Label>
        <Input
          type="text"
          width="100%"
          height="2.5rem"
          id="introduce"
          name="profileIntroduce"
          value={values.profileIntroduce}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button type="submit" onClick={handleSubmit}>
            확인
          </Button>
          <Button type="submit" onClick={() => history.push('/')}>
            취소
          </Button>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

export default EditMyInfoPage;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4rem;
`;

const Form = styled.form`
  width: 60%;
  height: 100%;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 40%;
  height: 2.5rem;
  outline: 0;
  border: 0;
  background-color: #041b1d;
  color: #ffffff;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-top: 1rem;

  &:hover {
    background-color: #ffb15c;
    color: #041b1d;
  }
`;

const Label = styled.label`
  border: 0;
  margin-top: 1rem;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
`;
