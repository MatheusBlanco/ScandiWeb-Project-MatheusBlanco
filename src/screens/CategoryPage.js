import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getAllItems } from "../api/products";
import ProductCard from "../components/ProductCard";

class CategoryPage extends Component {
  state = {
    allItems: null,
  };

  componentDidMount() {
    this.handleAllItems();
  }

  handleAllItems = () => {
    getAllItems()
      .then((res) => this.setState({ allItems: res }))
      .catch((e) => alert("There was a problem getting the products", e));
  };

  render() {
    const { allItems } = this.state;
    return (
      <div
        style={{
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingBottom: "5vw",
        }}
      >
        <StyledCategory>Category {allItems?.category?.name}</StyledCategory>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {allItems?.category?.products?.length &&
            allItems?.category?.products.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
        </div>
      </div>
    );
  }
}

const StyledCategory = styled.p`
  width: 299px;
  height: 68px;
  left: calc(50% - 15.57vw / 2 - 24.42px);
  top: calc(50% - 6.8vh / 2 - 56.25vh);

  /* Heading / Desktop / H2 */

  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 4.45vh;
  line-height: 160%;

  display: flex;
  align-items: center;

  color: var(--text-black);
`;

function mapStateToProps(state) {
  const { currency } = state;
  return { currency };
}

export default connect(mapStateToProps, null)(CategoryPage);
