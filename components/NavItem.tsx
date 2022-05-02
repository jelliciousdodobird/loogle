// styling:
import styled from "@emotion/styled";

import React, { useState } from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import Link from "next/link";

const Container = styled(motion.li)<{ bg?: string }>`
  cursor: pointer;

  border-radius: 5rem;
  padding: 0.5rem;

  background-color: ${({ bg }) => bg};
  /* border: 1px solid red; */
`;

const A = styled.a`
  display: flex;
  gap: 0.5rem;
`;

const CircleIcon = styled(motion.div)<{ fg: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background-color: rgba(50, 50, 50, 0.5);
  background-color: ${({ fg }) => fg};

  display: flex;
  justify-content: center;
  align-items: center;
  color: red;

  svg {
    width: 1.25rem;
    height: 1.25rem;

    fill: ${({ fg }) => fg};
    fill: #fff;

    /* fill: inherit; */
    /* fill: #fff; */

    /* fill: #fff; */
  }
`;

const Text = styled.span`
  /* border: 1px solid blue; */

  display: flex;
  justify-content: center;
  align-items: center;

  padding-right: 0.5rem;

  font-weight: 600;
`;

type PageShortcutProps = {
  // pois: Poi[];
  // controls: Controls;

  color?: string;
  name: string;
  icon: IconType;
  link: string;
};

const PageShortcut = ({
  name,
  color = "#ffffff",
  icon,
  link,
}: PageShortcutProps) => {
  const [hover, setHover] = useState(false);

  const iconAnimProps = {
    variants: {
      initial: {
        backgroundColor: color,
      },
      enter: {
        backgroundColor: "#ffffff",
      },
    },
    initial: "initial",
    animate: hover ? "enter" : "initial",
  };

  return (
    <Container
      bg="#fff"
      whileHover={{ scale: 1.07, backgroundColor: color }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onBlur={() => setHover(false)}
    >
      <Link href={`${link}`} passHref>
        <A>
          <CircleIcon fg={color}>{React.createElement(icon)}</CircleIcon>
          <Text>{name}</Text>
        </A>
      </Link>
    </Container>
  );
};

export default PageShortcut;
