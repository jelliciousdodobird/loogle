// styling:
import styled from "@emotion/styled";
import { redirect } from "next/dist/server/api-utils";

import { useEffect, useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import Button from "../components/Button";
import { GearPiece } from "../components/GearImage";
import HoningPieceInput from "../components/HoningPieceInput";
import HoningPieceResults from "../components/HoningPieceResult";
import SelectInput, { OptionType } from "../components/inputs/SelectInput";
import MaterialImageIcon, {
  MaterialTypes,
} from "../components/MaterialImageIcon";
import Mats from "../components/Mats";
import {
  HoningStateProvider,
  useHoningState,
  UpgradeCostData,
  EquipmentUpgradeData,
  UpgradeCost,
  SetTier,
  SetType,
} from "../contexts/HoningContext";
import { prettyNumber } from "../utils/utils";

const Container = styled.div`
  padding: 1rem 0;
`;

const Content = styled.div`
  width: 55%;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.m}px) {
    width: 70%;
    /* background-color: red; */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.s}px) {
    width: 95%;
    /* background-color: blue; */
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  gap: 1rem;
`;

const EquipmentContainer = styled.div`
  /* border: 2px dashed pink; */

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TotalContainer = styled.div`
  /* border: 2px dashed pink; */

  /* padding: 0.75rem; */
  /* padding: 1rem; */

  overflow: hidden;

  border-radius: 20px;
  /* border: 1px solid ${({ theme }) => theme.colors.surface.main}; */
  background-color: ${({ theme }) => theme.colors.surface.main};

  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  /* gap: 0.5rem; */

  .test:nth-of-type(2n) {
    background-color: ${({ theme }) => theme.colors.surface.light};
  }
  .test:nth-of-type(2n + 1) {
    background-color: ${({ theme }) => theme.colors.surface.dark};
  }
`;

const TotalHeader = styled.h2`
  padding: 0.75rem 1.1rem;
  font-size: 1.2rem;
  font-weight: 700;

  background-color: ${({ theme }) => theme.colors.background.dark};
`;

const ResultLine = styled.div`
  /* background-color: red; */

  /* flex: 1; */
  padding: 1rem 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 0.5rem;
`;

const ResultLine2 = styled.div`
  height: 3rem;
  max-height: 3rem;
  /* background-color: red; */

  /* flex: 1; */

  padding: 0 2rem;

  display: flex;

  flex-direction: row;
  /* justify-content: center; */
  align-items: center;

  gap: 0.5rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const H = styled.h2`
  /* color: white; */
  flex: 1;
  /* text-transform: uppercase; */

  /* background-color: ${({ theme }) => theme.colors.background.main}; */

  padding: 0.5rem 0.75rem;
  padding: 0;
  border-radius: 16px 0 16px 0;

  width: min-content;

  white-space: nowrap;

  font-weight: 600;
  font-size: 1rem;
  /* letter-spacing: 1px; */

  display: flex;
  align-items: center;
`;

const GearScoreText = styled.span`
  /* border: 1px solid red; */
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  font-style: normal;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  svg {
    width: 14px;
    height: 14px;

    fill: ${({ theme }) => theme.colors.success.main};
  }
`;

const CustomSelectedInput = styled(SelectInput)`
  /* background-color: red; */
  width: 8rem;
`;

const StyledButton = styled(Button)`
  font-style: italic;
  font-size: 0.8rem;
`;

const PieceContainer = styled.div`
  /* padding: 0.5rem; */
  border-radius: 20px;

  /* background-color: ${({ theme }) => theme.colors.surface.dark}; */
  /* border: 1px solid ${({ theme }) => theme.colors.background.lighter}; */

  display: flex;
  gap: 0.5rem;
`;

const TotalMats = styled(Mats)`
  background-color: ${({ theme }) => theme.colors.surface.lighter};
`;

const equipmentSet: HoningFields[] = [
  { id: "a", type: "armor", piece: "head", honing_start: "0", honing_end: "0" },
  {
    id: "b",
    type: "armor",
    piece: "shoulder",
    honing_start: "0",
    honing_end: "0",
  },
  {
    id: "c",
    type: "armor",
    piece: "chest",
    honing_start: "0",
    honing_end: "0",
  },
  {
    id: "d",
    type: "armor",
    piece: "pants",
    honing_start: "0",
    honing_end: "0",
  },
  {
    id: "e",
    type: "armor",
    piece: "gloves",
    honing_start: "0",
    honing_end: "0",
  },
  {
    id: "f",
    type: "weapon",
    piece: "weapon",
    honing_start: "0",
    honing_end: "0",
  },
];

const TIER_OPTIONS: OptionType[] = [
  { id: "t1 302", label: "t1 302" },
  { id: "t2 802", label: "t2 802" },
  { id: "t3 1302", label: "t3 1302" },
  { id: "t3 1340", label: "t3 1340" },
  { id: "t3 relic", label: "t3 relic" },
];

type TierBreakpoints = Record<SetTier, { start: number; end: number }[]>;

const tierBreakpoints: TierBreakpoints = {
  "t1 302": [
    { start: 0, end: 8 },
    { start: 8, end: 15 },
  ],
  "t2 802": [
    { start: 0, end: 8 },
    { start: 8, end: 15 },
  ],
  "t3 1302": [
    { start: 0, end: 9 },
    { start: 9, end: 15 },
  ],
  "t3 1340": [
    { start: 6, end: 9 },
    { start: 9, end: 12 },
    { start: 12, end: 15 },
    { start: 15, end: 17 },
  ],
  "t3 relic": [
    { start: 17, end: 20 },
    { start: 20, end: 25 },
  ],
};

export type HoningFields = {
  id: string;
  type: SetType;
  piece: GearPiece;
  honing_start: string;
  honing_end: string;
};

export type HoningFieldsNumber = {
  id: string;
  type: SetType;
  tier: SetTier;
  piece: GearPiece;

  honing_start: number;
  honing_end: number;
  upgrades: UpgradeCostData[];
  totalCosts: UpgradeCost;
};

const ZERO_COSTS: UpgradeCost = {
  shard: 0,
  destruction: 0,
  guardian: 0,
  leapstone: 0,
  fusion: 0,
  gold: 0,
  silver: 0,
};

const getAvgGearScore = (ilvls: number[]) =>
  ilvls.reduce((prev, curr) => prev + curr, 0) / ilvls.length;

const HoningCalculator = () => {
  const { honingData, getHoningByLvl, getAvgCostByLvl, getGearScore } =
    useHoningState();
  const [inputs, setInputs] = useState<HoningFields[]>(equipmentSet);

  const [selectedTier, setSelectedTier] = useState<OptionType>(TIER_OPTIONS[0]);
  const currentTier = selectedTier.id as SetTier;
  const quickGearScoreOptions = tierBreakpoints[currentTier];
  const inputLimits = {
    min: 0,
    max:
      honingData.length > 0
        ? Math.max(
            ...honingData
              .filter(
                (row) =>
                  row.set_tier === currentTier && row.set_type === "weapon"
              )
              .map(({ lvl }) => lvl)
          )
        : 0,
  };

  const data: HoningFieldsNumber[] = inputs.map((values) => {
    const start = parseInt(values.honing_start) ?? 0;
    const end = parseInt(values.honing_end) ?? 0;
    const setType = values.type;
    const endLimit = Math.min(end, inputLimits.max);

    const upgrades: UpgradeCostData[] = [];
    for (let i = start; i < endLimit; i++) {
      const upgradeCostData = getAvgCostByLvl(currentTier, setType, i);
      if (upgradeCostData) upgrades.push(upgradeCostData);
    }

    const totalCosts = upgrades.reduce(
      (prev, curr) => ({
        shard: prev.shard + curr.costs.shard,
        destruction: prev.destruction + curr.costs.destruction,
        guardian: prev.guardian + curr.costs.guardian,
        leapstone: prev.leapstone + curr.costs.leapstone,
        fusion: prev.fusion + curr.costs.fusion,
        gold: prev.gold + curr.costs.gold,
        silver: prev.silver + curr.costs.silver,
      }),
      ZERO_COSTS
    );

    return {
      ...values,
      tier: currentTier,
      honing_start: start,
      honing_end: end,
      upgrades,
      totalCosts,
    };
  });

  const totalUpgradeCosts: UpgradeCost = data.reduce(
    (prev, curr) => ({
      shard: prev.shard + Math.round(curr.totalCosts.shard),
      destruction: prev.destruction + Math.round(curr.totalCosts.destruction),
      guardian: prev.guardian + Math.round(curr.totalCosts.guardian),
      leapstone: prev.leapstone + Math.round(curr.totalCosts.leapstone),
      fusion: prev.fusion + Math.round(curr.totalCosts.fusion),
      gold: prev.gold + Math.round(curr.totalCosts.gold),
      silver: prev.silver + Math.round(curr.totalCosts.silver),
    }),
    ZERO_COSTS
  );

  const startingGearScore = getAvgGearScore(
    data.map((setPiece) => getGearScore(setPiece.tier, setPiece.honing_start))
  );

  const endingGearScore = getAvgGearScore(
    data.map((setPiece) => getGearScore(setPiece.tier, setPiece.honing_end))
  );

  const changeInput = (value: HoningFields) => {
    setInputs((inputs) => {
      const index = inputs.findIndex((v) => v.id === value.id);

      if (index !== -1)
        return [...inputs.slice(0, index), value, ...inputs.slice(index + 1)];
      else return inputs;
    });
  };

  useEffect(() => {
    setInputs((inputs) =>
      inputs.map((field) => ({
        ...field,
        honing_start: `${Math.min(
          inputLimits.max,
          parseInt(field.honing_start) ?? 0
        )}`,
        honing_end: `${Math.min(
          inputLimits.max,
          parseInt(field.honing_end) ?? inputLimits.max
        )}`,
      }))
    );
  }, [selectedTier]);

  return (
    <Container onClick={() => {}}>
      <Content>
        <Header>
          <CustomSelectedInput
            options={TIER_OPTIONS}
            value={selectedTier}
            onChange={setSelectedTier}
          />
          {quickGearScoreOptions.map((value, i) => (
            <StyledButton
              key={i}
              onClick={() => {
                setInputs((inputs) => {
                  return inputs.map((input) => ({
                    ...input,
                    honing_start: value.start.toString(),
                    honing_end: value.end.toString(),
                  }));
                });
              }}
            >
              <>
                {getGearScore(currentTier, value.start)} -&gt;{" "}
                {getGearScore(currentTier, value.end)}
              </>
            </StyledButton>
          ))}
        </Header>
        <EquipmentContainer>
          {inputs.map((eqPiece, i) => (
            <PieceContainer key={eqPiece.id}>
              <HoningPieceInput
                min={inputLimits.min}
                max={inputLimits.max}
                data={eqPiece}
                handleChange={changeInput}
              />
              <HoningPieceResults data={data[i]} />
            </PieceContainer>
          ))}
        </EquipmentContainer>
        <TotalContainer>
          <TotalHeader>SUMMARY</TotalHeader>
          <ResultLine2 className="test">
            <H>Gear Score</H>
            <GearScoreText>
              {prettyNumber(startingGearScore)}
              <MdDoubleArrow />
              {prettyNumber(endingGearScore)}
            </GearScoreText>
          </ResultLine2>
          <ResultLine2 className="test">
            <H>Material Gold Value</H>
            {/* <Mats tier={currentTier} material={"gold"} cost={500} /> */}
            <MaterialImageIcon tier="t1 302" material="gold" />
            500
          </ResultLine2>
          <ResultLine className="test">
            <H>Total Materials Required</H>
            <List>
              {Object.entries(totalUpgradeCosts).map(([k, v]) => (
                <TotalMats
                  key={k}
                  tier={currentTier}
                  material={k as MaterialTypes}
                  cost={v}
                />
              ))}
            </List>
          </ResultLine>
        </TotalContainer>
      </Content>
    </Container>
  );
};

const HoningPage = () => {
  return (
    <HoningStateProvider>
      <HoningCalculator />
    </HoningStateProvider>
  );
};

export default HoningPage;
