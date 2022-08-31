import React, { Component } from "react";
import styled from "styled-components";

class StyledColorAttribute extends Component {
  render() {
    const { selectedAttributes, attribute, index, item, onClickFunc } =
      this.props;
    return (
      <StyledColorTypeItem
        onClick={onClickFunc}
        index={index}
        key={index}
        item={item}
        attribute={attribute}
        selectedItem={selectedAttributes}
        style={{ backgroundColor: item?.value }}
      />
    );
  }
}

const StyledColorTypeItem = styled.button`
  width: 32px;
  height: 32px;
  border: ${({ item, selectedItem, attribute }) =>
    selectedItem?.find(
      (selI) => selI?.id === item?.id && selI?.attrId === attribute.id
    )
      ? "2px solid var(--primary-green)"
      : "2px solid var(--light-grey)"};
  cursor: pointer;

  display: flex;
  padding: 1px;
  align-items: center;
  justify-content: center;
  margin: ${({ index }) => (index === 0 ? "8px 6px 8px 0px" : "8px 6px")};

  &:hover {
    border: 2px solid var(--primary-green);
  }
`;

export default StyledColorAttribute;
