/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
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
import { arraysEqual } from "../helpers/index";
import { addItem, removeItemAmount } from "../actions/cartActions";

class CartPage extends Component {
  state = {
    reducedProductArray: [],
  };

  componentDidMount() {
    this.handleArrayWithAmounts();
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    if (cart?.items !== prevProps.cart?.items) {
      this.handleArrayWithAmounts();
    }
  }

  handleArrayWithAmounts = () => {
    const { cart } = this.props;
    let result = [];

    cart?.items?.forEach((item) => {
      const resultItemIndex = result.findIndex(
        (resultItem) =>
          resultItem?.id === item?.id &&
          arraysEqual(resultItem?.selectedAttributes, item?.selectedAttributes)
      );
      const itemExistsOnResult = resultItemIndex !== -1;

      if (itemExistsOnResult) {
        let resultItem = result[resultItemIndex];

        resultItem = { ...resultItem, amount: resultItem.amount + 1 };

        const tempRes = result;
        tempRes[resultItemIndex] = resultItem;
        result = tempRes;
      } else {
        result.push({ ...item, amount: 1 });
      }
    });
    this.setState({
      reducedProductArray: result.sort((a, b) => a.id.localeCompare(b.id)),
    });
  };

  render() {
    const { cart, currency, addItem, removeItemAmount } = this.props;
    const { reducedProductArray } = this.state;

    const handleItemAmount = (item, cloneItem) => {
      if (cloneItem) {
        const newItem = item;
        addItem(newItem);
      } else {
        removeItemAmount(item, cart?.items);
      }
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
            onClick={() => handleItemAmount(item, true)}
          >
            <img src={Plus} alt="plus" />
          </StyledAmountButton>
          <StyledAmount>{item?.amount ? item?.amount : 1}</StyledAmount>
          <StyledAmountButton
            type="button"
            onClick={() => handleItemAmount(item, false)}
          >
            <img src={Minus} alt="plus" />
          </StyledAmountButton>
        </StyledAmountHandle>
      );
    };

    const totalPrice = () => {
      const pricesArray = cart?.items.map((products) => {
        const price = products.prices?.find(
          (price) =>
            price?.currency.symbol === currency ||
            price?.currency.symbol === currency?.value
        );
        return { amount: price?.amount, currency: price?.currency };
      });
      const sum = pricesArray?.reduce(
        (partialSum, a) => partialSum + a?.amount,
        0
      );
      return { sum, currency: pricesArray[0].currency };
    };

    const renderCheckout = () => {
      const { sum, currency } = totalPrice();
      const taxPercent = (21 / 100) * sum;
      return (
        <>
          <StyledTaxAndAmmount>
            Tax 21%:{" "}
            <span style={{ fontWeight: "bold" }}>
              &nbsp;&nbsp;{currency?.symbol} {taxPercent.toFixed(2)}
            </span>
          </StyledTaxAndAmmount>
          <StyledTaxAndAmmount>
            Quantity:
            <span style={{ fontWeight: "bold" }}>
              &nbsp;
              {reducedProductArray?.length}
            </span>
          </StyledTaxAndAmmount>
          <StyledTaxAndAmmount>
            <span style={{ fontWeight: 500 }}>Total:</span>
            <span style={{ fontWeight: "bold" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {currency?.symbol} {sum.toFixed(2)}
            </span>
          </StyledTaxAndAmmount>
          <StyledCartButton>Order</StyledCartButton>
        </>
      );
    };

    return (
      <StyledMainDiv>
        <StyledTitle weight="bold" child="Cart" />
        {cart?.items?.length ? (
          <>
            <StyledScrollingItems>
              <StyledSeparator index={0} />

              {reducedProductArray?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
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
                    <StyledSeparator
                      index={index + 1}
                      length={reducedProductArray?.length}
                    />
                  </>
                );
              })}
            </StyledScrollingItems>
            <StyledCheckout>{renderCheckout()}</StyledCheckout>
          </>
        ) : (
          <StyledTitle weight="400" child="Your cart is Empty" />
        )}
      </StyledMainDiv>
    );
  }
}

const StyledCartButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 292px;
  border: none;
  margin-top: 20px;
  background: var(--primary-green);
  color: var(--white);
  padding: 16px 32px;
  font-family: "Raleway";
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  text-decoration: none;
`;

const StyledCheckout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
`;

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
  max-height: 30.54082714740191vh;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
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
  align-items: flex-start;
`;

const StyledScrollingItems = styled.div`
  margin-top: 2.4vh;
  max-height: 55.38494167550371vh;

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
  margin-bottom: ${({ index, length }) => (index === length ? "0vh" : "2.4vh")};
  margin-top: ${({ index }) => (index === 0 ? "0vh" : "2.4vh")};
`;

const StyledCartItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const StyledTaxAndAmmount = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
`;

function mapStateToProps(state) {
  const { currency, cart } = state;
  return { currency, cart };
}

export default connect(mapStateToProps, { addItem, removeItemAmount })(
  CartPage
);
