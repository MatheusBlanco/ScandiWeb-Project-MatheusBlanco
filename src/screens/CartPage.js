import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import StyledTitle from "../components/Styled/StyledTitle";

class CartPage extends Component {
  render() {
    const { cart } = this.props;
    return (
      <StyledMainDiv>
        <StyledTitle weight="bold" child="Cart" />
      </StyledMainDiv>
    );
  }
}

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  margin: auto;

  height: 80%;
  width: 90%;
`;

function mapStateToProps(state) {
  const { currency, cart } = state;
  return { currency, cart };
}

export default connect(mapStateToProps, null)(CartPage);
