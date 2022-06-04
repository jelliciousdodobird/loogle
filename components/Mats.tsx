import styled from "@emotion/styled";
import { SetTier } from "../utils/honing-calculations";
import MaterialImageIcon, { MaterialTypes } from "./MaterialImageIcon";

const Container = styled.div`
  font-weight: 600;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface.light};
  padding: 0.25rem 0.75rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

// const Mats = styled.div`
//   font-weight: 600;

//   border-radius: 12px;
//   background-color: ${({ theme }) => theme.colors.surface.light};
//   padding: 0.25rem 0.75rem;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 0.25rem;
// `;

type Props = { tier: SetTier; material: MaterialTypes; cost: number };

const Mats = ({ tier, material, cost }: Props) => {
  if (cost === 0) return null;

  return (
    <Container>
      <MaterialImageIcon tier={tier} material={material} />
      {Math.round(cost).toLocaleString()}
    </Container>
  );
};

export default Mats;
