import React from "react";
import styled from "styled-components";

function StyledPrice({ productPrices, currency }) {
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
  return <StyledPriceTag>{handleCurrency(productPrices)}</StyledPriceTag>;
}

const StyledPriceTag = styled.span`
  margin-top: 10px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
`;

export default StyledPrice;
