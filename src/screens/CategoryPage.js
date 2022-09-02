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

  componentDidUpdate(prevProps) {
    const { category } = this.props;
    if (prevProps?.category?.value !== category?.value) {
      this.handleAllItems();
    }
  }

  handleAllItems = () => {
    const { category } = this.props;
    getAllItems()
      .then((res) => {
        if (category?.value !== "all") {
          this.setState({
            allItems: res?.category?.products.filter(
              (ctgr) => ctgr?.category === category.value
            ),
          });
        } else {
          this.setState({
            allItems: res?.category?.products,
          });
        }
      })
      .catch((e) => alert("There was a problem getting the products", e));
  };

  render() {
    const { allItems } = this.state;
    const { category } = this.props;
    return (
      <StyledMainDiv>
        <StyledTitle
          weight={400}
          child={`
          Category ${category?.value}
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
          {allItems?.length &&
            allItems?.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
        </div>
      </StyledMainDiv>
    );
  }
}

function mapStateToProps(state) {
  const { currency, category } = state;
  return { currency, category };
}

export default connect(mapStateToProps, null)(CategoryPage);
