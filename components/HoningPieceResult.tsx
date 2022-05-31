import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// icons:
import { MdArrowRightAlt } from "react-icons/md";
import { HoningFieldsNumber } from "../pages/honing";
import {
  EquipmentUpgradeData,
  getUpgradeLevelDataByLvl,
} from "../utils/honing-calculations";

const Container = styled.div`
  /* border: 1px solid red; */

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  background-color: ${({ theme }) => theme.colors.surface.light};
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 0.25rem;
`;

const LvlWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const LvlBox = styled.div`
  border-radius: 2px;
  width: 1.5rem;
  height: 1.5rem;

  background-color: ${({ theme }) => theme.colors.surface.light};
  background-color: ${({ theme }) => theme.colors.background.main};

  font-weight: 600;
  font-size: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.div`
  width: 1.2rem;
  height: 1.2rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const MatsWrapper = styled.div`
  /* flex: 1; */

  flex-flow: wrap;
  display: flex;
  gap: 1rem;
`;

const Mats = styled.div`
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Total = styled.div`
  position: relative;

  padding: 1rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background.main};
  background-color: ${({ theme }) => theme.colors.surface.light};
`;

const ArrowIcon = styled(motion.span)`
  /* z-index: 10; */

  position: absolute;
  right: 0;
  top: 0;

  margin: 0.5rem;

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
  honingTable: EquipmentUpgradeData[];
};

const HoningPieceResults = ({ data, honingTable }: Props) => {
  //     id: string;
  //     type: "armor" | "weapon";
  //     honing_start: number;
  //     honing_end: number;
  //     upgradeCosts: UpgradeCost[]

  const [expand, setExpand] = useState(false);

  const {
    honing_start,
    honing_end,
    upgradeCostsPerLvl: upgradeCosts,
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
        {/* <LevelTotal> */}
        <MatsWrapper>
          {totalUpgradeCosts.total_destruction_stones > 0 && (
            <Mats>
              {Math.round(totalUpgradeCosts.total_destruction_stones)} DS
            </Mats>
          )}
          {totalUpgradeCosts.total_guardian_stones > 0 && (
            <Mats>
              {Math.round(totalUpgradeCosts.total_guardian_stones)} GS
            </Mats>
          )}
          {totalUpgradeCosts.total_leapstones > 0 && (
            <Mats>{Math.round(totalUpgradeCosts.total_leapstones)} LS</Mats>
          )}
          {totalUpgradeCosts.total_fusion > 0 && (
            <Mats>{Math.round(totalUpgradeCosts.total_fusion)} F</Mats>
          )}
          {totalUpgradeCosts.total_shards > 0 && (
            <Mats>{Math.round(totalUpgradeCosts.total_shards)} Sh</Mats>
          )}
          {totalUpgradeCosts.total_silver > 0 && (
            <Mats>{Math.round(totalUpgradeCosts.total_silver)} S</Mats>
          )}
          {totalUpgradeCosts.total_gold > 0 && (
            <Mats>{Math.round(totalUpgradeCosts.total_gold)} G</Mats>
          )}
        </MatsWrapper>
        <ArrowIcon>d</ArrowIcon>
        {/* </LevelTotal> */}
      </Total>

      <AnimatePresence>
        {expand && (
          <LevelTotalContainer {...animProps} onClick={() => console.log(data)}>
            {upgradeCosts.map((upgradeLvl, i) => (
              <LevelTotal key={`${data.id}-${i}`}>
                <LvlWrapper>
                  <LvlBox>{honing_start + i}</LvlBox>
                  <Arrow>
                    <MdArrowRightAlt />
                  </Arrow>
                  <LvlBox>{honing_start + i + 1}</LvlBox>
                </LvlWrapper>

                <MatsWrapper>
                  {upgradeLvl.total_destruction_stones > 0 && (
                    <Mats>
                      {Math.round(upgradeLvl.total_destruction_stones)} DS
                    </Mats>
                  )}
                  {upgradeLvl.total_guardian_stones > 0 && (
                    <Mats>
                      {Math.round(upgradeLvl.total_guardian_stones)} GS
                    </Mats>
                  )}
                  {upgradeLvl.total_leapstones > 0 && (
                    <Mats>{Math.round(upgradeLvl.total_leapstones)} LS</Mats>
                  )}
                  {upgradeLvl.total_fusion > 0 && (
                    <Mats>{Math.round(upgradeLvl.total_fusion)} F</Mats>
                  )}
                  {upgradeLvl.total_shards > 0 && (
                    <Mats>{Math.round(upgradeLvl.total_shards)} Sh</Mats>
                  )}
                  {upgradeLvl.total_silver > 0 && (
                    <Mats>{Math.round(upgradeLvl.total_silver)} S</Mats>
                  )}
                  {upgradeLvl.total_gold > 0 && (
                    <Mats>{Math.round(upgradeLvl.total_gold)} G</Mats>
                  )}
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
