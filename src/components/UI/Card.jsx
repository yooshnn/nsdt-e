import styled from 'styled-components';

const Div = styled.div`
  padding: 1rem;
  background: #ffffff;
  border-radius: 4px;
`;

const Card = (props) => {
  return <Div>{props.children}</Div>;
};

export default Card;
