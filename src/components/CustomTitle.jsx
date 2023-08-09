import React from 'react'
import { styled } from 'styled-components'

const StyledH2 = styled.h2`
  color: black;
`;


const CustomTitle = ({title}) => {
  return <StyledH2>{title}</StyledH2>;
}

export default CustomTitle