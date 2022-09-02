import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import CategoryPage from "../screens/CategoryPage";
import TopBar from "../components/TopBar";
import ProductPage from "../screens/ProductPage";
import CartPage from "../screens/CartPage";

class Router extends Component {
  render() {
    const { popUpReducer } = this.props;
    const routes = () => {
      return (
        <Routes>
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      );
    };
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TopBar />
        </div>
        <StyledBackground popUpReducer={popUpReducer?.value}>
          {routes()}
        </StyledBackground>
      </>
    );
  }
}

const StyledBackground = styled.div`
  background: ${({ popUpReducer }) =>
    popUpReducer ? "#39374838" : "transparent"};
  height: 100vh;
  overflow-x: hidden;
`;

function mapStateToProps(state) {
  const { cart, currency, popUpReducer } = state;
  return { cart, currency, popUpReducer };
}

export default connect(mapStateToProps, null)(Router);
