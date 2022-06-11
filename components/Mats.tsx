import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SetTier } from "../contexts/HoningContext";
import MaterialImageIcon, { MaterialTypes } from "./MaterialImageIcon";

const Container = styled(motion.div)`
  position: relative;
  cursor: default;
  user-select: none;

  font-weight: 600;
  font-size: 0.85rem;

  height: 2.75rem;
  padding: 0 0.75rem;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface.light};
  /* padding: 0.25rem 0.75rem; */

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    /* background-color: ${({ theme }) => theme.colors.surface.lighter}; */
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Label = styled(motion.span)`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 3px;

  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  background-color: #fff;

  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  /* color: #222; */
  font-weight: 600;
  font-size: 0.8rem;
  white-space: nowrap;
`;

type A = Record<SetTier, Record<MaterialTypes, string>>;

const materialLabels: A = {
  "t1 302": {
    leapstone: "Harmony Leapstone",
    shard: "Harmony Shard",
    destruction: "Destruction Stone",
    guardian: "Guardian Stone",
    fusion: "n/a",
    silver: "Silver",
    gold: "Gold",
  },
  "t2 802": {
    leapstone: "Life Leapstone",
    shard: "Life Shard",
    destruction: "Destruction Stone",
    guardian: "Guardian Stone",
    fusion: "Caldarr Fusion Material",
    silver: "Silver",
    gold: "Gold",
  },
  "t3 1302": {
    leapstone: "Honor Leapstone",
    shard: "Honor Shard",
    destruction: "Destruction Stone",
    guardian: "Guardian Stone",
    fusion: "Simple Oreha Fusion Material",
    silver: "Silver",
    gold: "Gold",
  },
  "t3 1340": {
    leapstone: "Great Honor Leapstone",
    shard: "Honor Shard",
    destruction: "Destruction Stone",
    guardian: "Guardian Stone",
    fusion: "Basic Oreha Fusion Material",
    silver: "Silver",
    gold: "Gold",
  },
  "t3 relic": {
    leapstone: "Great Honor Leapstone",
    shard: "Honor Shard",
    destruction: "Destruction Stone",
    guardian: "Guardian Stone",
    fusion: "Basic Oreha Fusion Material",
    silver: "Silver",
    gold: "Gold",
  },
};

type Props = {
  tier: SetTier;
  material: MaterialTypes;
  cost: number;
  className?: string;
};

const Mats = ({ tier, material, cost, className }: Props) => {
  const [showLabel, setShowLabel] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>();

  const labelAnimProps = {
    variants: {
      hide: {
        x: 100,
        opacity: 0,
      },
      show: {
        x: 0,
        opacity: 1,
      },
    },
    initial: "hide",
    animate: "show",
    exit: "hide",
    transition: { duration: 0.25 },
  };

  const containerAnimProps = {
    variants: {
      hide: {
        zIndex: "auto",
        borderTopLeftRadius: 12,
      },
      show: {
        zIndex: 99,
        borderTopLeftRadius: 0,
      },
    },
    initial: "hide",
    animate: showLabel ? "show" : "hide",
    exit: "hide",
    transition: { duration: 0.25 },
  };

  const handleMouseEnter = () => {
    if (!showLabel) timeout.current = setTimeout(() => setShowLabel(true), 800); // schedule to hide tooltip
  };

  const handleMouseOut = () => {
    if (showLabel) setShowLabel(false);

    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
  }, []);

  if (cost === 0) return null;

  return (
    <Container
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      onBlur={handleMouseOut}
      {...containerAnimProps}
    >
      <AnimatePresence>
        {showLabel && (
          <Label {...labelAnimProps}>{materialLabels[tier][material]}</Label>
        )}
      </AnimatePresence>
      <MaterialImageIcon tier={tier} material={material} />
      {Math.round(cost).toLocaleString()}
    </Container>
  );
};

export default Mats;
