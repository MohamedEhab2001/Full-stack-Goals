import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import styled from "styled-components";

const Container = styled.div`
width:100%
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const ErrorIcon = styled.p`
  font-size: 70px;
  color: red;
`;
const ErrorMessage = styled.h1`
  font-size: 50px;
  color: red;
`;
const Error = ({ msg }) => {
  return (
    <Container>
      <ErrorIcon>
        <BiErrorCircle />
      </ErrorIcon>
      <ErrorMessage>{msg}</ErrorMessage>
    </Container>
  );
};

export default Error;
