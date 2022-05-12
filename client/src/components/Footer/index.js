import React from "react";
import { FooterDivStyle, FooterLinkStyle } from "./styles";

export default function Footer() {
  return (
    <FooterDivStyle>
      <FooterLinkStyle
        href="https://github.com/guimorone/OpenPublicTransportApp"
        target="_blank"
      >
        Repositório do projeto
      </FooterLinkStyle>
      <FooterLinkStyle
        href="https://www.granderecife.pe.gov.br/"
        target="_blank"
      >
        Dados disponíveis no site da Grande Recife
      </FooterLinkStyle>
    </FooterDivStyle>
  );
}
