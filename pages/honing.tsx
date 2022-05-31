// styling:
import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import HoningPieceInput from "../components/HoningPieceInput";
import HoningPieceResults from "../components/HoningPieceResult";
import SelectInput, { OptionType } from "../components/inputs/SelectInput";
import {
  EquipmentUpgradeData,
  getUpgradeCosts,
  getUpgradeLevelDataByLvl,
  SetTier,
  UpgradeCost,
} from "../utils/honing-calculations";
import supabase from "../utils/supabase";

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
    width: 90%;

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

  padding: 1rem;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.onBackground.main};

  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const H = styled.h2`
  color: white;
  text-transform: uppercase;

  font-weight: 600;
  font-size: 2rem;
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
  padding: 0.5rem;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.surface.dark};

  display: flex;
  gap: 0.5rem;
`;

const equipmentSet: HoningFields[] = [
  { id: "a", type: "armor", honing_start: "0", honing_end: "0" },
  { id: "b", type: "armor", honing_start: "0", honing_end: "0" },
  { id: "c", type: "armor", honing_start: "0", honing_end: "0" },
  { id: "d", type: "armor", honing_start: "0", honing_end: "0" },
  { id: "e", type: "armor", honing_start: "0", honing_end: "0" },
  { id: "f", type: "weapon", honing_start: "0", honing_end: "0" },
];

const tierBreakpoints: { [key: string]: any[] } = {
  "t1 302": [
    { start: 0, end: 8, start_ilvl: 302, end_ilvl: 460 },
    { start: 8, end: 15, start_ilvl: 460, end_ilvl: 600 },
  ],
  "t2 802": [
    { start: 0, end: 8, start_ilvl: 802, end_ilvl: 960 },
    { start: 8, end: 15, start_ilvl: 960, end_ilvl: 1100 },
  ],
  "t3 1302": [
    { start: 0, end: 10, start_ilvl: 1302, end_ilvl: 1340 },
    { start: 10, end: 15, start_ilvl: 1340, end_ilvl: 1370 },
  ],
  "t3 1340": [
    { start: 6, end: 9, start_ilvl: 1370, end_ilvl: 1385 },
    { start: 9, end: 12, start_ilvl: 1385, end_ilvl: 1400 },
    { start: 12, end: 15, start_ilvl: 1400, end_ilvl: 1415 },
    { start: 15, end: 17, start_ilvl: 1415, end_ilvl: 1445 },
  ],
};

export type HoningFields = {
  id: string;
  type: "armor" | "weapon";
  honing_start: string;
  honing_end: string;
};

export type HoningFieldsNumber = {
  id: string;
  type: "armor" | "weapon";
  honing_start: number;
  honing_end: number;
  upgradeCostsPerLvl: UpgradeCost[];
  totalUpgradeCosts: UpgradeCost;
};

const TIER_OPTIONS: OptionType[] = [
  { id: "t1 302", label: "t1 302" },
  { id: "t2 802", label: "t2 802" },
  { id: "t3 1302", label: "t3 1302" },
  { id: "t3 1340", label: "t3 1340" },
];

