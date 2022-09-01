/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import styled from "styled-components";

class CartPopUp extends Component {
  divRef = React.createRef();

  state = {
    isOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    if (isOpen !== prevState.isOpen) {
      this.handleOpen();
    }
  }

  handleOptionClick = (option, name, index) => {
    const { onOptionClick } = this.props;
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false });
      onOptionClick(option, index);
    }
  };

  handleClickOutside = (event) => {
    if (this.divRef.current && !this.divRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  };

  handleOpen = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      document.addEventListener("mousedown", this.handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", this.handleClickOutside);
      };
    }
    return false;
  };

  render() {
    const { selectStyle, width, options, child } = this.props;
    const { isOpen } = this.state;
    return (
      <div style={{ width: width || "30%", ...selectStyle }}>
        <div>
          <StyledSelect
            type="button"
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            {child}
          </StyledSelect>
        </div>
        {isOpen ? (
          <StyledInputDiv>
            {options?.currencies?.length &&
              options?.currencies?.map((option, index) => {
                return (
                  <StyledOption
                    key={index}
                    onClick={() => {
                      this.handleOptionClick(
                        option?.symbol,
                        option?.label,
                        index
                      );
                    }}
                  >
                    {option?.symbol} {option?.label}
                  </StyledOption>
                );
              })}
          </StyledInputDiv>
        ) : null}
      </div>
    );
  }
}

const StyledSelect = styled.span`
  width: 100%;
  display: flex;
  padding: 5px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const StyledInputDiv = styled.div`
  margin-top: 25px;
  padding-top: 10px;

  background-color: var(--white);
  position: absolute;
  width: ${({ width }) => width}px;
  z-index: 50;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledOption = styled.div`
  width: 100%;
  font-size: 16px;
  font-family: "Raleway";

  color: black;
  background-color: var(--white);
  display: flex;
  padding: 8px 35px 8px 28px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--light-grey);
  }
`;

export default CartPopUp;
