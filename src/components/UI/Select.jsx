import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.select`
  width: ${(props) => props.width || '100%'};
  height: 2rem;
  margin-right: 0.2rem;
`;

const Select = (props) => {
  /*
  컴포넌트의 역할: ordered list와 pointer가 있을 때, pointer의 위치를 설정

  labels: 드롭다운에 표시될 label들
  index: 선택된 item의 index
  onChange: index를 변경하는 함수
  */

  return (
    <Wrapper {...props} value={props.index} onChange={props.onChange}>
      <option disabled value="-1">
        {props.placeholder ? props.placeholder : '선택한 값이 없습니다'}
      </option>
      {props.labels.map((e, i) => {
        return (
          <option value={i} key={i}>
            {e}
          </option>
        );
      })}
    </Wrapper>
  );
};

export default Select;
