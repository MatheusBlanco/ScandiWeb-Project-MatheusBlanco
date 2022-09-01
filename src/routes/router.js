import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CategoryPage from "../screens/CategoryPage";
import TopBar from "../components/TopBar";
import ProductPage from "../screens/ProductPage";
import CartPage from "../screens/CartPage";

class Router extends Component {
  render() {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TopBar />
        </div>
        <StyledBackground>
          <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </StyledBackground>
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

export default Router;
