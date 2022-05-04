import styled from "@emotion/styled";
import { ReactNode } from "react";

import SparklingStars from "./SparklingStars";

const AppContainer = styled.div`
  /* border: 2px dashed red; */
  position: relative;

  background-color: #222;

  flex: 1; /* stretches to fill the height */

  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.s}px) {
    flex-direction: column;
  }
`;

const NotificationContainer = styled.div`
  z-index: 2;

  position: relative;
  top: ${({ theme }) => theme.dimensions.mainNav.maxHeight}px;

  width: 100%;
  /* background-color: ${({ theme }) => theme.colors.primary.main}; */
`;

const PageContainer = styled.main`
  /* border: 2px dashed green; */

  z-index: 1;
  position: relative;

  flex: 1; /* stretches to fill the height */

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.header``;

const Footer = styled.footer``;

type Props = {
  children: ReactNode;
};

const HomePageLayout = ({ children }: Props) => {
  return (
    <AppContainer id="app">
      <NotificationContainer id="main-notification" />
      <Header></Header>
      <PageContainer id="page-container">
        <SparklingStars />
        {children}
      </PageContainer>
      <Footer></Footer>
    </AppContainer>
  );
};

export default HomePageLayout;
