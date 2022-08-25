import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "../screens/CategoryPage";
import TopBar from "../components/TopBar";
import ProductPage from "../screens/ProductPage";

class Router extends Component {
  render() {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TopBar />
        </div>
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </>
    );
  }
}

export default Router;
