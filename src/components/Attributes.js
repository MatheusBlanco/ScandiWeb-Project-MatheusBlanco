import React, { Component } from "react";
import styled from "styled-components";

class Attributes extends Component {
  render() {
    const { product, selectedAttributes, onClickFunc } = this.props;
    return (
      <div>
        {product?.attributes?.map((attribute) => {
          return (
            <StyledAttribute key={attribute?.id}>
              <StyledTitle className="roboto">
                {attribute?.id.toUpperCase()}:
              </StyledTitle>
              <StyledItemRow>
                {attribute?.items.map((item, index) =>
                  attribute?.type === "text" ? (
                    <StyledTextTypeItem
                      onClick={onClickFunc(item, attribute)}
                      index={index}
                      key={index}
                      item={item}
                      attribute={attribute}
                      selectedItem={selectedAttributes}
                    >
                      {item.displayValue}
                    </StyledTextTypeItem>
                  ) : (
                    <StyledColorTypeItem
                      onClick={() => onClickFunc(item, attribute)}
                      index={index}
                      item={item}
                      key={index}
                      attribute={attribute}
                      selectedItem={selectedAttributes}
                      style={{ backgroundColor: item?.value }}
                    />
                  )
                )}
              </StyledItemRow>
            </StyledAttribute>
          );
        })}
      </div>
    );
  }
}

const StyledAttribute = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  width: 70%;
`;

const StyledTitle = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  text-align: justify;
`;

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
  cursor: pointer;
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
    background: var(--border-black);
    color: white;
  }
`;

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

const StyledItemRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export default Attributes;
