// libary:
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// nextjs:
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// contexts:
import { useThemeState } from "../contexts/ThemeContext";

// custom components:
import PageShortcut from "../components/NavItem";
import Searchbar from "../components/Searchbar";

// icons:
import { MdMap, MdShoppingBasket, MdPlusOne, MdCheckBox } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { GiStoneSphere } from "react-icons/gi";
import { expectedValueNot } from "../utils/utils";

const Container = styled.div`
  /* border: 1px solid red; */

  height: 100%;
  width: 100%;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  /* pointer-events: none allows the user to interact with the star background */
  pointer-events: none;
  & > * {
    pointer-events: all;
  }
`;

const AlignmentContainer = styled.div`
  /* border: 2px dashed green; */

  pointer-events: all;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
  gap: 2rem;
`;

const Nav = styled.nav``;

const PageLinksContainer = styled.ul`
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;

  gap: 1rem;

  width: 30rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.s}px) {
    width: 100%;
    min-width: 100%;
  }
`;

const WelcomeMessage = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #fff;
`;

const animatedText = keyframes`
  from{
    background-position: 0%;
  }
  to{
    background-position: 100%; 
  }
`;

const T = styled.span`
  font-size: inherit;
  font-weight: inherit;

  background-image: linear-gradient(
    to right,
    #19b28e,
    #fee257,
    #ff3939,
    #217aff
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  background-size: 300%;
  background-position: -100%;

  animation: ${animatedText} 5s infinite alternate-reverse;
`;

const C = styled.span`
  font-size: inherit;
  font-weight: inherit;

  color: #fff;
`;

// fee257;
const links = [
  { name: "Map", link: "map", order: 0, color: "#19b28e", icon: MdMap },
  {
    name: "Market",
    link: "/market",
    order: 1,
    color: "#fee257",
    icon: RiAuctionFill,
  },
  {
    name: "Mari's Shop",
    link: "/mari",
    order: 3,
    color: "#f99155",
    icon: MdShoppingBasket,
  },
  {
    name: "Daily Tracker",
    link: "/dailies",
    order: 2,
    color: "#ff3939",
    icon: MdCheckBox,
  },
  {
    name: "Stone Cutter",
    link: "/stone-cutter",
    order: 5,
    color: "#b237d7",
    icon: GiStoneSphere,
  },
  {
    name: "Honing Calculator",
    link: "/honing",
    order: 4,
    color: "#217aff",
    icon: MdPlusOne,
  },
];

const Home: NextPage = () => {
  const { toggleTheme } = useThemeState();
  return (
    <Container id="index">
      <WelcomeMessage onClick={() => expectedValueNot()}>
        <T>
          Loogle<C>,</C> l<C>ost ark's g</C>oogle.
        </T>
      </WelcomeMessage>
      <AlignmentContainer>
        <Searchbar isDragging={false} showSidebar={false} poiIdSelected={""} />
        <Nav>
          <PageLinksContainer>
            {links.map((link) => (
              <PageShortcut
                key={link.name}
                name={link.name}
                color={link.color}
                icon={link.icon}
                link={link.link}
              />
            ))}
          </PageLinksContainer>
        </Nav>
      </AlignmentContainer>
    </Container>
  );
};

export default Home;
