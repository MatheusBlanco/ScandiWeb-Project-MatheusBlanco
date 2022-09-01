import React from "react";
import styled from "styled-components";

function StyledPrice({ productPrices, currency, popUp }) {
  const handleCurrency = (prices) => {
    const foundCurrency = prices?.find(
      (price) =>
        price?.currency.symbol === currency ||
        price?.currency.symbol === currency?.value
    );
    return (
      <span>
        {foundCurrency?.currency?.symbol} {foundCurrency?.amount}
      </span>
    );
  };
  return (
    <StyledPriceTag popUp={popUp}>
      {handleCurrency(productPrices)}
    </StyledPriceTag>
  );
}

const StyledPriceTag = styled.span`
  margin-top: 10px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: ${({ popUp }) => (popUp ? "500" : "700")};
  font-size: ${({ popUp }) => (popUp ? "16px" : "24px")};
  line-height: 18px;
`;

export default StyledPrice;
