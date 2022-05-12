// styling:
import styled from "@emotion/styled";

import { useState } from "react";
import Button from "../components/Button";
import HoningPieceInput from "../components/HoningPieceInput";
import SelectInput from "../components/inputs/SelectInput";

const Container = styled.div`
  padding: 1rem 0;
`;

const Content = styled.div`
  width: 55%;
  margin: 0 auto;

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
  width: 7rem;
`;

const StyledButton = styled(Button)`
  font-style: italic;
  font-size: 0.8rem;
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
  "T1 302": [
    { start: 0, end: 8, start_ilvl: 302, end_ilvl: 460 },
    { start: 8, end: 15, start_ilvl: 460, end_ilvl: 600 },
  ],
  "T2 802": [
    { start: 0, end: 8, start_ilvl: 802, end_ilvl: 960 },
    { start: 8, end: 15, start_ilvl: 960, end_ilvl: 1100 },
  ],
  "T3 1302": [
    { start: 0, end: 10, start_ilvl: 1302, end_ilvl: 1340 },
    { start: 10, end: 15, start_ilvl: 1340, end_ilvl: 1370 },
  ],
  "T3 1340": [
    { start: 6, end: 9, start_ilvl: 1370, end_ilvl: 1385 },
    { start: 9, end: 12, start_ilvl: 1385, end_ilvl: 1400 },
    { start: 12, end: 15, start_ilvl: 1400, end_ilvl: 1415 },
    { start: 15, end: 17, start_ilvl: 1415, end_ilvl: 1445 },
  ],
};

export type HoningFields = {
  id: string;
  // order: number;
  type: "armor" | "weapon";
  honing_start: string;
  honing_end: string;
};

const HoningCalculator = () => {
  const [inputs, setInputs] = useState<HoningFields[]>(equipmentSet);
  const [selectedTier, setSelectedTier] = useState("T1 302");
  // const selectedTierKey = selectedTier.toLowerCase().replace(" ", "-");
  const tier_bp = tierBreakpoints[selectedTier];

  const changeInput = (value: HoningFields) => {
    setInputs((inputs) => {
      const index = inputs.findIndex((v) => v.id === value.id);

      if (index !== -1)
        return [...inputs.slice(0, index), value, ...inputs.slice(index + 1)];
      else return inputs;
    });
  };

  return (
    <Container>
      <Content>
        <Header>
          <CustomSelectedInput
            items={["T1 302", "T2 802", "T3 1302", "T3 1340"]}
            selected={selectedTier}
            handleChange={(value: string) => {
              setSelectedTier(value);
            }}
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
                {value.start_ilvl} - {value.end_ilvl}
              </>
            </StyledButton>
          ))}
          {/* {tierBreakpoints[`${selectedTierKey}`]} */}
        </Header>
        <EquipmentContainer>
          {inputs.map((eqPiece) => (
            <HoningPieceInput
              key={eqPiece.id}
              data={eqPiece}
              handleChange={changeInput}
            />
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
