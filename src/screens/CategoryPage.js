import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllItems } from "../api/products";
import ProductCard from "../components/ProductCard";
import StyledMainDiv from "../components/Styled/StyledMainDiv";
import StyledTitle from "../components/Styled/StyledTitle";

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
      <StyledMainDiv>
        <StyledTitle
          weight={400}
          child={`
          Category ${allItems?.category?.name}
        `}
        />
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
      </StyledMainDiv>
    );
  }
}

function mapStateToProps(state) {
  const { currency } = state;
  return { currency };
}

export default connect(mapStateToProps, null)(CategoryPage);