const HoningCalculator = () => {
  const [honingTable, setHoningTable] = useState<EquipmentUpgradeData[]>([]);
  const [inputs, setInputs] = useState<HoningFields[]>(equipmentSet);
  const [selectedTier, setSelectedTier] = useState<OptionType>(TIER_OPTIONS[0]);
  const tier_bp = tierBreakpoints[selectedTier.label];

  const data: HoningFieldsNumber[] = inputs.map((values) => {
    const start = parseInt(values.honing_start) ?? 0;
    const end = parseInt(values.honing_end) ?? 0;
    const setType = values.type;

    const upgradeCostsPerLvl: UpgradeCost[] = [];

    for (let i = start; i < end; i++) {
      const honingInfo = getUpgradeLevelDataByLvl(
        selectedTier.label as SetTier,
        setType,
        i + 1,
        honingTable
      );

      if (honingInfo) {
        const costs = getUpgradeCosts(honingInfo.initial_success_rate, {
          initialShards: honingInfo.initial_shards,
          shards: honingInfo.trial_shards,
          destructionStones: honingInfo.trial_destructions,
          guardianStones: honingInfo.trial_guardians,
          leapstones: honingInfo.trial_leapstones,
          fusion: honingInfo.trial_fusion_mat,

          gold: honingInfo.trial_gold,
          silver: honingInfo.trial_silver,
        });

        upgradeCostsPerLvl.push(costs);
      }
    }

    const t = upgradeCostsPerLvl.reduce(
      (prev, curr) => ({
        total_shards: prev.total_shards + curr.total_shards,
        total_destruction_stones:
          prev.total_destruction_stones + curr.total_destruction_stones,
        total_guardian_stones:
          prev.total_guardian_stones + curr.total_guardian_stones,
        total_leapstones: prev.total_leapstones + curr.total_leapstones,
        total_fusion: prev.total_fusion + curr.total_fusion,
        total_gold: prev.total_gold + curr.total_gold,
        total_silver: prev.total_silver + curr.total_silver,
      }),
      {
        total_shards: 0,
        total_destruction_stones: 0,
        total_guardian_stones: 0,
        total_leapstones: 0,
        total_fusion: 0,
        total_gold: 0,
        total_silver: 0,
      }
    );

    return {
      ...values,
      honing_start: start,
      honing_end: end,
      upgradeCostsPerLvl,
      totalUpgradeCosts: t,
    };
  });

  const changeInput = (value: HoningFields) => {
    setInputs((inputs) => {
      const index = inputs.findIndex((v) => v.id === value.id);

      if (index !== -1)
        return [...inputs.slice(0, index), value, ...inputs.slice(index + 1)];
      else return inputs;
    });
  };

  useEffect(() => {
    const fetchHoningData = async () => {
      let { data, error } = await supabase.from("honing_data").select("*");

      if (data) {
        const dataSanitized: EquipmentUpgradeData[] = data.map((row) => {
          return {
            set_tier: row.set_tier ?? "t1 302",
            set_type: row.set_type ?? "weapon",

            start_ilvl: row.start_ilvl ?? 0,
            start_lvl: row.start_lvl ?? 0,
            end_ilvl: row.end_ilvl ?? 0,
            end_lvl: row.end_lvl ?? 0,

            initial_success_rate: row.initial_success_rate ?? 0,
            initial_shards: row.initial_shards ?? 0,

            trial_destructions: row.trial_destructions ?? 0,
            trial_fusion_mat: row.trial_fusion_mat ?? 0,
            trial_gold: row.trial_gold ?? 0,
            trial_guardians: row.trial_guardians ?? 0,
            trial_leapstones: row.trial_leapstones ?? 0,
            trial_shards: row.trial_shards ?? 0,
            trial_silver: row.trial_silver ?? 0,

            worst_case_leapstones: row.worst_case_leapstones ?? 0,
            best_case_shards: row.best_case_shards ?? 0,
            max_probability: row.max_probability ?? 0,
            max_trials: row.max_trial ?? 0,
          };
        });
        setHoningTable(dataSanitized);
      }

      console.log(data);
    };

    fetchHoningData();
  }, []);

  return (
    <Container
      onClick={() => {
        // console.log({ honingTable });
        // const base_probability = 0.1;
        // const test = getUpgradeCosts(base_probability, {
        //   initialShards: 60,
        //   shards: 60,
        //   stones: 258,
        //   leapstones: 8,
        //   fusion: 4,
        //   gold: 120,
        //   silver: 18320,
        // });
        // console.log({ test });
      }}
    >
      <Content>
        <Header>
          <CustomSelectedInput
            options={TIER_OPTIONS}
            value={selectedTier}
            onChange={setSelectedTier}
            // handleChange={(value: SetTier) => {
            //   setSelectedTier(value);
            // }}
          />
          {tier_bp.map((value, i) => (
            <StyledButton
              key={i}
              onClick={() => {
                setInputs((inputs) => {
                  return inputs.map((input) => ({
                    ...input,
                    honing_start: value.start,
                    honing_end: value.end,
                  }));
                });
              }}
            >
              <>
                {value.start_ilvl} -&gt; {value.end_ilvl}
              </>
            </StyledButton>
          ))}
          {/* {tierBreakpoints[`${selectedTierKey}`]} */}
        </Header>
        <EquipmentContainer>
          {inputs.map((eqPiece, i) => (
            <PieceContainer key={eqPiece.id}>
              <HoningPieceInput data={eqPiece} handleChange={changeInput} />
              <HoningPieceResults data={data[i]} honingTable={honingTable} />
              {/* <ResultPiece></ResultPiece> */}
            </PieceContainer>
          ))}
        </EquipmentContainer>
        <TotalContainer>
          <H>total</H>
          <pre style={{ color: "white" }}>
            {JSON.stringify(inputs, null, 2)}
          </pre>
        </TotalContainer>
      </Content>
    </Container>
  );
};

export default HoningCalculator;
