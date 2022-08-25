import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getItemById } from "../api/products";

class ProductCard extends Component {
  state = {
    product: null,
  };

  componentDidMount() {
    const productId = window.location.pathname.split("/")[2];
    this.handleProductData(productId);
  }

  handleProductData = (id) => {
    return getItemById(id)
      .then((res) => this.setState({ product: res?.product }))
      .catch((e) => alert(e));
  };

  render() {
    const { product } = this.state;
    return <div>página de produto de {product?.name}</div>;
  }
}

function mapStateToProps(state) {
  const { currency } = state;
  return { currency };
}

export default connect(mapStateToProps, null)(ProductCard);
