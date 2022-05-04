import styled from "@emotion/styled";
import { HoningFields } from "../pages/honing";

const Container = styled.div`
  width: 5rem;
  height: 5rem;

  background-color: pink;

  border-radius: 5px;
`;

type HoningPieceProps = {
  data: HoningFields;
  handleChange: (value: HoningFields) => void;
};

const HoningPieceInput = ({ data, handleChange }: HoningPieceProps) => {
  return <Container></Container>;
};

export default HoningPieceInput;
