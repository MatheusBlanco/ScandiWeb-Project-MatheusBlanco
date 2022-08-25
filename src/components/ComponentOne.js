import React, { Component } from "react";
import { connect } from "react-redux";

class ComponentOne extends Component {
  render() {
    const { currency } = this.props;
    return (
      <div className="ComponentThree">
        <h5 className="bold-font">1. Class Component</h5>
        <p className="medium-font">Moeda: {currency?.value}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currency } = state;
  return { currency };
}

export default connect(mapStateToProps, null)(ComponentOne);
