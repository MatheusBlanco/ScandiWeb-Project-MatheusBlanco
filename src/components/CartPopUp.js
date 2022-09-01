/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CartItems from "./CartItems";
import "../assets/styles/cart.css";
import { setIsClosed, setIsOpen } from "../actions/popUpAction";

class CartPopUp extends Component {
  divRef = React.createRef();

  state = {
    isOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    if (isOpen !== prevState.isOpen) {
      this.handleOpen();
    }
  }

  handleClickOutside = (event) => {
    const { setIsClosed } = this.props;
    if (this.divRef.current && !this.divRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
      setIsClosed();
    }
  };

  handleOpen = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      document.addEventListener("mousedown", this.handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", this.handleClickOutside);
      };
    }
    return false;
  };

  render() {
    const {
      selectStyle,
      width,
      child,
      currency,
      cart,
      setIsClosed,
      setIsOpen,
    } = this.props;
    const { isOpen } = this.state;

    const totalPrice = () => {
      const pricesArray = cart?.items.map((products) => {
        const price = products?.prices?.find(
          (pr) =>
            pr?.currency?.symbol === currency ||
            pr?.currency.symbol === currency?.value
        );
        return { amount: price?.amount, currency: price?.currency };
      });
      const sum = pricesArray?.reduce(
        (partialSum, a) => partialSum + a.amount,
        0
      );
      return { sum, currencyCart: pricesArray[0]?.currency };
    };

    const renderCheckout = () => {
      const { sum, currencyCart } = totalPrice();
      return (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <StyledTaxAndAmmount>
            <span style={{ fontWeight: 500 }}>Total:</span>
            <span style={{ fontWeight: "bold" }}>
              {currencyCart?.symbol} {sum.toFixed(2)}
            </span>
          </StyledTaxAndAmmount>
          <StyledCartPopUpButtons>
            <NavLink
              to="/cart"
              className="view-cart"
              onClick={() => {
                this.setState({ isOpen: false });
                setIsOpen();
              }}
            >
              VIEW BAG
            </NavLink>
            <StyledOrder type="button">CHECK OUT</StyledOrder>
          </StyledCartPopUpButtons>
        </div>
      );
    };
    return (
      <div style={{ width: width || "30%", ...selectStyle }}>
        <div>
          <StyledSelect
            type="button"
            onClick={() => {
              if (isOpen === true) {
                this.setState({ isOpen: false });
                setIsClosed();
              } else {
                this.setState({ isOpen: true });
                setIsOpen();
              }
            }}
          >
            {child}
          </StyledSelect>
        </div>
        {isOpen ? (
          <StyledInputDiv>
            <StyledAmount>
              <StyledHeader>My Bag</StyledHeader>, {cart?.items?.length} items
            </StyledAmount>
            <CartItems popUp />
            <StyledCheckout>{renderCheckout()}</StyledCheckout>
          </StyledInputDiv>
        ) : null}
      </div>
    );
  }
}
const StyledBackground = styled.div`
  background: rgba(57, 55, 72, 0.22);
  opacity: 0.8;
  height: 100vh;
  overflow-x: hidden;
`;

const StyledOrder = styled.button`
  color: white;
  text-decoration: none;

  padding-bottom: 1.378579003181336vh;
  padding-right: 1.875vw;
  padding-left: 1.875vw;
  padding-top: 1.378579003181336vh;
  font-family: "Raleway";
  border: none;
  background: var(--primary-green);
`;

const StyledCartPopUpButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const StyledTaxAndAmmount = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
`;

const StyledCheckout = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 32px 0px;
  margin-left: 16px;
  margin-right: 16px;
`;

const StyledAmount = styled.p`
  display: flex;
  align-items: flex-start;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
`;

const StyledHeader = styled.span`
  display: flex;
  align-items: flex-start;
  margin-left: 16px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
`;

const StyledSelect = styled.span`
  width: 100%;
  display: flex;
  padding: 5px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const StyledInputDiv = styled.div`
  margin-top: 25px;
  padding-top: 10px;

  background-color: var(--white);
  position: absolute;
  max-height: 100vh;
  right: 2px;
  width: ${({ width }) => width}px;
  z-index: 50;
  overflow-y: hidden;
  overflow-x: hidden;
`;

function mapStateToProps(state) {
  const { currency, cart, popUpReducer } = state;
  return { currency, cart, popUpReducer };
}
export default connect(mapStateToProps, { setIsClosed, setIsOpen })(CartPopUp);
