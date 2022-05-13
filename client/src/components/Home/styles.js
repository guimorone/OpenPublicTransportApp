import styled from "styled-components";

export const StyledHome = styled.div`
  display: grid;
  justify-items: center;
`;

export const StyledTitleTable = styled.div`
  display: flex;
  gap: 10%;
`;

export const StyledNameAndValue = styled.div`
  color: #fabb51;
  display: flex;
  justify-content: center;
  padding-bottom: 2.2% !important;
  gap: 10%;
`;

export const NameLine = styled.h1`
  font-size: 2rem;
  width: 40vw;
`;

export const TableElement = styled.tr`
  color: #f2f2f2;
  & * {
    margin: 10%;
  }
`;

export const ObsTable = styled.ul`
  width: 610px;
`;
