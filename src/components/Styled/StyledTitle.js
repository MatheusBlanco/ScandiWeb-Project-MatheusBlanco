import React from "react";
import styled from "styled-components";

function StyledTitle({ child, weight }) {
  return <Styledp weight={weight}>{child}</Styledp>;
}

const Styledp = styled.p`
  width: 299px;
  height: 68px;
  left: calc(50% - 15.57vw / 2 - 24.42px);
  top: calc(50% - 6.8vh / 2 - 56.25vh);

  /* Heading / Desktop / H2 */

  font-family: "Raleway";
  font-style: normal;
  font-weight: ${({ weight }) => weight};
  font-size: 4.45vh;
  line-height: 160%;

  display: flex;
  align-items: center;

  color: var(--text-black);
`;

export default StyledTitle;
