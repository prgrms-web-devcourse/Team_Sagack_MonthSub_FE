import React, { useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { theme, mixin } from '@styles';

/*
 primaryKey: 한 페이지 내에서 두 번 이상의 호출 시 정상적인 작동을 위해
  id를 구분 할 필요가 있다.
  ex) 1페이지의 1카테고리 리스트(6개): id = checkedBtn1-1~6
  ex) 1페이지의 2카테고리 리스트(3개): id = checkedBtn2-1~3
 */
const CheckedButtonList = ({
  list,
  type,
  primaryKey,
  useReverse,
  onChange,
  reverseIndex,
  unDefaultChecked,
  frameOnly,
  ...props
}) => {
  const checkedRef = useRef([]);
  const checkedCount = useRef(0);
  const formRef = useRef();

  // 반전 기능은 다중 선택일 때만 필요하므로 type이 radio일 땐 사용되지 않는다.
  const reverseChecked = e => {
    const { value, checked } = e.target;

    if (value === list[reverseIndex].value) {
      checkedCount.current = 0;

      for (let i = 0; i < checkedRef.current.length; i += 1) {
        if (i === reverseIndex) {
          checkedRef.current[i].checked = true;
          checkedRef.current[i].disabled = true;
        } else {
          checkedRef.current[i].checked = false;
        }
      }
    } else if (value !== list[reverseIndex].value) {
      if (checked) {
        if (checkedCount.current === 0) {
          checkedRef.current[reverseIndex].checked = false;
          checkedRef.current[reverseIndex].disabled = false;
        }

        checkedCount.current += 1;
      } else {
        checkedCount.current -= 1;

        if (checkedCount.current === 0) {
          checkedRef.current[reverseIndex].checked = true;
          checkedRef.current[reverseIndex].disabled = true;
        }
      }
    }
  };

  return (
    <StyledForm
      onChange={e => {
        onChange(e);
        type === 'checkbox' && useReverse ? reverseChecked(e) : null;
      }}
      ref={formRef.current}
      {...props}
    >
      {list.map((data, index) => (
        <StyledSpan
          key={data.text}
          primaryKey={primaryKey}
          length={list.length}
          frameOnly={frameOnly}
        >
          <input
            type={type}
            name={`checkedBtns${primaryKey}`}
            id={`checkedBtn${primaryKey}-${index}`}
            value={data.value}
            ref={el => {
              checkedRef.current[index] = el;
            }}
            {...(useReverse && !unDefaultChecked && index === reverseIndex
              ? type === 'checkbox'
                ? { disabled: true, defaultChecked: true }
                : { defaultChecked: true }
              : null)}
          />
          <label
            htmlFor={`checkedBtn${primaryKey}-${index}`}
            className={`styledTag${primaryKey}-${index}`}
          >
            {data.text}
          </label>
        </StyledSpan>
      ))}
    </StyledForm>
  );
};

CheckedButtonList.defaultProps = {
  list: [],
  type: 'checkbox',
  primaryKey: 0,
  useReverse: true,
  reverseIndex: 0,
  unDefaultChecked: false,
  frameOnly: false,
  onChange: () => {},
};

CheckedButtonList.propTypes = {
  list: PropTypes.array,
  type: PropTypes.string,
  primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  useReverse: PropTypes.bool,
  reverseIndex: PropTypes.number,
  unDefaultChecked: PropTypes.bool,
  frameOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckedButtonList;

const setCheckedStyle = (primaryKey, length) => {
  let styles = '';

  for (let i = 0; i < length; i += 1) {
    styles += `#checkedBtn${primaryKey}-${i}:checked ~ .styledTag${primaryKey}-${i} {
      background-color: ${theme.color.sub};
      color: #ffffff;
    }`;
  }

  return styles;
};

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  ${mixin.invisibleScrollBar}
`;

const StyledSpan = styled.span`
  ${({ frameOnly, primaryKey, length }) =>
    frameOnly
      ? `
      margin: 0.625rem;
      margin-left: 0;
      display: flex;
      align-items: center;
      > input {
        width: 1.25rem;
        height: 1.25rem;
      }
      > label {
        margin-left: 0.1875rem;
      }
      `
      : `
      height: 2.5rem;
      margin: 1rem;
      margin-top: 0;
      margin-left: 0;

      > label {
        border-radius: 2.5rem;
        background-color: #ffffff;
        box-shadow: ${theme.style.boxShadow};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 1.25rem;
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
      }

      > input {
        display: none;
      }
      ${setCheckedStyle(primaryKey, length)}
  `}
`;
