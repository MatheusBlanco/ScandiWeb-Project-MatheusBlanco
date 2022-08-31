import React, { Component } from "react";
import styled from "styled-components";

class StyledTextAttribute extends Component {
  render() {
    const { selectedAttributes, attribute, index, item, onClickFunc, noHover } =
      this.props;
    return (
      <StyledTextTypeItem
        onClick={onClickFunc}
        index={index}
        noHover={noHover}
        key={index}
        item={item}
        attribute={attribute}
        selectedItem={selectedAttributes}
      >
        {item.displayValue}
      </StyledTextTypeItem>
    );
  }
}

const StyledTextTypeItem = styled.button`
  width: 3.28125vw;
  height: 4.7720042417815485vh;
  background: ${({ item, selectedItem, attribute }) =>
    selectedItem?.find(
      (selI) => selI?.id === item?.id && selI?.attrId === attribute.id
    )
      ? "var(--text-black)"
      : "none"};
  color: ${({ item, selectedItem, attribute }) =>
    selectedItem?.find(
      (selI) => selI?.id === item?.id && selI?.attrId === attribute.id
    )
      ? "white"
      : "var(--text-black)"};
  cursor: ${({ noHover }) => (noHover ? "" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ index }) => (index === 0 ? "8px 6px 8px 0px" : "8px 6px")};
  border: 1px solid var(--border-black);
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5vmin;

  &:hover {
    background: ${({ noHover }) => (noHover ? "none" : "var(--border-black)")};
    color: ${({ noHover }) => (noHover ? "var(--text-black)" : "white")};
  }
`;

export default StyledTextAttribute;
