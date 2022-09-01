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
    console.log(this.props);
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TopBar />
        </div>
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </>
    );
  }
}

const StyledBackground = styled.div`
  background: rgba(57, 55, 72, 0.22);
  opacity: 0.8;
  height: 100vh;
  overflow-x: hidden;
`;

function mapStateToProps(state) {
  const { cart, currency, popUpReducer } = state;
  return { cart, currency, popUpReducer };
}

export default connect(mapStateToProps, null)(Router);
