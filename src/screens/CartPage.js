/* eslint-disable no-unsafe-optional-chaining */
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import StyledColorAttribute from "../components/Styled/StyledColorAttribute";
import StyledMainDiv from "../components/Styled/StyledMainDiv";
import StyledPrice from "../components/Styled/StyledPrice";
import StyledProductName from "../components/Styled/StyledProductName";
import StyledTextAttribute from "../components/Styled/StyledTextAttribute";
import StyledTitle from "../components/Styled/StyledTitle";
import StyledImageCart from "../components/Styled/StyledImageCart";
import Plus from "../assets/icons/Plus.svg";
import Minus from "../assets/icons/Minus.svg";

class CartPage extends Component {
  render() {
    const { cart, currency } = this.props;

    const handleItemAmount = (item) => {
      console.log(item);
    };

    const renderAttributes = (item) => {
      return (
        <div>
          {item?.selectedAttributes.length
            ? item?.attributes?.map((attribute) => {
                return (
                  <StyledAttribute key={attribute?.id}>
                    <StyledId className="roboto">
                      {attribute?.id.toUpperCase()}:
                    </StyledId>
                    <StyledItemRow>
                      {attribute?.items.map((attributeitem, index) =>
                        attribute?.type === "text" ? (
                          <StyledTextAttribute
                            index={index}
                            key={index}
                            item={attributeitem}
                            attribute={attribute}
                            noHover
                            selectedAttributes={item?.selectedAttributes}
                          />
                        ) : (
                          <StyledColorAttribute
                            index={index}
                            item={attributeitem}
                            key={index}
                            attribute={attribute}
                            noHover
                            selectedAttributes={item?.selectedAttributes}
                            style={{ backgroundColor: item?.value }}
                          />
                        )
                      )}
                    </StyledItemRow>
                  </StyledAttribute>
                );
              })
            : null}
        </div>
      );
    };

    const renderAmount = (item) => {
      return (
        <StyledAmountHandle>
          <StyledAmountButton
            type="button"
            onClick={() => handleItemAmount(item)}
          >
            <img src={Plus} alt="plus" />
          </StyledAmountButton>
          <StyledAmount>{item?.amount}</StyledAmount>
          <StyledAmountButton type="button">
            <img src={Minus} alt="plus" />
          </StyledAmountButton>
        </StyledAmountHandle>
      );
    };

    return (
      <StyledMainDiv>
        <StyledTitle weight="bold" child="Cart" />
        {cart?.items.length ? (
          <StyledScrollingItems>
            {cart?.items?.map((item, index) => {
              return (
                <>
                  <StyledSeparator index={index} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "99.5%",
                    }}
                  >
                    <StyledCartItems>
                      <StyledProductName product={item} />
                      <div style={{ marginBottom: 20 }}>
                        <StyledPrice
                          productPrices={item?.prices}
                          currency={currency}
                        />
                      </div>
                      <div>{renderAttributes(item)}</div>
                    </StyledCartItems>
                    <StyledCartImageAndAmount>
                      {renderAmount(item)}
                      <StyledImageCart item={item} />
                    </StyledCartImageAndAmount>
                  </div>
                </>
              );
            })}
          </StyledScrollingItems>
        ) : (
          <StyledTitle weight="400" child="Your cart is Empty" />
        )}
      </StyledMainDiv>
    );
  }
}

const StyledAmountButton = styled.button`
  background: none;
  width: 45px;
  height: 45px;
  border: 1px solid var(--border-black);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledAmountHandle = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledAmount = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
`;

const StyledCartImageAndAmount = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const StyledScrollingItems = styled.div`
  margin-top: 2.4vh;
  max-height: 59.38494167550371vh;

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 3px;
    margin-left: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    width: 4px;
    background: none;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--primary-green);
    width: 2px;
  }
`;

const StyledId = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  text-align: justify;
`;

const StyledItemRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledAttribute = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  width: 70%;
`;

const StyledSeparator = styled.div`
  height: 1px;
  background: var(--light-grey);
  margin-bottom: 2.4vh;
  margin-top: ${({ index }) => (index === 0 ? "0vh" : "2.4vh")};
`;

const StyledCartItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

function mapStateToProps(state) {
  const { currency, cart } = state;
  return { currency, cart };
}

export default connect(mapStateToProps, null)(CartPage);
