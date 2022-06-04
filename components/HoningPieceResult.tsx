import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// icons:
import { MdArrowDropDown, MdArrowRightAlt } from "react-icons/md";
import { HoningFieldsNumber } from "../pages/honing";
import {
  EquipmentUpgradeData,
  getUpgradeLevelDataByLvl,
} from "../utils/honing-calculations";

// images:
import T1Leapstone from "../assets/materials/t1-leapstone.png";
import T1Shard from "../assets/materials/t1-shard.png";
import T1Destruction from "../assets/materials/t1-destruction.png";
import T1Guardian from "../assets/materials/t1-guardian.png";

import Gold from "../assets/materials/gold.png";
import Silver from "../assets/materials/silver.png";

import Image from "next/image";
import MaterialImageIcon, { MaterialTypes } from "./MaterialImageIcon";
import Mats from "./Mats";

const Container = styled.div`
  /* border: 1px solid red; */

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* width: 100%; */
`;

const LevelTotalContainer = styled(motion.div)`
  /* flex: 1; */
  /* height: 50px; */

  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* width: 100%; */
`;

const LevelTotal = styled.div`
  /* border: 1px solid red; */
  /* width: 100%; */

  border-radius: 5px;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.surface.light};
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 0.25rem;
`;

const LvlWrapper = styled.div`
  padding: 0.3rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.surface.main};
  width: fit-content;
  border-radius: 16px;

  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 0.25rem;
`;

const LvlBox = styled.div`
  border-radius: 2px;
  /* width: 1.5rem; */
  /* height: 1.5rem; */

  /* background-color: ${({ theme }) => theme.colors.surface.light}; */
  /* background-color: ${({ theme }) => theme.colors.background.main}; */

  font-weight: 600;
  font-size: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  font-style: italic;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const MatsWrapper = styled.div`
  /* flex: 1; */

  flex-flow: wrap;
  display: flex;
  gap: 0.5rem;
`;

const Delete = styled.div`
  font-weight: 600;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface.light};
  padding: 0.25rem 0.75rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

const Total = styled.div`
  position: relative;

  padding: 0.5rem;
  border-radius: 16px;
  /* background-color: ${({ theme }) => theme.colors.background.main}; */
  /* background-color: ${({ theme }) => theme.colors.surface.light}; */

  border: 1px solid ${({ theme }) => theme.colors.surface.light};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.surface.lighter};
  }
`;

const ArrowIcon = styled(motion.span)`
  /* z-index: 10; */

  position: absolute;
  right: 0;
  top: 0;

  margin: 1rem;

  background-color: ${({ theme }) => theme.colors.surface.lighter};

  /* background-color: red; */
  border-radius: 50%;

  width: 1.5rem;
  height: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

type Props = {
  data: HoningFieldsNumber;
};

const HoningPieceResults = ({ data }: Props) => {
  const [expand, setExpand] = useState(false);

  const {
    honing_start,
    honing_end,
    tier,
    upgradeCostsPerLvl,
    totalUpgradeCosts,
  } = data;

  const animProps = {
    variants: {
      collapsed: {
        height: 0,
        opacity: 0,
      },
      expand: {
        height: "auto",
        opacity: 1,
        // scale: 1.1,
      },
    },
    initial: "collapsed",
    animate: "expand",
    exit: "collapsed",

    transition: { duration: 0.5 },
  };

  return (
    <Container>
      <Total onClick={() => setExpand((v) => !v)}>
        {upgradeCostsPerLvl.length === 0 && (
          <Delete>No materials needed.</Delete>
        )}
        <MatsWrapper>
          {Object.entries(totalUpgradeCosts).map(([mat, cost]) => (
            <Mats
              key={mat}
              tier={tier}
              material={mat as MaterialTypes}
              cost={cost}
            />
          ))}
        </MatsWrapper>
        <ArrowIcon>
          <MdArrowDropDown />
        </ArrowIcon>
      </Total>

      <AnimatePresence>
        {expand && (
          <LevelTotalContainer {...animProps} onClick={() => console.log(data)}>
            {upgradeCostsPerLvl.map((upgradeLvl, i) => (
              <LevelTotal key={`${data.id}-${i}`}>
                <LvlWrapper>
                  <LvlBox>{honing_start + i}</LvlBox>
                  <Arrow>-&gt;</Arrow>
                  <LvlBox>{honing_start + i + 1}</LvlBox>
                </LvlWrapper>

                <MatsWrapper>
                  {Object.entries(upgradeLvl).map(([mat, cost]) => (
                    <Mats
                      key={mat}
                      tier={tier}
                      material={mat as MaterialTypes}
                      cost={cost}
                    />
                  ))}
                </MatsWrapper>
              </LevelTotal>
            ))}
          </LevelTotalContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default HoningPieceResults;
