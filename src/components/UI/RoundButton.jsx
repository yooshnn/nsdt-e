import styled from 'styled-components';

const Wrapper = styled.button`
  background: none;
  border: none;
  width: ${(props) => props.size || '3rem'};
  height: ${(props) => props.size || '3rem'};
  transition-duration: 0.15s;
  position: relative;

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 0;
    height: 0;
    border: none;
    border-radius: 50%;
    background: #e1e1e1;

    transition-duration: 0.15s;
  }

  .icon {
    position: relative;
  }

  &:hover .circle {
    top: 50%;
    left: 50%;
    width: ${(props) => props.size || '3rem'};
    height: ${(props) => props.size || '3rem'};
  }
`;

const RoundButton = (props) => {
  return (
    <Wrapper {...props}>
      <div className="circle" />
      {props.children}
    </Wrapper>
  );
};

export default RoundButton;
