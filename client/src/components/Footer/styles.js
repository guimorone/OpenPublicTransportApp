import styled from "styled-components";

export const FooterDivStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3.5vh;
`;

export const FooterLinkStyle = styled.a`
  color: #faedc6;
  text-decoration: none;
  &:hover,
  &:active {
    text-decoration: underline;
    color: #19282f;
  }
`;
