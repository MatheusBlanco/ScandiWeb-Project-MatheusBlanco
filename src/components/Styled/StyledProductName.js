import React from "react";
import styled from "styled-components";

function StyledProductName({ product }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <StyledBrand>{product?.brand}</StyledBrand>
      <StyledName>{product?.name}</StyledName>
    </div>
  );
}

const StyledName = styled.p`
  font-weight: 400;
  font-size: 30px;
  font-family: "Raleway";
  text-align: justify;
  line-height: 27px;
`;

const StyledBrand = styled.span`
  font-weight: 600;
  font-family: "Raleway";
  font-size: 30px;
  line-height: 27px;
`;

export default StyledProductName;
