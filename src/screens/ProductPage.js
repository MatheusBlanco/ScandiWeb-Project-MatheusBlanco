/* eslint-disable no-shadow */
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getItemById } from "../api/products";
import { addItem } from "../actions/cartActions";
import StyledTextAttribute from "../components/Styled/StyledTextAttribute";
import StyledColorAttribute from "../components/Styled/StyledColorAttribute";
import StyledProductName from "../components/Styled/StyledProductName";
import StyledMainDiv from "../components/Styled/StyledMainDiv";
import StyledPrice from "../components/Styled/StyledPrice";

class ProductPage extends Component {
  state = {
    product: null,
    selectedPhoto: 0,
    selectedAttributes: [],
  };

  componentDidMount() {
    const productId = window.location.pathname.split("/")[2];
    this.handleProductData(productId);
  }

  handleProductData = (id) => {
    return getItemById(id)
      .then((res) => this.setState({ product: res?.product }))
      .catch((e) => alert(e));
  };

  handleSelectedAttributes = (item, attribute) => {
    const { selectedAttributes } = this.state;
    const attr = { ...item, attrId: attribute?.id };
    this.setState((prevState) => {
      const foundState = prevState?.selectedAttributes.find(
        (selAt) => selAt?.attrId === attr?.attrId
      );
      if (foundState) {
        return {
          selectedAttributes: selectedAttributes
            .filter((sat) => sat.attrId !== attr?.attrId)
            .concat([attr]),
        };
      }
      return { selectedAttributes: selectedAttributes?.concat([attr]) };
    });
  };

  render() {
    const { product, selectedPhoto, selectedAttributes } = this.state;
    const { addItem, currency } = this.props;

    const handleSendToCart = (productToCart, attributes) => {
      const productItem = {
        ...productToCart,
        selectedAttributes: attributes,
      };
      addItem(productItem);
    };
    const renderAttributes = () => {
      return (
        <div>
          {product?.attributes?.map((attribute) => {
            return (
              <StyledAttribute key={attribute?.id}>
                <StyledId className="roboto">
                  {attribute?.id.toUpperCase()}:
                </StyledId>
                <StyledItemRow>
                  {attribute?.items.map((item, index) =>
                    attribute?.type === "text" ? (
                      <StyledTextAttribute
                        onClickFunc={() =>
                          this.handleSelectedAttributes(item, attribute)
                        }
                        index={index}
                        key={index}
                        item={item}
                        attribute={attribute}
                        selectedAttributes={selectedAttributes}
                      />
                    ) : (
                      <StyledColorAttribute
                        onClickFunc={() =>
                          this.handleSelectedAttributes(item, attribute)
                        }
                        index={index}
                        item={item}
                        key={index}
                        attribute={attribute}
                        selectedAttributes={selectedAttributes}
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
    };

    return (
      <StyledMainDiv>
        <StyledProduct>
          <StyledGallery>
            {product?.gallery.map((photo, index) => {
              return (
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  type="button"
                  key={index}
                  onClick={() => this.setState({ selectedPhoto: index })}
                >
                  <img
                    src={photo}
                    alt={product?.name}
                    style={{
                      width: "4.563020833333334vw",
                      height: "9.290562036055142vh",
                      objectFit: "contain",
                      alignSelf: "center",
                      margin:
                        index === 0
                          ? "0px 10px 32px 10px"
                          : "32px 10px 32px 10px",
                      opacity: product?.inStock ? "1.0" : "0.5",
                    }}
                  />
                </button>
              );
            })}
          </StyledGallery>
          <StyledStockDiv
            style={{
              display: "flex",
              alignItems: "center",
              margin: "-40px 100px 10px 40px",
            }}
          >
            <img
              src={product?.gallery[selectedPhoto]}
              alt={product?.name}
              style={{
                width: "31.770833333333332vw",
                height: "54.18875927889714vh",
                objectFit: "contain",
                justifyContent: "center",
                opacity: product?.inStock ? "1.0" : "0.5",
              }}
            />
            <StyledStockSpan>
              {!product?.inStock ? "OUT OF STOCK" : ""}
            </StyledStockSpan>
          </StyledStockDiv>
          <StyledActions>
            <StyledProductName product={product} />
            <div>{renderAttributes()}</div>
            <StyledAttribute>
              <StyledId>PRICE:</StyledId>
              <StyledPrice
                productPrices={product?.prices}
                currency={currency}
              />
            </StyledAttribute>
            <StyledCartButton
              disabled={!product?.inStock}
              to="/cart"
              onClick={() => {
                handleSendToCart(product, selectedAttributes);
              }}
              instock={product?.inStock === true}
            >
              {product?.inStock ? "ADD TO CART" : "OUT OF STOCK"}
            </StyledCartButton>
            <StyledDescription
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </StyledActions>
        </StyledProduct>
      </StyledMainDiv>
    );
  }
}

const StyledCartButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 292px;
  border: none;
  background: ${({ instock }) =>
    instock ? " var(--primary-green)" : "var(--light-grey)"};
  color: ${({ instock }) => (instock ? " var(--white)" : "var(--grey)")};
  padding: 16px 32px;
  font-family: "Raleway";
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  text-decoration: none;
`;

const StyledStockSpan = styled.span`
  font-weight: 400;
  font-size: 24px;
  font-family: "Raleway";

  line-height: 160%;
  position: relative;
  top: 54%;
  right: 50%;
  color: var(--grey);
`;

const StyledStockDiv = styled.div`
  background-color: ${({ stock }) => (!stock ? "var(--white)" : "transparent")};
  object-fit: contain;
  align-self: center;
`;

const StyledAttribute = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  width: 70%;
`;

const StyledId = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  text-align: justify;
`;

const StyledDescription = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.96%;
  text-align: justify;
  max-width: 292px;
  max-height: 53.022269353128316vh;

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 3px;
    margin-left: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    width: 4px;
    background: none;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--primary-green);
    width: 2px;
  }
`;

const StyledProduct = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  margin: auto;
  margin-top: 6.8vh;

  height: 80%;
  width: 90%;
`;

const StyledItemRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 560px;
  width: 10%;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 3px;
    margin-left: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    width: 4px;
    background: none;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--primary-green);
    width: 2px;
  }
`;

function mapStateToProps(state) {
  const { currency, cart } = state;
  return { currency, cart };
}

export default connect(mapStateToProps, { addItem })(ProductPage);
