import styled from "@emotion/styled";
import { HoningFields } from "../pages/honing";

// icons:
import {
  MdArrowRightAlt,
  MdKeyboardArrowRight,
  MdDoubleArrow,
} from "react-icons/md";
import { useEffect, useState } from "react";

const Container = styled.div`
  position: relative;

  width: 7rem;
  height: 7rem;

  background-color: ${({ theme }) => theme.colors.surface.dark};
  background-color: ${({ theme }) => theme.colors.background.light};
  background-color: ${({ theme }) => theme.colors.surface.light};
  /* background-color: ${({ theme }) => theme.colors.surface.main}; */

  border-radius: 5px;
`;

const PositionContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  /* padding: 0.5rem; */
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.background.main};
  background-color: ${({ theme }) => theme.colors.background.lighter};
  background-color: ${({ theme }) => theme.colors.surface.lighter};
  /* background-color: ${({ theme }) => theme.colors.surface.lighter}; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartInput = styled.input`
  border-radius: 50%;

  font-weight: 600;
  text-align: center;

  width: 100%;
  height: 100%;

  background-color: transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type="number"] {
    appearance: textfield; /* Firefox */
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border: 2px solid ${({ theme }) => theme.colors.onSurface.main};
  }
`;

const ArrowIcon = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  min-height: 1.25rem;

  border-radius: 50%;
  /* background-color: #fff; */

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;
type HoningPieceProps = {
  data: HoningFields;
  handleChange: (value: HoningFields) => void;
};

const HoningPieceInput = ({ data, handleChange }: HoningPieceProps) => {
  // const [start, setStart] = useState(data.honing_start.toString());
  // const [end, setEnd] = useState(data.honing_end.toString());
  const [value, setValue] = useState({
    start: data.honing_start.toString(),
    end: data.honing_end.toString(),
  });

  const validateInput = (value: string) => {
    const num = parseInt(value);

    if (num < 0) return 0;
    else if (num > 15) return 15;
    else if (isNaN(num)) return 0;
    else return num;
  };

  const numToStr = (value: number) => (isNaN(value) ? "" : value.toString());

  useEffect(() => {
    handleChange({
      ...data,
      honing_start: validateInput(value.start),
      honing_end: validateInput(value.end),
    });
  }, [value]);

  return (
    <Container>
      <PositionContainer>
        <InputContainer>
          <StartInput
            type="number"
            min={"0"}
            max={"15"}
            value={value.start}
            onChange={(e) => {
              const end = parseInt(value.end);

              const newStart = validateInput(e.target.value);
              const newEnd = end <= newStart ? newStart : end;

              // setValues({
              //   ...data,
              //   honing_start: newStart,
              //   honing_end: newEnd,
              // });

              setValue({
                start: numToStr(newStart),
                end: numToStr(newEnd),
              });
            }}
            // onBlur={() => {
            //   if (isNaN(values.honing_start))
            //     handleChange({ ...data, honing_start: 0 });
            // }}
          />
        </InputContainer>
        <ArrowIcon
          onClick={() => {
            parseInt("d");
          }}
        >
          <MdDoubleArrow />
        </ArrowIcon>
        <InputContainer>
          <StartInput
            type="number"
            min={"0"}
            max={"15"}
            value={value.end}
            onChange={(e) => {
              // const end = validateInput(e.target.value);
              // const newEnd = isNaN(end) ? 0 : end;
              // const newStart =
              //   newEnd <= data.honing_start ? newEnd : data.honing_end;
              // handleChange({
              //   ...data,
              //   honing_start: newStart,
              //   honing_end: newEnd,
              // });
            }}
            // onBlur={() => {
            //   if (isNaN(data.honing_end))
            //     handleChange({ ...data, honing_end: 0 });
            // }}
          />
        </InputContainer>
      </PositionContainer>
    </Container>
  );
};

export default HoningPieceInput;
