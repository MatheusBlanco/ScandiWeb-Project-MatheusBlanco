import React, { Component } from "react";
import { connect } from "react-redux";
import allActions from "../actions/index";

class ComponentOne extends Component {
  render() {
    const { counter, increment, decrement } = this.props;
    return (
      <div className="ComponentThree">
        <h5 className="bold-font">1. Class Component</h5>
        <p className="medium-font">Counter: {counter}</p>

        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => increment(allActions.counterActions.increment())}
        >
          +
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => decrement(allActions.counterActions.increment())}
        >
          -
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { counter } = state;
  return { counter };
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ComponentOne);
