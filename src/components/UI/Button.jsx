/// hi

import styled from 'styled-components';

const Wrapper = styled.button`
  background: ${(props) => props.background || '#6a0dad'};
  color: ${(props) => props.color || '#ffffff'};

  border: none;
  border-radius: 4px;

  min-width: ${(props) => props.minWidth || '4rem'};
  width: ${(props) => props.width || '100%'};
  height: 2rem;
  padding: 0 1rem;
  margin: 0.1rem 0;

  text-align: ${(props) => props.textAlign || 'center'};

  transition-duration: 0.15s;

  &:hover {
    color: #000000;
  }

  &:disabled {
    color: ${(props) => props.color || '#ffffff'};
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = (props) => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};

export default Button;
