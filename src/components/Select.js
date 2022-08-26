/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import styled from "styled-components";
import ArrowDown from "../assets/icons/arrowdown.svg";

class Select extends Component {
  divRef = React.createRef();

  state = {
    isOpen: false,
    placeholder: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    const { defaultOptionIndex, options, selectedOption } = this.props;
    if (isOpen !== prevState.isOpen) {
      this.handleOpen();
    }

    if (defaultOptionIndex !== undefined) {
      this.setState({ placeholder: options[defaultOptionIndex] });
    } else if (selectedOption !== undefined) {
      this.setState({ placeholder: selectedOption });
    }
  }

  handleOptionClick = (option, name, index) => {
    const { onOptionClick } = this.props;
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false });
      onOptionClick(option, index);
      this.setState({ placeholder: option });
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
    const { selectStyle, width, defaultPlaceholder, options } = this.props;
    const { isOpen, placeholder } = this.state;
    return (
      <div style={{ width: width || "30%", ...selectStyle }}>
        <div>
          <StyledSelect
            type="button"
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            {placeholder ? (
              <StyledBold>{placeholder}</StyledBold>
            ) : (
              <StyledBold>{defaultPlaceholder}</StyledBold>
            )}
            <img src={ArrowDown} alt="Arrow Down" />
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

const StyledBold = styled.span`
  font-weight: 500;
  padding-right: 0.5vw;
  font-family: "Raleway";
`;
const StyledSelect = styled.span`
  width: 100%;
  display: flex;
  padding: 5px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const StyledInputDiv = styled.div`
  margin-top: 7.5px;
  padding-top: 10px;

  background-color: var(--white);
  position: absolute;
  right: 2px;
  width: ${({ width }) => width}px;
  max-height: 300px;
  z-index: 50;
  overflow-y: auto;
  overflow-x: hidden;

  -webkit-box-shadow: 0px 4px 15px 5px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 15px 5px rgba(0, 0, 0, 0.05);
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

export default Select;
