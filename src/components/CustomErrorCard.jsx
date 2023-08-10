import React from "react";
import styled from "styled-components";

const ErrorCardContainer = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorTitle = styled.h3`
  margin: 0;
  color: #721c24;
`;

const ErrorMessage = styled.p`
  margin: 8px 0;
  color: #721c24;
`;

const CustomErrorCard = ({ title, message }) => {
  return (
    <ErrorCardContainer>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorCardContainer>
  );
};

export default CustomErrorCard;
