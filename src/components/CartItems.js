/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-unsafe-optional-chaining */
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import StyledColorAttribute from "./Styled/StyledColorAttribute";
import StyledPrice from "./Styled/StyledPrice";
import StyledProductName from "./Styled/StyledProductName";
import StyledTextAttribute from "./Styled/StyledTextAttribute";
import StyledTitle from "./Styled/StyledTitle";
import StyledImageCart from "./Styled/StyledImageCart";
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
    const { cart, currency, addItem, removeItemAmount, popUp } = this.props;
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
                    <StyledId className="roboto" popUp={popUp}>
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
                            popUp={popUp}
                            selectedAttributes={item?.selectedAttributes}
                          />
                        ) : (
                          <StyledColorAttribute
                            index={index}
                            item={attributeitem}
                            key={index}
                            attribute={attribute}
                            noHover
                            popUp={popUp}
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
        <StyledAmountHandle popUp={popUp}>
          <StyledAmountButton
            type="button"
            popUp={popUp}
            onClick={() => handleItemAmount(item, true)}
          >
            <img
              src={Plus}
              style={{ height: popUp ? "40%" : "40%" }}
              alt="plus"
            />
          </StyledAmountButton>
          <StyledAmount popUp={popUp}>
            {item?.amount ? item?.amount : 1}
          </StyledAmount>
          <StyledAmountButton
            type="button"
            popUp={popUp}
            onClick={() => handleItemAmount(item, false)}
          >
            <img
              src={Minus}
              style={{ width: popUp ? "90%" : "60%" }}
              alt="plus"
            />
          </StyledAmountButton>
        </StyledAmountHandle>
      );
    };

    return (
      <div style={{ padding: popUp ? 16 : 0 }}>
        {cart?.items?.length ? (
          <StyledScrollingItems popUp={popUp}>
            {popUp ? null : <StyledSeparator index={0} />}
            {reducedProductArray?.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "99.5%",
                    }}
                  >
                    <StyledCartItems>
                      <StyledProductName popUp={popUp} product={item} />
                      <div style={{ marginBottom: 20 }}>
                        <StyledPrice
                          popUp={popUp}
                          productPrices={item?.prices}
                          currency={currency}
                        />
                      </div>
                      <div>{renderAttributes(item)}</div>
                    </StyledCartItems>
                    <StyledCartImageAndAmount>
                      {renderAmount(item)}
                      <StyledImageCart item={item} popUp={popUp} />
                    </StyledCartImageAndAmount>
                  </div>
                  {popUp ? null : (
                    <StyledSeparator
                      index={index + 1}
                      length={reducedProductArray?.length}
                    />
                  )}
                </div>
              );
            })}
          </StyledScrollingItems>
        ) : (
          <StyledTitle weight="400" child="Your cart is Empty" />
        )}
      </div>
    );
  }
}

const StyledAmountButton = styled.button`
  background: none;
  width: ${({ popUp }) => (popUp ? "24px" : "45px")};
  height: ${({ popUp }) => (popUp ? "24px" : "45px")};
  border: 1px solid var(--border-black);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledAmountHandle = styled.div`
  display: flex;
  height: 100%;
  max-height: ${({ popUp }) =>
    popUp ? "20.14846235418876vh" : "30.54082714740191vh"};
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
`;

const StyledAmount = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: ${({ popUp }) => (popUp ? "16px" : "24px")};
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
  max-height: ${({ popUp }) => (popUp ? "58vh" : "47vh")};
  max-width: ${({ popUp }) => (popUp ? "16.927083333333332vw" : "100%")};

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
  font-weight: ${({ popUp }) => (popUp ? "400" : "700")};
  font-size: ${({ popUp }) => (popUp ? "14px" : "18px")};
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

function mapStateToProps(state) {
  const { currency, cart } = state;
  return { currency, cart };
}

export default connect(mapStateToProps, { addItem, removeItemAmount })(
  CartPage
);
