import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

class ProductCard extends Component {
  handleCurrency = (prices) => {
    const { currency } = this.props;
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

  render() {
    const { product } = this.props;
    return (
      <StyledCard
        to={{
          pathname: `/product/${product?.id}`,
          aboutProps: {
            selectedidds: product,
          },
        }}
      >
        <StyledStockDiv stock={product?.inStock}>
          <img
            src={product.gallery[0]}
            alt={product.name}
            style={{
              width: "18.541666666666668vw",
              height: "35.84305408271474vh",
              objectFit: "contain",
              alignSelf: "center",
              opacity: product?.inStock ? "1.0" : "0.5",
            }}
          />
          <StyledStockSpan>
            {!product?.inStock ? "OUT OF STOCK" : ""}
          </StyledStockSpan>
        </StyledStockDiv>
        <StyledInfo>
          <StyledName stock={product?.inStock}>{product.name}</StyledName>
          <StyledPrice stock={product?.inStock}>
            {this.handleCurrency(product.prices)}
          </StyledPrice>
        </StyledInfo>
      </StyledCard>
    );
  }
}

const StyledStockSpan = styled.span`
  font-weight: 400;
  font-size: 24px;
  line-height: 160%;
  position: relative;
  top: -54%;
  left: 5px;
  color: var(--grey);
`;

const StyledStockDiv = styled.div`
  background-color: ${({ stock }) => (!stock ? "var(--white)" : "transparent")};
  width: 18.541666666666668vw;
  height: 35.84305408271474vh;
  object-fit: contain;
  align-self: center;
`;

const StyledCard = styled(NavLink)`
  width: 20.104166666666668vw;
  height: 47.43vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text-black);
  border: none;
  justify-content: space-around;
  transition: 300ms;
  margin-left: 6.5%;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;

const StyledName = styled.span`
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  opacity: ${({ stock }) => (stock ? "1.0" : "0.5")};
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledPrice = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  opacity: ${({ stock }) => (stock ? "1.0" : "0.5")};
`;
function mapStateToProps(state) {
  const { currency } = state;
  return { currency };
}

export default connect(mapStateToProps, null)(ProductCard);
