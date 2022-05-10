// styling:
import styled from "@emotion/styled";
import { useState } from "react";
import HoningPieceInput from "../components/HoningPieceInput";
import SelectInput from "../components/inputs/SelectInput";

const Container = styled.div``;

const Content = styled.div`
  width: 55%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div``;

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
  border: 2px solid ${({ theme }) => theme.colors.primary.main};

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

const equipmentSet: HoningFields[] = [
  { id: "a", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "b", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "c", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "d", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "e", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "f", type: "weapon", honing_start: 0, honing_end: 0 },
];

export type HoningFields = {
  id: string;
  // order: number;
  type: "armor" | "weapon";
  honing_start: number;
  honing_end: number;
};

const HoningCalculator = () => {
  const [inputs, setInputs] = useState<HoningFields[]>(equipmentSet);
  const [selectedTier, setSelectedTier] = useState("T1 302");

  const changeInput = (value: HoningFields) => {
    setInputs((inputs) => {
      const index = inputs.findIndex((v) => v.id === value.id);

      if (index !== -1)
        return [...inputs.slice(0, index), value, ...inputs.slice(index + 1)];
      else return inputs;
    });
  };

  return (
    <Container
      onClick={() => {
        // changeInput({ id: "c", type: "armor", honing_start: 2, honing_end: 3 });
      }}
    >
      <Content>
        <Header>
          <CustomSelectedInput
            items={["T1 302", "T2 802", "T3 1302", "T3 1340"]}
            selected={selectedTier}
            handleChange={(value: string) => {
              setSelectedTier(value);
            }}
          />
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
