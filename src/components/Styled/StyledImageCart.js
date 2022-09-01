/* eslint-disable no-unsafe-optional-chaining */
import React, { Component } from "react";
import styled from "styled-components";
import GT from "../../assets/icons/GT.svg";
import LT from "../../assets/icons/LT.svg";

class StyledImageCart extends Component {
  state = { selectedPhoto: 0 };

  render() {
    const { item, popUp } = this.props;
    const { selectedPhoto } = this.state;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{
            width: popUp ? "6vw" : "6.302083333333333vw",
            height: popUp ? "15vh" : "20.14846235418876vh",
            objectFit: "contain",
            margin: "auto",
          }}
          src={item?.gallery[selectedPhoto]}
          alt=""
        />
        <StyledButtonsImage>
          <StyledPhotoButton
            type="button"
            onClick={() =>
              this.setState((prevState) => {
                if (prevState?.selectedPhoto === 0) {
                  return false;
                }

                return { selectedPhoto: prevState?.selectedPhoto - 1 };
              })
            }
          >
            <img alt="" src={LT} />
          </StyledPhotoButton>
          <StyledPhotoButton
            type="button"
            onClick={() =>
              this.setState((prevState) => {
                if (prevState?.selectedPhoto === item?.gallery.length - 1) {
                  return false;
                }

                return { selectedPhoto: prevState?.selectedPhoto + 1 };
              })
            }
          >
            <img alt="" src={GT} />
          </StyledPhotoButton>
        </StyledButtonsImage>
      </div>
    );
  }
}

const StyledButtonsImage = styled.div`
  display: flex;
  flex-direction: row;
  width: 35%;
  justify-content: space-around;
  position: relative;
  top: -36px;
  left: 64%;
`;

const StyledPhotoButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: black;
  border: none;
  opacity: 0.73;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

export default StyledImageCart;
