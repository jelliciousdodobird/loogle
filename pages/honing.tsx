// styling:
import styled from "@emotion/styled";
import { useState } from "react";
import HoningPieceInput from "../components/HoningPieceInput";

const Container = styled.div``;

const Content = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const EquipmentContainer = styled.div`
  /* border: 2px dashed pink; */

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export type HoningFields = {
  id: string;
  // order: number;
  type: "armor" | "weapon";
  honing_start: number;
  honing_end: number;
};

const equipmentSet: HoningFields[] = [
  { id: "a", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "b", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "c", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "d", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "e", type: "armor", honing_start: 0, honing_end: 0 },
  { id: "f", type: "weapon", honing_start: 0, honing_end: 0 },
];

const HoningCalculator = () => {
  const [inputs, setInputs] = useState<HoningFields[]>(equipmentSet);

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
        <EquipmentContainer>
          {inputs.map((eqPiece) => (
            <HoningPieceInput
              key={eqPiece.id}
              data={eqPiece}
              handleChange={changeInput}
            />
          ))}
        </EquipmentContainer>
      </Content>
    </Container>
  );
};

export default HoningCalculator;
