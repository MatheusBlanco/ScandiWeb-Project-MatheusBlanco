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
    return (
      <StyledTopBar>
        <div style={{ maxWidth: "12,2vw" }}>
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
            <img style={{ marginLeft: 10 }} src={EmptyCart} alt="" />
            {cart?.items?.length > 0 ? (
              <StyledCartAmmount>{cart?.items?.length}</StyledCartAmmount>
            ) : null}
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

const StyledCartAmmount = styled.div`
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
  top: -6px;
  left: 28px;
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
`;

const StyledTopBar = styled.nav`
  position: relative;
  width: 90%;
  top: 0;
  left: 0;
  background-color: white;
  height: 8.5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function mapStateToProps(state) {
  const { currency, cart } = state;
  return { currency, cart };
}

export default connect(mapStateToProps, { setCurrency })(TopBar);
