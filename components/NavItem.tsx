// styling:
import styled from "@emotion/styled";

import React, { useState } from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import Link from "next/link";

const A = styled(motion.a)`
  overflow: hidden;
  cursor: pointer;

  border-radius: 10px;
  padding: 0.5rem;
  background-color: #fff;

  height: 3rem;

  display: flex;
  gap: 0.5rem;

  /* filter: blur(0px); */
  /* transform-origin: 50% 50%; */
`;

const CircleContainer = styled.div`
  z-index: 1;
  position: relative;
`;

const CircleIcon = styled(motion.div)<{ fg: string }>`
  z-index: 2;
  position: relative;

  width: 2rem;
  height: 2rem;

  border-radius: 50%;

  background-color: ${({ fg }) => fg};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 1.25rem;
    height: 1.25rem;

    fill: #fff;
  }
`;

const ACircleIcon = styled(CircleIcon)`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
`;

const Text = styled.span`
  z-index: 1;
  position: relative;
  /* border: 1px solid blue; */

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  padding-right: 0.5rem;

  font-weight: 600;
`;

type Props = {
  // pois: Poi[];
  // controls: Controls;

  color?: string;
  name: string;
  icon: IconType;
  link: string;
};

const NavItem = ({ name, color = "#ffffff", icon, link }: Props) => {
  const [hover, setHover] = useState(false);

  const iconAnimProps = {
    variants: {
      initial: {
        scale: 0.9,
      },
      expand: {
        scale: 12,
      },
    },
    initial: "initial",
    animate: hover ? "expand" : "initial",

    transition: { duration: 0.5 },
  };

  const bgAnimProps = {
    variants: {
      initial: {
        backgroundColor: "#ffffff",
      },
      expand: {
        backgroundColor: color,
        // transition: { delay: 0.25 },
      },
    },
    initial: "initial",
    animate: hover ? "expand" : "initial",
    transition: { duration: 0.5 },
    // transition: { duration: 0.5 },
  };

  return (
    // <Container
    //   bg="#fff"
    //   whileHover={{
    //     // scale: 1.06,
    //     scale: 1,
    //     backgroundColor: color,
    //   }}
    //   whileTap={{ scale: 1.12, backgroundColor: color }}
    //   onMouseEnter={() => setHover(true)}
    //   onMouseLeave={() => setHover(false)}
    //   onBlur={() => setHover(false)}
    // >
    <Link href={`${link}`} passHref>
      <A
        {...bgAnimProps}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onBlur={() => setHover(false)}
      >
        <CircleContainer>
          <CircleIcon fg={color}>{React.createElement(icon)}</CircleIcon>
          <ACircleIcon fg={color} {...iconAnimProps} />
          {/* <ACircleIcon fg="#ff0000" style={{ scale: 4 }} />
            <ACircleIcon fg="#00ff00" style={{ scale: 3 }} />
            <ACircleIcon fg="#0000ff" style={{ scale: 2 }} /> */}
        </CircleContainer>

        <Text>{name}</Text>
      </A>
    </Link>
    // </Container>
  );
};

export default NavItem;
