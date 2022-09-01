import React, { Component } from "react";
import styled from "styled-components";

class StyledColorAttribute extends Component {
  render() {
    const {
      selectedAttributes,
      attribute,
      index,
      item,
      onClickFunc,
      noHover,
      popUp,
    } = this.props;
    return (
      <StyledColorTypeItem
        onClick={onClickFunc}
        index={index}
        key={index}
        popUp={popUp}
        noHover={noHover}
        item={item}
        attribute={attribute}
        selectedItem={selectedAttributes}
        style={{ backgroundColor: item?.value }}
      />
    );
  }
}

const StyledColorTypeItem = styled.button`
  width: ${({ popUp }) => (popUp ? "20px" : "32px")};
  height: ${({ popUp }) => (popUp ? "20px" : "32px")};
  border: ${({ item, selectedItem, attribute }) =>
    selectedItem?.find(
      (selI) => selI?.id === item?.id && selI?.attrId === attribute.id
    )
      ? "2px solid var(--primary-green)"
      : "2px solid var(--light-grey)"};
  cursor: ${({ noHover }) => (noHover ? "" : "pointer")};

  display: flex;
  padding: 1px;
  align-items: center;
  justify-content: center;
  margin: ${({ index }) => (index === 0 ? "8px 6px 8px 0px" : "8px 6px")};

  &:hover {
    border: ${({ noHover }) =>
      noHover
        ? "2px solid var(--light-grey)"
        : "2px solid var(--primary-green)"};
  }
`;

export default StyledColorAttribute;
