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
import { getCategories } from "../api/category";
import { setNewRoute } from "../actions/categoryAction";

class TopBar extends Component {
  state = {
    currencies: [],
    currencyOption: "$",
    categoriesState: [],
  };

  componentDidMount() {
    const { setNewRoute } = this.props;
    this.handleData();
    setNewRoute("all");
    if (window.location.pathname === "/" || window.location.pathname === "") {
      window.location.href = "/all";
    }
  }

  handleData = () => {
    getCurrency().then((res) => {
      this.setState({ currencies: res });
    });
    getCategories().then((res) => {
      this.setState({ categoriesState: res.categories });
    });
  };

  render() {
    const { currencies, currencyOption, categoriesState } = this.state;
    const { setCurrency, cart, setNewRoute } = this.props;

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
          {categoriesState?.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={`/${item.name}`}
                onClick={() => {
                  setNewRoute(item?.name);
                }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                {item.name}
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
          <StyledCart>
            <CartPopUp child={cartIcon()} />
          </StyledCart>
        </StyledActions>
      </StyledTopBar>
    );
  }
}

const StyledCart = styled.div`
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
  top: -4px;
  left: 25px;
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
  const { currency, cart, category } = state;
  return { currency, cart, category };
}

export default connect(mapStateToProps, { setCurrency, setNewRoute })(TopBar);
