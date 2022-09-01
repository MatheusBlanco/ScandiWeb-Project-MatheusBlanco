import React from "react";
import styled from "styled-components";

function StyledProductName({ product, popUp }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <StyledBrand popUp={popUp}>{product?.brand}</StyledBrand>
      {popUp ? (
        <StyledNameSpan popUp={popUp}>{product?.name} </StyledNameSpan>
      ) : (
        <StyledNameP popUp={popUp}>{product?.name}</StyledNameP>
      )}
    </div>
  );
}
const StyledNameSpan = styled.span`
  font-weight: ${({ popUp }) => (popUp ? "300" : "400")};
  font-size: ${({ popUp }) => (popUp ? "16px" : "30px")};
  font-family: "Raleway";
  text-align: justify;
  line-height: ${({ popUp }) => (popUp ? "160%" : "27px")};
  margin-bottom: 10px;
`;

const StyledNameP = styled.p`
  font-weight: ${({ popUp }) => (popUp ? "300" : "400")};
  font-size: ${({ popUp }) => (popUp ? "16px" : "30px")};
  font-family: "Raleway";
  text-align: justify;
  line-height: ${({ popUp }) => (popUp ? "160%" : "27px")};
`;

const StyledBrand = styled.span`
  font-weight: ${({ popUp }) => (popUp ? "300" : "600")};
  font-family: "Raleway";
  font-size: ${({ popUp }) => (popUp ? "16px" : "30px")};
  line-height: ${({ popUp }) => (popUp ? "160%" : "27px")};
`;

export default StyledProductName;
