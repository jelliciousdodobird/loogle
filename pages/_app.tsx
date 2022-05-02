// styling:
import { css, jsx, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeStateProvider } from "../contexts/ThemeContext";
import { UIStateProvider } from "../contexts/UIContext";
import SparklingStars from "../components/SparklingStars";
import { useRouter } from "next/router";

const AppContainer = styled.div`
  /* border: 2px dashed red; */

  position: relative;
  width: 100%;
  height: 100%;

  background-color: #222;

  /* min-height: 100vh; */

  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.s}px) {
    flex-direction: column;
  }
`;

const NotificationContainer = styled.div`
  z-index: 2;

  position: sticky;
  top: ${({ theme }) => theme.dimensions.mainNav.maxHeight}px;

  width: 100%;
  /* background-color: ${({ theme }) => theme.colors.primary.main}; */
`;

const PageContainer = styled.main`
  /* border: 2px dashed blue; */

  z-index: 1;
  position: relative;

  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  /* align-items: center; */
`;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeStateProvider>
      <UIStateProvider>
        <AppContainer id="app">
          {/* <NavigationBar /> */}
          <NotificationContainer id="main-notification" />

          <PageContainer id="page-container">
            <SparklingStars />

            <Component {...pageProps} />
          </PageContainer>
        </AppContainer>
      </UIStateProvider>
    </ThemeStateProvider>
  );
};

export default App;
