/* eslint-disable no-shadow */
import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../assets/images/logo.svg";
import EmptyCart from "../assets/images/EmptyCart.svg";
import "../assets/styles/topbar.css";
import Select from "./Select";
import getCurrency from "../api/currency";
import { setCurrency } from "../actions/currencyActions";
import CartPopUp from "./CartPopUp";

class TopBar extends Component {
  menu = [
    { label: "WOMEN", redirectTo: "/" },
    { label: "MEN", redirectTo: "/men" },
    { label: "KIDS", redirectTo: "/kids" },
  ];

  state = {
    currencies: [],
    currencyOption: "$",
  };

  componentDidMount() {
    this.handlecurrencies();
  }

  handlecurrencies = () => {
    getCurrency().then((res) => {
      this.setState({ currencies: res });
    });
  };

  render() {
    const { currencies, currencyOption } = this.state;
    const { setCurrency, cart } = this.props;

    const cartIcon = () => {
      return (
        <>
          <img style={{ marginLeft: 10 }} src={EmptyCart} alt="" />
          {cart?.items?.length > 0 ? (
            <StyledCartAmount>{cart?.items?.length}</StyledCartAmount>
          ) : null}
        </>
      );
    };
    return (
      <StyledTopBar>
        <div style={{ maxWidth: "12,2vw", marginRight: 425 }}>
          {this.menu?.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.redirectTo}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>
        <StyledLogo src={Logo} alt="" />
        <StyledActions>
          <Select
            defaultPlaceholder={currencyOption || "$"}
            options={currencies}
            onOptionClick={(e) => {
              this.setState({ currencyOption: e });
              setCurrency(e);
            }}
          />
          <StyledCart type="button">
            <CartPopUp
              defaultPlaceholder={currencyOption || "$"}
              options={currencies}
              child={cartIcon()}
              onOptionClick={(e) => {
                this.setState({ currencyOption: e });
                setCurrency(e);
              }}
            />
          </StyledCart>
        </StyledActions>
      </StyledTopBar>
    );
  }
}

const StyledCart = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledCartAmount = styled.div`
  height: 20px;
  width: 20px;
  background-color: var(--border-black);
  color: white;
  font-weight: bold;
  font-size: 14px;
  border-radius: 20px;
  font-family: Roboto;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -3px;
  left: 33px;
`;

const StyledLogo = styled.img`
  margin-right: 7vw;
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  width: 102px;
  max-width: 102px;
  justify-content: space-evenly;
  margin-left: 425px;
`;

const StyledTopBar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  height: 8.5vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
`;

function mapStateToProps(state) {
  const { currency, cart } = state;
  return { currency, cart };
}

export default connect(mapStateToProps, { setCurrency })(TopBar);
