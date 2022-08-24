import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import ComponentOne from "../components/ComponentOne";
import TopBar from "../components/TopBar";

class Router extends Component {
  render() {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TopBar />
        </div>
        <Routes>
          <Route path="/" element={<ComponentOne />} />
          <Route path="/lol" element={<div>lol</div>} />
        </Routes>
      </>
    );
  }
}

export default Router;
